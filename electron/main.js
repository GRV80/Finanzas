const path = require("path");
const fs = require("fs");
const { app, BrowserWindow, ipcMain, shell } = require("electron");
const { NsisUpdater } = require("electron-updater");

let mainWindow = null;
let updater = null;
let updatesReady = false;
let reloadTimer = null;

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

  instance.autoDownload = false;
  instance.autoInstallOnAppQuit = true;

  instance.on("checking-for-update", () => {
    sendUpdaterEvent("checking", { message: "Buscando actualizaciones..." });
  });

  instance.on("update-available", info => {
    sendUpdaterEvent("available", {
      version: info.version,
      message: `Nueva version disponible: ${info.version}`,
    });
  });

  instance.on("update-not-available", info => {
    sendUpdaterEvent("not-available", {
      version: info.version,
      message: "Ya tienes la ultima version instalada.",
    });
  });

  instance.on("download-progress", progress => {
    sendUpdaterEvent("download-progress", {
      percent: progress.percent || 0,
      bytesPerSecond: progress.bytesPerSecond || 0,
      message: `Descargando actualizacion... ${Math.round(progress.percent || 0)}%`,
    });
  });

  instance.on("update-downloaded", info => {
    sendUpdaterEvent("downloaded", {
      version: info.version,
      message: "Actualizacion descargada. Puedes reiniciar e instalar.",
    });
  });

  instance.on("error", error => {
    sendUpdaterEvent("error", {
      message: error == null ? "Error desconocido en el actualizador." : error.message,
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
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  mainWindow.loadFile(path.join(app.getAppPath(), "index.html"));

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
      setTimeout(() => {
        updater.checkForUpdates().catch(error => {
          sendUpdaterEvent("error", { message: error.message });
        });
      }, 2500);
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

  return {
    ok: false,
    message: "Todavia no hay ninguna actualizacion descargada.",
  };
});

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

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
