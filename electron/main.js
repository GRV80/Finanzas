const path = require("path");
const fs = require("fs");
const { app, BrowserWindow, ipcMain, shell } = require("electron");
const { NsisUpdater } = require("electron-updater");
const initSqlJs = require("sql.js/dist/sql-wasm.js");

let mainWindow = null;
let updater = null;
let updatesReady = false;
let reloadTimer = null;

const DB_FILE = "app-data.sqlite";
const DB_BACKUP_FILE = "app-data.backup.sqlite";
const LEGACY_STORE_FILE = "app-data.json";
const LEGACY_STORE_BACKUP_FILE = "app-data.backup.json";

let sqlJsPromise = null;

function getStorePaths() {
  const storageDir = path.join(app.getPath("userData"), "storage");
  return {
    storageDir,
    dbPath: path.join(storageDir, DB_FILE),
    dbBackupPath: path.join(storageDir, DB_BACKUP_FILE),
    dbTempPath: path.join(storageDir, `${DB_FILE}.tmp`),
    legacyStorePath: path.join(storageDir, LEGACY_STORE_FILE),
    legacyBackupPath: path.join(storageDir, LEGACY_STORE_BACKUP_FILE),
  };
}

function ensureStoreDir() {
  const { storageDir } = getStorePaths();
  fs.mkdirSync(storageDir, { recursive: true });
}

function readJsonFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  if (!raw.trim()) return null;
  return JSON.parse(raw);
}

function getSqlJs() {
  if (!sqlJsPromise) {
    sqlJsPromise = initSqlJs({
      locateFile: file => path.join(app.getAppPath(), "node_modules", "sql.js", "dist", file),
    });
  }

  return sqlJsPromise;
}

function validatePersistedState(value) {
  if (!value || typeof value !== "object") {
    return {
      records: [],
      settings: null,
      recoverySnapshot: null,
    };
  }

  return {
    records: Array.isArray(value.records) ? value.records : [],
    settings: value.settings && typeof value.settings === "object" ? value.settings : null,
    recoverySnapshot:
      value.recoverySnapshot &&
      typeof value.recoverySnapshot === "object" &&
      Array.isArray(value.recoverySnapshot.records)
        ? value.recoverySnapshot
        : null,
  };
}

function ensureDatabaseSchema(db) {
  db.run(`
    CREATE TABLE IF NOT EXISTS records (
      row_order INTEGER NOT NULL,
      id TEXT PRIMARY KEY,
      tipo TEXT,
      fecha TEXT,
      nombre TEXT,
      categoria TEXT,
      descripcion TEXT,
      cantidad REAL,
      attachments_json TEXT NOT NULL,
      record_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS metadata (
      key TEXT PRIMARY KEY,
      value_json TEXT NOT NULL
    );
  `);
}

async function openDatabase(filePath) {
  const SQL = await getSqlJs();
  const buffer = fs.existsSync(filePath) ? fs.readFileSync(filePath) : null;
  const db = buffer ? new SQL.Database(buffer) : new SQL.Database();
  ensureDatabaseSchema(db);
  return db;
}

function readMetadataValue(db, key) {
  const stmt = db.prepare("SELECT value_json FROM metadata WHERE key = ?");
  try {
    stmt.bind([key]);
    if (!stmt.step()) return null;
    return JSON.parse(stmt.getAsObject().value_json);
  } finally {
    stmt.free();
  }
}

function readStateFromDatabase(db) {
  const recordRows = db.exec("SELECT record_json FROM records ORDER BY row_order ASC");
  const records =
    recordRows[0]?.values?.map(([rawRecord]) => {
      try {
        return JSON.parse(rawRecord);
      } catch {
        return null;
      }
    }).filter(Boolean) || [];

  return validatePersistedState({
    records,
    settings: readMetadataValue(db, "settings"),
    recoverySnapshot: readMetadataValue(db, "recoverySnapshot"),
  });
}

function exportDatabase(db) {
  return Buffer.from(db.export());
}

function writeDatabaseToDisk(db, filePath) {
  const { dbTempPath } = getStorePaths();
  fs.writeFileSync(dbTempPath, exportDatabase(db));
  fs.renameSync(dbTempPath, filePath);
}

function writeStateToDatabase(db, payload) {
  const sanitized = validatePersistedState(payload);
  db.run("BEGIN TRANSACTION");

  try {
    db.run("DELETE FROM records");
    db.run("DELETE FROM metadata WHERE key IN ('settings', 'recoverySnapshot')");

    const insertRecord = db.prepare(`
      INSERT INTO records (
        row_order,
        id,
        tipo,
        fecha,
        nombre,
        categoria,
        descripcion,
        cantidad,
        attachments_json,
        record_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    sanitized.records.forEach((record, index) => {
      const attachments = Array.isArray(record.attachments) ? record.attachments : [];
      insertRecord.run([
        index,
        String(record.id ?? `${Date.now()}-${index}`),
        record.tipo ?? null,
        record.fecha ?? null,
        record.nombre ?? null,
        record.categoria ?? null,
        record.descripcion ?? null,
        record.cantidad == null ? null : Number(record.cantidad),
        JSON.stringify(attachments),
        JSON.stringify(record),
      ]);
    });
    insertRecord.free();

    const upsertMetadata = db.prepare(`
      INSERT INTO metadata (key, value_json)
      VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json
    `);

    if (sanitized.settings) {
      upsertMetadata.run(["settings", JSON.stringify(sanitized.settings)]);
    }

    if (sanitized.recoverySnapshot) {
      upsertMetadata.run(["recoverySnapshot", JSON.stringify(sanitized.recoverySnapshot)]);
    }

    upsertMetadata.free();
    db.run("COMMIT");
    return sanitized;
  } catch (error) {
    db.run("ROLLBACK");
    throw error;
  }
}

async function migrateLegacyJsonToDatabase(sourcePath, targetPath) {
  const legacyState = validatePersistedState(readJsonFile(sourcePath));
  const db = await openDatabase(targetPath);

  try {
    writeStateToDatabase(db, legacyState);
    writeDatabaseToDisk(db, targetPath);
  } finally {
    db.close();
  }

  return legacyState;
}

async function loadPersistedState() {
  ensureStoreDir();
  const { dbPath, dbBackupPath, legacyStorePath, legacyBackupPath } = getStorePaths();

  try {
    if (fs.existsSync(dbPath)) {
      const db = await openDatabase(dbPath);
      try {
        return {
          ok: true,
          data: readStateFromDatabase(db),
          source: "file",
          recoveredFromBackup: false,
          storage: "sqlite",
        };
      } finally {
        db.close();
      }
    }

    if (fs.existsSync(legacyStorePath)) {
      const migratedState = await migrateLegacyJsonToDatabase(legacyStorePath, dbPath);
      return {
        ok: true,
        data: migratedState,
        source: "file",
        recoveredFromBackup: false,
        storage: "sqlite",
        message: "Datos migrados automaticamente desde el almacenamiento anterior.",
      };
    }

    return {
      ok: true,
      data: validatePersistedState(null),
      source: "empty",
      recoveredFromBackup: false,
      storage: "sqlite",
    };
  } catch (error) {
    try {
      if (fs.existsSync(dbBackupPath)) {
        const backupDb = await openDatabase(dbBackupPath);
        try {
          return {
            ok: true,
            data: readStateFromDatabase(backupDb),
            source: "backup",
            recoveredFromBackup: true,
            storage: "sqlite",
            message: "Se recuperaron los datos desde la copia de seguridad SQLite.",
          };
        } finally {
          backupDb.close();
        }
      }

      if (fs.existsSync(legacyBackupPath)) {
        const migratedBackupState = await migrateLegacyJsonToDatabase(legacyBackupPath, dbPath);
        return {
          ok: true,
          data: migratedBackupState,
          source: "backup",
          recoveredFromBackup: true,
          storage: "sqlite",
          message: "Se recuperaron datos desde la copia JSON heredada y se migraron a SQLite.",
        };
      }

      throw error;
    } catch {
      return {
        ok: false,
        message: error.message,
      };
    }
  }
}

async function savePersistedState(payload) {
  ensureStoreDir();
  const { dbPath, dbBackupPath } = getStorePaths();
  const db = await openDatabase(dbPath);

  try {
    const sanitized = writeStateToDatabase(db, payload);

    if (fs.existsSync(dbPath)) {
      fs.copyFileSync(dbPath, dbBackupPath);
    }

    writeDatabaseToDisk(db, dbPath);

    return {
      ok: true,
      path: dbPath,
      backupPath: dbBackupPath,
      storage: "sqlite",
      recordsCount: sanitized.records.length,
    };
  } finally {
    db.close();
  }
}

function sendUpdaterEvent(type, payload = {}) {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  mainWindow.webContents.send("updater:event", { type, ...payload });
}

function hasCustomFeedUrl() {
  return Boolean(process.env.APP_UPDATE_URL && process.env.APP_UPDATE_URL.trim());
}

function createUpdater() {
  if (!app.isPackaged) {
    sendUpdaterEvent("disabled", {
      message: "El auto-update se activa en la app instalada.",
    });
    return null;
  }

  const instance = hasCustomFeedUrl()
    ? new NsisUpdater({
        provider: "generic",
        url: process.env.APP_UPDATE_URL.trim(),
      })
    : new NsisUpdater();

  // 🔴 MASTER AI: Configuración mejorada de actualización automática
  instance.autoDownload = true; // Descargar automáticamente
  instance.autoInstallOnAppQuit = true; // Instalar al cerrar

  instance.on("checking-for-update", () => {
    sendUpdaterEvent("checking", { message: "🔍 Buscando actualizaciones..." });
  });

  instance.on("update-available", info => {
    sendUpdaterEvent("available", {
      version: info.version,
      message: `🚀 Nueva versión disponible: ${info.version}`,
      releaseNotes: info.releaseNotes || "Mejoras y correcciones de errores."
    });
  });

  instance.on("update-not-available", info => {
    sendUpdaterEvent("not-available", {
      version: info.version,
      message: "✅ Ya tienes la última versión instalada.",
    });
  });

  instance.on("download-progress", progress => {
    sendUpdaterEvent("download-progress", {
      percent: progress.percent || 0,
      bytesPerSecond: progress.bytesPerSecond || 0,
      total: progress.total || 0,
      transferred: progress.transferred || 0,
      message: `⬇️ Descargando actualización... ${Math.round(progress.percent || 0)}%`,
    });
  });

  instance.on("update-downloaded", info => {
    sendUpdaterEvent("downloaded", {
      version: info.version,
      message: `✅ Actualización ${info.version} descargada. La app se reiniciará automáticamente.`,
      autoInstall: true
    });
    
    // 🔴 MASTER AI: Instalación automática después de descargar
    setTimeout(() => {
      if (updater && updatesReady) {
        sendUpdaterEvent("installing", {
          message: "🔄 Instalando actualización automáticamente..."
        });
        setImmediate(() => updater.quitAndInstall(false, true));
      }
    }, 3000);
  });

  instance.on("error", error => {
    sendUpdaterEvent("error", {
      message: error == null ? "❌ Error desconocido en el actualizador." : `❌ ${error.message}`,
    });
  });

  updatesReady = true;
  return instance;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 980,
    minWidth: 1100,
    minHeight: 760,
    autoHideMenuBar: true,
    backgroundColor: "#f5f7fa",
    show: false, // Optimización: mostrar solo cuando esté listo
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      enableRemoteModule: false,
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false,
    },
  });

  // Optimización: cargar y mostrar solo cuando esté listo
  mainWindow.loadFile(path.join(app.getAppPath(), "index.html"));
  
  // Mantener zoom simple como la app web
  mainWindow.webContents.setZoomFactor(1.0);
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Optimización: enfocar la ventana al mostrar
    if (process.platform !== 'darwin') {
      mainWindow.focus();
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    const appOrigin = `file://${path.join(app.getAppPath(), "index.html").replace(/\\/g, "/")}`;
    if (url !== appOrigin) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.webContents.on("did-finish-load", () => {
    sendUpdaterEvent("ready", {
      version: app.getVersion(),
      isPackaged: app.isPackaged,
      updatesEnabled: updatesReady,
    });

    if (updatesReady && updater) {
      // 🔴 MASTER AI: Verificación inmediata al iniciar
      setTimeout(() => {
        updater.checkForUpdates().catch(error => {
          sendUpdaterEvent("error", { message: error.message });
        });
      }, 2500);
      
      // 🔴 MASTER AI: Verificación automática cada 30 minutos
      setInterval(() => {
        if (updater && !mainWindow.isDestroyed()) {
          updater.checkForUpdates().catch(error => {
            console.log("Error en verificación automática:", error.message);
          });
        }
      }, 30 * 60 * 1000); // 30 minutos
    }
  });
}

function enableLiveReload() {
  if (app.isPackaged) return;

  const watchFiles = ["index.html", "style.css", "app.js"].map(file => path.join(app.getAppPath(), file));
  watchFiles.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    fs.watch(filePath, { persistent: false }, () => {
      clearTimeout(reloadTimer);
      reloadTimer = setTimeout(() => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.reloadIgnoringCache();
        }
      }, 180);
    });
  });
}

ipcMain.handle("desktop:get-meta", () => ({
  version: app.getVersion(),
  isPackaged: app.isPackaged,
  updatesEnabled: updatesReady,
}));

ipcMain.handle("storage:load", () => loadPersistedState());

ipcMain.handle("storage:save", (_event, payload) => {
  try {
    return savePersistedState(payload);
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
});

ipcMain.handle("desktop:create-shortcut", () => {
  if (!app.isPackaged) {
    return {
      ok: false,
      message: "El acceso directo desde la app solo esta disponible en la version instalada.",
    };
  }

  const desktopPath = app.getPath("desktop");
  const shortcutPath = path.join(desktopPath, "App Gastos Pro.lnk");
  const created = shell.writeShortcutLink(shortcutPath, "create", {
    target: process.execPath,
    cwd: path.dirname(process.execPath),
    description: "App Gastos Pro",
    icon: process.execPath,
    iconIndex: 0,
  });

  return created
    ? { ok: true, message: "Acceso directo creado en el escritorio." }
    : { ok: false, message: "Windows no pudo crear el acceso directo." };
});

ipcMain.handle("updater:check", async () => {
  if (!updater || !updatesReady) {
    return {
      ok: false,
      message: "El auto-update no esta configurado todavia.",
    };
  }

  try {
    await updater.checkForUpdates();
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
});

ipcMain.handle("updater:download", async () => {
  if (!updater || !updatesReady) {
    return {
      ok: false,
      message: "No hay un servidor de actualizaciones configurado.",
    };
  }

  try {
    await updater.downloadUpdate();
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
});

ipcMain.handle("updater:install", () => {
  if (updater && updatesReady) {
    setImmediate(() => updater.quitAndInstall(false, true));
    return { ok: true };
  }

  return { ok: false, message: "No hay actualizaciones listas para instalar." };
});

// Handlers para zoom
ipcMain.handle("zoom:set", async (event, factor) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.setZoomFactor(factor);
    return { ok: true, factor };
  }
  return { ok: false, message: "Ventana no disponible" };
});

ipcMain.handle("zoom:get", async () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    const factor = mainWindow.webContents.getZoomFactor();
    return { ok: true, factor };
  }
  return { ok: false, factor: 1.0 };
});

app.on("window-all-closed", () => {
  // Liberar memoria cuando todas las ventanas se cierran
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  // Limpiar recursos antes de salir
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.removeAllListeners();
  }
  
  // Liberar referencias
  mainWindow = null;
  updater = null;
  updatesReady = false;
  
  if (reloadTimer) {
    clearTimeout(reloadTimer);
    reloadTimer = null;
  }
});

// Optimización: evitar múltiples instancias
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Enfocar la ventana principal si se intenta abrir otra instancia
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
  
  // Crear ventana principal solo si tenemos el lock
  app.whenReady().then(() => {
    app.setAppUserModelId("com.usuario.appgastos");
    updater = createUpdater();
    createWindow();
    enableLiveReload();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });
}
