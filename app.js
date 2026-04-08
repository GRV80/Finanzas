const form = document.getElementById("gastosForm");

const formFeedback = document.getElementById("formFeedback");

const newColumnInput = document.getElementById("newColumnName");

const btnAddColumn = document.getElementById("btnAddColumn");

const btnAddRow = document.getElementById("btnAddRow");

const btnUndo = document.getElementById("btnUndo");

const tablaBody = document.getElementById("tabla-body");

const totalSpan = document.getElementById("total");

const controls = document.querySelector(".controls");

const entryFormLabels = document.getElementById("entryFormLabels");

const searchInput = document.getElementById("searchInput");

const searchButton = document.getElementById("searchButton");

const filterDateMode = document.getElementById("filterDateMode");

const filterDateModeButtons = Array.from(document.querySelectorAll(".date-filter-pill"));

const filterDay = document.getElementById("filterDay");

const filterMonth = document.getElementById("filterMonth");

const filterYear = document.getElementById("filterYear");

const clearFiltersBtn = document.getElementById("clearFilters");

const entriesSummary = document.getElementById("entriesSummary");

const sortAmount = document.getElementById("sortAmount");

const sortDate = document.getElementById("sortDate");

const desktopShell = document.getElementById("desktopShell");

const desktopVersion = document.getElementById("desktopVersion");

const updateStatus = document.getElementById("updateStatus");

const createShortcutBtn = document.getElementById("createShortcutBtn");

const checkUpdatesBtn = document.getElementById("checkUpdatesBtn");

const downloadUpdateBtn = document.getElementById("downloadUpdateBtn");

const installUpdateBtn = document.getElementById("installUpdateBtn");



const dashboardPeriod = document.getElementById("dashboardPeriod");

const dashboardDate = document.getElementById("dashboardDate");

const dashboardIncome = document.getElementById("dashboardIncome");

const dashboardExpense = document.getElementById("dashboardExpense");

const dashboardBalance = document.getElementById("dashboardBalance");

const dashboardProjection = document.getElementById("dashboardProjection");

const incomeTrend = document.getElementById("incomeTrend");

const expenseTrend = document.getElementById("expenseTrend");

const balanceTrend = document.getElementById("balanceTrend");

const projectionTrend = document.getElementById("projectionTrend");

const metricTrend = document.getElementById("metricTrend");

const dashboardMetric = document.getElementById("dashboardMetric");

const dashboardMetricTitle = document.getElementById("dashboardMetricTitle");

const dashboardMetricValue = document.getElementById("dashboardMetricValue");

const dashboardTheme = document.getElementById("dashboardTheme");

const headerThemeSelect = document.getElementById("headerThemeSelect");

const headerResetTheme = document.getElementById("headerResetTheme");

const resetThemeBtn = document.getElementById("resetTheme");

const dashboardPrev = document.getElementById("dashboardPrev");

const dashboardNext = document.getElementById("dashboardNext");

const dashboardCanvas = document.getElementById("dashboardChart");

const dashboardBackToTop = document.getElementById("dashboardBackToTop");

const dashboardPanel = document.getElementById("dashboardPanel");

const dashboardBody = document.getElementById("dashboardBody");

const toggleDashboard = document.getElementById("toggleDashboard");



const entriesPanel = document.getElementById("entriesPanel");

const entriesBody = document.getElementById("entriesBody");

const toggleEntries = document.getElementById("toggleEntries");

const btnExport = document.getElementById("btnExport");

const btnImport = document.getElementById("btnImport");

const btnRestore = document.getElementById("btnRestore");

const btnClear = document.getElementById("btnClear");

const importFile = document.getElementById("importFile");



const btnImportAlmanaque = document.getElementById("btnImportAlmanaque");

const importAlmanaqueFile = document.getElementById("importAlmanaqueFile");

const btnClearAlmanaque = document.getElementById("btnClearAlmanaque");



const almanaqueYear = document.getElementById("almanaqueYear");

const almanaqueMonth = document.getElementById("almanaqueMonth");

const almanaqueDay = document.getElementById("almanaqueDay");

const almanaqueViewMode = document.getElementById("almanaqueViewMode");

const almanaqueTypeFilter = document.getElementById("almanaqueTypeFilter");

const almanaqueSummary = document.getElementById("almanaqueSummary");

const almanaqueBody = document.getElementById("almanaqueBody");

const almanaqueDayDetails = document.getElementById("almanaqueDayDetails");

const selectedDayInput = document.getElementById("selectedDayInput");

const selectedDayList = document.getElementById("selectedDayList");

const clearDayViewBtn = document.getElementById("clearDayView");

const exportDayAttachmentsBtn = document.getElementById("exportDayAttachments");

const applySelectedDayBtn = document.getElementById("applySelectedDay");

const almanaqueViewDayBtn = document.getElementById("almanaqueViewDay");

const almanaqueAttachmentType = document.getElementById("almanaqueAttachmentType");

const almanaqueAttachmentFile = document.getElementById("almanaqueAttachmentFile");

const almanaquePanel = document.getElementById("almanaquePanel");

const almanaqueIncome = document.getElementById("almanaque-income");

const almanaqueExpense = document.getElementById("almanaque-expense");

const almanaqueTotal = document.getElementById("almanaque-total");

const toggleAlmanaque = document.getElementById("toggleAlmanaque");

const btnExportAlmanaque = document.getElementById("btnExportAlmanaque");

const btnExportDashboard = document.getElementById("btnExportDashboard");

const btnRefreshDashboard = document.getElementById("btnRefreshDashboard");

const btnFullscreenDashboard = document.getElementById("btnFullscreenDashboard");



// Variables del Sidebar

const sidebarBtnRegistro = document.getElementById("sidebarBtnRegistro");

const sidebarBtnAlmanaque = document.getElementById("sidebarBtnAlmanaque");

const sidebarBtnDashboard = document.getElementById("sidebarBtnDashboard");

const sidebarCurrentTheme = document.getElementById("sidebarCurrentTheme");

const mainSidebar = document.getElementById("mainSidebar");



let dashboardChart = null;

let currentTheme = "natural";

let currentActivePanel = "entriesPanel"; // Panel actualmente activo



const categories = [

  "Alquiler",

  "Bebidas",

  "Comida",

  "Comidas Tarjeta",

  "Compras Internet",

  "Deuda",

  "Educación",

  "GASTO FIJO",

  "Gastos Familiares",

  "General",

  "Ganancias",

  "Hogar",

  "INGRESO FIJO",

  "Intereses",

  "Ocio",

  "Otros ingresos",

  "Ropa",

  "Salud",

  "Salidas",

  "Servicio Básicos",

  "Servicios",

  "Supermercado",

  "Teléfono",

  "Transporte",

  "Trabajo",

  "Zapatos",

];



const types = ["Gasto", "Ingreso"];



const baseColumns = [

  { key: "numero", label: "N", type: "number", fixed: true },

  { key: "tipo", label: "Tipo", type: "select", fixed: true },

  { key: "fecha", label: "Fecha / Hora", type: "datetime", fixed: true },

  { key: "nombre", label: "Nombre", type: "text", fixed: true },

  { key: "categoria", label: "Categoría", type: "select" },

  { key: "descripcion", label: "Descripción", type: "text" },

  { key: "cantidad", label: "Precio/Total", type: "number", fixed: true },

];



const columns = baseColumns.map(col => ({ ...col }));

const almanaqueColumnKeys = ["numero", "tipo", "fecha", "nombre", "categoria", "descripcion", "cantidad"];



const STORAGE_KEY = "app-gastos_records";

const SETTINGS_KEY = "app_gastos_settings";

const RECOVERY_KEY = "app_gastos_recovery";

const DATA_LOAD_ERROR_MESSAGE =

  "No se pudo leer el almacenamiento guardado. La app no sobrescribira tus datos hasta que revisemos la copia local.";



let gastos = [];

let focusAfterRender = null;

let lastDeleted = null;



// Hacer el array gastos accesible globalmente para Firebase

window.gastos = gastos;



let settings = {

  theme: "natural",

  backgroundImage: "",

  customColumns: [],

};



let currentAlmanaqueSelectedDate = null;

let editingRowId = null;

let visibleRows = [];

let recoverySnapshot = null;

let persistenceReady = false;

let persistenceBlocked = false;

let pendingAddMode = "single";

let tableFilters = {

  search: "",

  dateMode: "all",

  day: "",

  month: "",

  year: "",

  tipo: "",

  categoria: "",

};

let tableSort = {

  amount: "default",

  date: "default",

};



function setDesktopUpdateState(message, mode = "idle") {

  if (updateStatus) {

    updateStatus.textContent = message || "";

    updateStatus.dataset.mode = mode;

  }



  if (checkUpdatesBtn) {

    checkUpdatesBtn.disabled = mode === "checking" || mode === "downloading";

  }



  if (downloadUpdateBtn) {

    downloadUpdateBtn.hidden = mode !== "available";

    downloadUpdateBtn.disabled = mode === "downloading";

  }



  if (installUpdateBtn) {

    installUpdateBtn.hidden = mode !== "downloaded";

    installUpdateBtn.disabled = false;

  }

}



async function initializeDesktopShell() {

  if (!window.desktopApp) return;



  if (desktopShell) {

    desktopShell.hidden = false;

  }



  const meta = await window.desktopApp.getMeta();



  if (createShortcutBtn) {

    createShortcutBtn.disabled = !meta.isPackaged;

    createShortcutBtn.title = meta.isPackaged

      ? "Crear acceso directo en el escritorio"

      : "Disponible solo en la app instalada";

  }



  if (desktopVersion) {

    desktopVersion.textContent = `Version ${meta.version}${meta.isPackaged ? "" : " · desarrollo"}`;

  }



  setDesktopUpdateState(

    meta.updatesEnabled ? "Actualizaciones listas para comprobar." : "Actualizaciones no configuradas.",

    meta.updatesEnabled ? "idle" : "disabled"

  );



  window.desktopApp.onUpdaterEvent(event => {

    switch (event.type) {

      case "checking":

        setDesktopUpdateState(event.message || "Buscando actualizaciones...", "checking");

        break;

      case "available":

        setDesktopUpdateState(event.message || "Nueva version disponible.", "available");

        break;

      case "download-progress":

        setDesktopUpdateState(event.message || "Descargando actualizacion...", "downloading");

        break;

      case "downloaded":

        setDesktopUpdateState(event.message || "Actualizacion lista para instalar.", "downloaded");

        break;

      case "not-available":

        setDesktopUpdateState(event.message || "Ya tienes la ultima version.", "idle");

        break;

      case "disabled":

        setDesktopUpdateState(event.message || "Actualizaciones desactivadas.", "disabled");

        break;

      case "error":

        setDesktopUpdateState(event.message || "No se pudo completar la actualizacion.", "error");

        break;

      case "ready":

        if (desktopVersion && event.version) {

          desktopVersion.textContent = `Version ${event.version}${event.isPackaged ? "" : " · desarrollo"}`;

        }

        break;

      default:

        break;

    }

  });

}



function saveData() {

  if (persistenceBlocked || !persistenceReady) {

    return;

  }



  if (window.desktopApp?.saveStore) {

    window.desktopApp

      .saveStore({

        records: gastos,

        settings,

        recoverySnapshot,

      })

      .catch(() => {

        // ignore persistence errors

      });

    return;

  }



  try {

    // Limpiar adjuntos no deseados antes de guardar

    const cleanedGastos = gastos.filter(gasto => {

      // Eliminar registros que sean solo adjuntos no deseados

      if (gasto.nombre && gasto.nombre.includes("FACTURA_SOLIDWORKS.pdf")) {

        console.log("🗑️ Eliminando adjunto no deseado:", gasto.nombre);

        return false;

      }

      

      // Eliminar otros adjuntos problemáticos

      if (gasto.descripcion && gasto.descripcion.includes("Registro contable de Importado | Adjuntos:")) {

        console.log("🗑️ Eliminando registro de adjunto automático:", gasto.descripcion);

        return false;

      }

      

      return true;

    });

    

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedGastos));

    

    // Actualizar el array global también

    gastos.length = 0;

    gastos.push(...cleanedGastos);

    window.gastos = gastos;

    

  } catch {

    // ignore storage errors

  }

}



// 🔴 FUNCIÓN ROBUSTA PARA RENUMERACIÓN CORRELATIVA CRONOLÓGICA

function renumerarRegistros() {

  // Ordenar por fecha para mantener orden cronológico perfecto

  gastos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  

  // Renumerar correlativamente sin repetidos según orden cronológico

  gastos.forEach((gasto, index) => {

    gasto.numero = index + 1;

  });

  

  console.log(`🔢 Renumeración cronológica completada: ${gastos.length} registros con números 1-${gastos.length}`);

  console.log(`📅 Orden: ${gastos[0]?.fecha} → ${gastos[gastos.length-1]?.fecha}`);

}



function normalizeRecord(record = {}) {

  const normalized = { ...record };



  if (!normalized.id) {

    normalized.id = Date.now() + Math.floor(Math.random() * 1000);

  }



  if (!Array.isArray(normalized.attachments)) {

    normalized.attachments = [];

  }



  // 🔴 CONTROL NUMÉRICO CORRELATIVO SIN REPETIDOS

  // NO reasignar número aquí, solo asegurar que tenga valor

  // La renumeración se hará en las funciones de carga y renderizado

  if (normalized.numero == null || normalized.numero === "") {

    normalized.numero = 0; // Se renumerará después

  }



  columns.forEach(col => {

    if (normalized[col.key] == null) {

      if (col.type === "number") {

        normalized[col.key] = 0;

      } else if (col.type === "datetime") {

        normalized[col.key] = getNowDateTimeLocal();

      } else if (col.type === "select") {

        normalized[col.key] = col.key === "tipo" ? types[0] : categories[0];

      } else {

        normalized[col.key] = "";

      }

    }

  });



  return normalized;

}



function restoreColumns(customColumns = settings.customColumns || []) {

  const restored = baseColumns.map(col => ({ ...col }));

  const knownKeys = new Set(restored.map(col => col.key));



  customColumns.forEach(col => {

    if (!col || typeof col !== "object") return;

    if (!col.key || knownKeys.has(col.key)) return;



    restored.push({

      key: col.key,

      label: col.label || col.key,

      type: col.type || "text",

      custom: true,

    });

    knownKeys.add(col.key);

  });



  columns.splice(0, columns.length, ...restored);

}



function syncCustomColumnsWithSettings(shouldSave = true) {

  settings.customColumns = columns

    .filter(col => col.custom)

    .map(({ key, label, type }) => ({ key, label, type }));



  if (shouldSave) {

    saveSettings();

  }

}



function mergeCustomColumnsFromRecords(records) {

  const knownKeys = new Set(columns.map(col => col.key));

  const reserved = new Set(["id", "attachments", "searchTerms"]);

  // Limpiar searchTerms del array columns si existe
  const searchTermsIndex = columns.findIndex(col => col.key === 'searchTerms');
  if (searchTermsIndex !== -1) {
    columns.splice(searchTermsIndex, 1);
    console.log('Eliminada columna searchTerms del array columns');
  }

  console.log('Columns array después de limpieza:', columns.map(col => col.key));



  records.forEach(record => {

    Object.keys(record || {}).forEach(key => {

      if (knownKeys.has(key) || reserved.has(key)) return;



      columns.push({

        key,

        label: key.replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase()),

        type: "text",

        custom: true,

      });

      knownKeys.add(key);

    });

  });



  syncCustomColumnsWithSettings(false);

}



function loadData() {

  let loaded = false;



  try {

    console.log("📂 Cargando datos desde localStorage...");

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {

      console.log("❌ No hay datos en localStorage");

      return loaded;

    }

    

    const parsed = JSON.parse(raw);

    console.log(`📊 Se encontraron ${parsed.length} registros en localStorage`);

    

    if (Array.isArray(parsed)) {

      const cleaned = cleanupLycamobileDuplicates(parsed);

      mergeCustomColumnsFromRecords(cleaned);

      gastos = cleaned.map(normalizeRecord);

      

      // 🔴 RENUMERACIÓN CORRELATIVA SIN REPETIDOS

      renumerarRegistros();

      

      // Hacer global para Firebase

      window.gastos = gastos;

      

      loaded = true;

      console.log(`✅ ${gastos.length} registros cargados correctamente`);

    }

  } catch (error) {

    console.error("❌ Error cargando datos:", error);

  }



  return loaded;

}



function saveSettings() {

  if (persistenceBlocked || !persistenceReady) {

    return;

  }



  if (window.desktopApp?.saveStore) {

    saveData();

    return;

  }



  try {

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

  } catch {

    // ignore storage errors

  }

}



function normalizeComparableText(value) {

  return normalizeText(value).replace(/[^a-z0-9]/g, "");

}



function cleanupLycamobileDuplicates(records = []) {

  const targetNames = new Set(["lycamobilech", "lycamobylech"]);

  const preferredDate = "2026-03-24";

  let preferredKept = false;



  return records.reduce((acc, record) => {

    const nameKey = normalizeComparableText(record?.nombre);

    const dateKey = String(record?.fecha || "").slice(0, 10);

    if (!targetNames.has(nameKey)) {

      acc.push(record);

      return acc;

    }

    if (dateKey === preferredDate && !preferredKept) {

      preferredKept = true;

      acc.push({

        ...record,

        attachments: [],

      });

    }

    return acc;

  }, []);

}



function saveRecoverySnapshot(reason = "manual") {

  recoverySnapshot = {

    savedAt: new Date().toISOString(),

    reason,

    records: gastos.map(record => ({

      ...record,

      attachments: Array.isArray(record.attachments) ? [...record.attachments] : [],

    })),

    customColumns: settings.customColumns || [],

  };



  if (persistenceBlocked || !persistenceReady) {

    return;

  }



  if (window.desktopApp?.saveStore) {

    saveData();

    return;

  }



  try {

    localStorage.setItem(RECOVERY_KEY, JSON.stringify(recoverySnapshot));

  } catch {

    // ignore storage errors

  }

}



function loadRecoverySnapshot() {

  try {

    const raw = localStorage.getItem(RECOVERY_KEY);

    if (!raw) return;

    const parsed = JSON.parse(raw);

    if (parsed && Array.isArray(parsed.records)) {

      recoverySnapshot = parsed;

    }

  } catch {

    // ignore parse errors

  }

}



function setRestoreButtonState() {

  if (!btnRestore) return;

  const hasSnapshot = !!(recoverySnapshot && Array.isArray(recoverySnapshot.records));

  btnRestore.disabled = !hasSnapshot;

  btnRestore.title = hasSnapshot

    ? `Recuperar copia guardada${recoverySnapshot.savedAt ? ` (${new Date(recoverySnapshot.savedAt).toLocaleString("es-ES")})` : ""}`

    : "Todavía no hay una copia para recuperar";

}



function loadSettings() {

  let loaded = false;



  try {

    const raw = localStorage.getItem(SETTINGS_KEY);

    if (!raw) return loaded;

    const parsed = JSON.parse(raw);

    if (parsed && typeof parsed === "object") {

      settings = { ...settings, ...parsed };

      if (!parsed.theme || parsed.theme === "blue") {

        settings.theme = "natural";

      }

      restoreColumns(settings.customColumns);

      loaded = true;

    }

  } catch {

    // ignore parse errors

  }



  return loaded;

}



function applyPersistedState(payload = {}) {

  if (payload.settings && typeof payload.settings === "object") {

    settings = { ...settings, ...payload.settings };

    if (!payload.settings.theme || payload.settings.theme === "blue") {

      settings.theme = "natural";

    }

    restoreColumns(settings.customColumns);

  }



  if (Array.isArray(payload.records)) {

    const cleaned = cleanupLycamobileDuplicates(payload.records);

    mergeCustomColumnsFromRecords(cleaned);

    gastos = cleaned.map(normalizeRecord);

  }



  if (payload.recoverySnapshot && Array.isArray(payload.recoverySnapshot.records)) {

    recoverySnapshot = payload.recoverySnapshot;

  }

}



async function initializePersistence() {

  if (window.desktopApp?.loadStore) {

    const stored = await window.desktopApp.loadStore();



    if (stored?.ok) {

      applyPersistedState(stored.data || {});

      persistenceReady = true;



      const migratedFromLocalStorage =

        stored.source !== "file" &&

        (loadSettings() || loadData() || (loadRecoverySnapshot(), !!recoverySnapshot));



      if (migratedFromLocalStorage) {

        saveData();

      }



      return;

    }



    persistenceBlocked = true;

    console.error(DATA_LOAD_ERROR_MESSAGE, stored?.message || "");

    return;

  }



  loadSettings();

  loadData();

  loadRecoverySnapshot();

  persistenceReady = true;

}



function getNowDateTimeLocal() {

  const now = new Date();

  const pad = n => String(n).padStart(2, "0");

  const year = now.getFullYear();

  const month = pad(now.getMonth() + 1);

  const day = pad(now.getDate());

  const hours = pad(now.getHours());

  const minutes = pad(now.getMinutes());



  return `${year}-${month}-${day}T${hours}:${minutes}`;

}



function createUniqueId() {

  return Date.now() + Math.floor(Math.random() * 1000000);

}



function splitDateTimeLocal(dateTime) {

  if (!dateTime || typeof dateTime !== "string") return { date: "", time: "" };

  const [date = "", time = ""] = dateTime.split("T");

  return { date, time };

}



const themePalette = {

  natural: {

    background: "#f6f3ec",

    primary: "#6f7b5f",

    primaryDark: "#556148",

    cardBg: "#fbf8f2",

    cardBorder: "#d8d0c1",

    panelBg: "#f8f4ec",

    panelBorder: "#d8d0c1",

    tableBg: "#fffdf8",

    tableHeader: "#f3ede2",

    tableBorder: "#d8d0c1",

    tableRowAlt: "rgba(111, 123, 95, 0.06)",

    text: "#2c3326",

    muted: "#6f7567",

    chartBg: "rgba(111, 123, 95, 0.75)",

    chartBorder: "rgba(111, 123, 95, 1)",

  },

  blue: {

    background: "#ffffff",

    primary: "#1e7fe2",

    primaryDark: "#1664c8",

    cardBg: "#f3f6f4",

    cardBorder: "#d0d7d3",

    text: "#222",

    muted: "#555",

    chartBg: "rgba(30, 126, 226, 0.7)",

    chartBorder: "rgba(30, 126, 226, 1)",

  },

  green: {

    background: "#f4f9f4",

    primary: "#2e7d32",

    primaryDark: "#256e2c",

    cardBg: "#f4f9f4",

    cardBorder: "#c8d9c8",

    text: "#222",

    muted: "#555",

    chartBg: "rgba(46, 125, 50, 0.7)",

    chartBorder: "rgba(46, 125, 50, 1)",

  },

  orange: {

    background: "#fff6e7",

    primary: "#f57c00",

    primaryDark: "#d46b00",

    cardBg: "#fdf6f0",

    cardBorder: "#e8d3c1",

    text: "#222",

    muted: "#555",

    chartBg: "rgba(245, 124, 0, 0.7)",

    chartBorder: "rgba(245, 124, 0, 1)",

  },

  purple: {

    background: "#f9f5ff",

    primary: "#6a1b9a",

    primaryDark: "#580f7d",

    cardBg: "#f5f0fb",

    cardBorder: "#d7c8e6",

    text: "#222",

    muted: "#555",

    chartBg: "rgba(106, 27, 154, 0.7)",

    chartBorder: "rgba(106, 27, 154, 1)",

  },

  red: {

    background: "#fff4f3",

    primary: "#d32f2f",

    primaryDark: "#b71c1c",

    cardBg: "#fbeae9",

    cardBorder: "#e2b8b6",

    text: "#222",

    muted: "#555",

    chartBg: "rgba(211, 47, 47, 0.7)",

    chartBorder: "rgba(211, 47, 47, 1)",

  },

  teal: {

    background: "#e0f2f1",

    primary: "#00796b",

    primaryDark: "#004d40",

    cardBg: "#e0f2f1",

    cardBorder: "#b2dfdb",

    text: "#222",

    muted: "#555",

    chartBg: "rgba(0, 151, 167, 0.7)",

    chartBorder: "rgba(0, 151, 167, 1)",

  },

  gray: {

    background: "#f5f5f5",

    primary: "#616161",

    primaryDark: "#424242",

    cardBg: "#ffffff",

    cardBorder: "#e0e0e0",

    text: "#222",

    muted: "#555",

    chartBg: "rgba(97, 97, 97, 0.7)",

    chartBorder: "rgba(97, 97, 97, 1)",

  },

  neutral: {

    background: "#ffffff",

    primary: "#000000",

    primaryDark: "#222222",

    cardBg: "#ffffff",

    cardBorder: "#000000",

    panelBg: "#ffffff",

    panelBorder: "#000000",

    tableBg: "#ffffff",

    tableHeader: "#f2f2f2",

    tableBorder: "#000000",

    tableRowAlt: "rgba(0, 0, 0, 0.04)",

    text: "#000000",

    muted: "#333333",

    chartBg: "rgba(0, 0, 0, 0.7)",

    chartBorder: "rgba(0, 0, 0, 1)",

  },

  gold: {

    background: "#fff9ec",

    primary: "#b7791f",

    primaryDark: "#8f5d15",

    cardBg: "#fff7e0",

    cardBorder: "#e8cf91",

    text: "#332208",

    muted: "#6a5320",

    chartBg: "rgba(183, 121, 31, 0.7)",

    chartBorder: "rgba(183, 121, 31, 1)",

  },

  rose: {

    background: "#fff5f7",

    primary: "#c2185b",

    primaryDark: "#8e1241",

    cardBg: "#ffe8ef",

    cardBorder: "#efbfd0",

    text: "#3c1020",

    muted: "#7a4054",

    chartBg: "rgba(194, 24, 91, 0.7)",

    chartBorder: "rgba(194, 24, 91, 1)",

  },

  ocean: {

    background: "#f0f8ff",

    primary: "#003366",

    primaryDark: "#002244",

    cardBg: "#ffffff",

    cardBorder: "#d0e0f0",

    text: "#0b2740",

    muted: "#45627f",

    chartBg: "rgba(21, 101, 192, 0.7)",

    chartBorder: "rgba(21, 101, 192, 1)",

  },

  mint: {

    background: "#f5faf5",

    primary: "#2e7d32",

    primaryDark: "#256e2c",

    cardBg: "#ffffff",

    cardBorder: "#c8e6c9",

    text: "#1b5e20",

    muted: "#4caf50",

    chartBg: "rgba(46, 125, 50, 0.7)",

    chartBorder: "rgba(46, 125, 50, 1)",

  },

  turquoise: {

    background: "#f0fdfc",

    primary: "#00695c",

    primaryDark: "#004d40",

    cardBg: "#ffffff",

    cardBorder: "#b2dfdb",

    text: "#004d40",

    muted: "#26a69a",

    chartBg: "rgba(0, 105, 92, 0.7)",

    chartBorder: "rgba(0, 105, 92, 1)",

  },

  sky: {

    background: "#f8faff",

    primary: "#1565c0",

    primaryDark: "#0d47a1",

    cardBg: "#ffffff",

    cardBorder: "#bbdefb",

    text: "#0d47a1",

    muted: "#42a5f5",

    chartBg: "rgba(21, 101, 192, 0.7)",

    chartBorder: "rgba(21, 101, 192, 1)",

  },

  cornflower: {

    background: "#f8f9ff",

    primary: "#283593",

    primaryDark: "#1a237e",

    cardBg: "#ffffff",

    cardBorder: "#c5cae9",

    text: "#1a237e",

    muted: "#5c6bc0",

    chartBg: "rgba(40, 53, 147, 0.7)",

    chartBorder: "rgba(40, 53, 147, 1)",

  },

  steel: {

    background: "#fafbfc",

    primary: "#37474f",

    primaryDark: "#263238",

    cardBg: "#ffffff",

    cardBorder: "#cfd8dc",

    text: "#263238",

    muted: "#607d8b",

    chartBg: "rgba(55, 71, 79, 0.7)",

    chartBorder: "rgba(55, 71, 79, 1)",

  },

  midnight: {

    background: "#081a41",

    primary: "#0f2744",

    primaryDark: "#061229",

    cardBg: "#0f2958",

    cardBorder: "#1a3a6c",

    text: "#ffffff",

    muted: "#b8c5d6",

    tableBg: "#0f2958",

    tableHeader: "#1a3a6c",

    tableBorder: "#244080",

    tableRowAlt: "rgba(255, 255, 255, 0.05)",

    chartBg: "rgba(8, 26, 65, 0.8)",

    chartBorder: "rgba(8, 26, 65, 1)",

    headerText: "rgba(8, 26, 65, 1)",

    tableHeaderText: "#ffffff",

    buttonText: "#ffffff",

    menuText: "#ffffff",

    sidebarText: "#ffffff",

  },

};



function getCssVar(name) {

  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "";

}



function applyTheme(theme) {

  currentTheme = theme in themePalette ? theme : "natural";

  const palette = themePalette[currentTheme];



  document.documentElement.style.setProperty("--background", palette.background);

  document.documentElement.style.setProperty("--primary", palette.primary);

  document.documentElement.style.setProperty("--primary-dark", palette.primaryDark);

  document.documentElement.style.setProperty("--card-bg", palette.cardBg);

  document.documentElement.style.setProperty("--panel-bg", palette.panelBg || palette.cardBg);

  document.documentElement.style.setProperty("--panel-border", palette.panelBorder || palette.cardBorder);

  document.documentElement.style.setProperty("--table-bg", palette.tableBg || palette.cardBg);

  document.documentElement.style.setProperty("--table-header", palette.tableHeader || palette.cardBg);

  document.documentElement.style.setProperty("--table-row-alt", palette.tableRowAlt || "rgba(0,0,0,0.03)");

  document.documentElement.style.setProperty("--table-border", palette.tableBorder || palette.cardBorder);

  document.documentElement.style.setProperty("--text", palette.text || "#000");

  document.documentElement.style.setProperty("--muted", palette.muted || "#555");

  

  // Aplicar variables del sidebar sincronizadas con el tema

  const sidebarBg = palette.primary || "#003366";

  const sidebarHover = palette.primaryDark || "rgba(0, 51, 102, 0.8)";

  const sidebarActive = palette.primaryDark || "rgba(0, 51, 102, 0.9)";

  const sidebarBorder = palette.primaryDark || "rgba(0, 51, 102, 0.3)";

  

  document.documentElement.style.setProperty("--sidebar-bg", sidebarBg);

  document.documentElement.style.setProperty("--sidebar-hover", sidebarHover);

  document.documentElement.style.setProperty("--sidebar-active", sidebarActive);

  document.documentElement.style.setProperty("--sidebar-border", sidebarBorder);

  

  // Aplicar border colors al header sincronizados con el tema

  const headerBorder = palette.primaryDark || "rgba(0, 51, 102, 0.5)";

  const headerShadow = palette.primaryDark || "rgba(0, 51, 102, 0.2)";

  

  document.documentElement.style.setProperty("--header-border", headerBorder);

  document.documentElement.style.setProperty("--header-shadow", headerShadow);



  if (dashboardTheme && dashboardTheme.value !== currentTheme) {

    dashboardTheme.value = currentTheme;

  }

  

  // Actualizar tema en el sidebar

  updateSidebarTheme();

  if (headerThemeSelect && headerThemeSelect.value !== currentTheme) {

    headerThemeSelect.value = currentTheme;

  }



  if (dashboardChart) {

    dashboardChart.data.datasets[0].backgroundColor = palette.chartBg;

    dashboardChart.data.datasets[0].borderColor = palette.chartBorder;



    const textColor = getCssVar("--text") || "#000";

    const gridColor = getCssVar("--table-border") || "rgba(0,0,0,0.1)";



    dashboardChart.options.scales.x.ticks.color = textColor;

    dashboardChart.options.scales.y.ticks.color = textColor;

    if (dashboardChart.options.scales.x.grid) {

      dashboardChart.options.scales.x.grid.color = gridColor;

    }

    if (dashboardChart.options.scales.y.grid) {

      dashboardChart.options.scales.y.grid.color = gridColor;

    }

    if (dashboardChart.options.plugins && dashboardChart.options.plugins.legend) {

      dashboardChart.options.plugins.legend.labels.color = textColor;

    }

    dashboardChart.update();

  }



  if (dashboardDate && dashboardPeriod) {

    updateDashboard();

  }

}



function togglePanel(panelBody, toggleButton) {

  if (!panelBody || !toggleButton) return;



  const isHidden = panelBody.classList.toggle("hidden");

  // Mantener el icono 👁️ y solo cambiar el tooltip

  toggleButton.title = isHidden ? "Mostrar panel" : "Ocultar panel";

}



function exportData() {

  // Mostrar menú de opciones de exportación

  showExportMenu();

}



function showExportMenu() {

  // Crear modal de opciones de exportación

  const modal = document.createElement('div');

  modal.style.cssText = `

    position: fixed;

    top: 50%;

    left: 50%;

    transform: translate(-50%, -50%);

    background: white;

    padding: 30px;

    border-radius: 12px;

    box-shadow: 0 10px 30px rgba(0,0,0,0.3);

    z-index: 10000;

    min-width: 450px;

  `;

  

  modal.innerHTML = `

    <h3 style="margin: 0 0 20px 0; color: #333;">Exportar Registros Contables</h3>

    <p style="margin: 0 0 20px 0; color: #666;">Selecciona el formato de exportación:</p>

    

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">

      <button onclick="exportAsJSON()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📄 JSON (Original)

      </button>

      <button onclick="exportAsExcel()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #e8f5e8; color: #333; font-weight: 600;">

        📊 Excel (.xlsx)

      </button>

      <button onclick="exportAsCSV()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📋 CSV (Excel)

      </button>

      <button onclick="exportAsPDF()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📋 PDF (Documento)

      </button>

      <button onclick="exportAsTXT()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📝 TXT (Texto)

      </button>

      <button onclick="exportAsWord()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📝 Word (Documento)

      </button>

      <button onclick="exportAsImage()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        🖼️ Imagen (PNG/JPG)

      </button>

      <button onclick="exportAsJSON()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        🔄 Backup Completo

      </button>

    </div>

    

    <div style="display: flex; gap: 10px; justify-content: flex-end;">

      <button onclick="closeExportModal()" style="padding: 10px 20px; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; background: #f8f9fa; color: #333;">

        Cancelar

      </button>

    </div>

  `;

  

  // Añadir backdrop

  const backdrop = document.createElement('div');

  backdrop.style.cssText = `

    position: fixed;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    background: rgba(0,0,0,0.5);

    z-index: 9999;

  `;

  

  // Función para cerrar modal correctamente

  window.closeExportModal = function() {

    const modal = document.querySelector('[style*="z-index: 10000"]');

    const backdrop = document.querySelector('[style*="z-index: 9999"]');

    if (modal) modal.remove();

    if (backdrop) backdrop.remove();

    // Limpiar la función global

    delete window.closeExportModal;

  };

  

  backdrop.onclick = () => closeExportModal();

  

  document.body.appendChild(backdrop);

  document.body.appendChild(modal);

}



function mapImportedKey(key = "") {

  const normalized = normalizeText(key).replace(/[^a-z0-9]/g, "");

  const aliases = {

    tipo: "tipo",

    tipodemovimiento: "tipo",

    movimiento: "tipo",

    nombre: "nombre",

    articulo: "nombre",

    concepto: "nombre",

    categoria: "categoria",

    cantidad: "cantidad",

    monto: "cantidad",

    importe: "cantidad",

    valor: "cantidad",

    descripcion: "descripcion",

    detalle: "descripcion",

    fecha: "fecha",

    dia: "fecha",

  };

  return aliases[normalized] || key;

}



// FUNCIONES DE EXPORTACIÓN POR FORMATO

window.exportAsJSON = function() {

  const payload = {

    exportedAt: new Date().toISOString(),

    records: gastos,

    customColumns: settings.customColumns || [],

  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = `gastos-${new Date().toISOString().slice(0, 10)}.json`;

  a.click();

  URL.revokeObjectURL(url);

  

  // Cerrar modal

  if (window.closeExportModal) closeExportModal();

};



window.exportAsCSV = function() {

  if (gastos.length === 0) {

    alert("No hay registros para exportar");

    if (window.closeExportModal) closeExportModal();

    return;

  }

  

  // Obtener el orden exacto de las columnas como se ven en pantalla

  const visibleColumns = columns.filter(col => !col.hidden);

  const headers = visibleColumns.map(col => 

    col.label.charAt(0).toUpperCase() + col.label.slice(1)

  );

  

  // Crear contenido CSV manteniendo el orden visual

  const csvContent = [

    headers.join(";"), // Usar punto y coma para compatibilidad con Excel

    ...gastos.map(gasto => 

      visibleColumns.map(col => {

        let value = gasto[col.key] || "";

        // Escapar comillas y envolver en comillas si contiene caracteres especiales

        if (typeof value === 'string' && (value.includes(";") || value.includes('"') || value.includes('\n'))) {

          value = `"${value.replace(/"/g, '""')}"`;

        } else if (typeof value === 'string') {

          value = value.replace(/"/g, '""');

        }

        return value;

      }).join(";")

    )

  ].join("\n");

  

  // Agregar BOM para proper UTF-8 en Excel

  const BOM = "\uFEFF";

  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = `gastos-${new Date().toISOString().slice(0, 10)}.csv`;

  a.click();

  URL.revokeObjectURL(url);

  

  console.log(`📊 CSV exportado: ${gastos.length} registros con ${headers.length} columnas`);

  console.log(`📋 Columnas exportadas: ${headers.join(", ")}`);

  

  // Cerrar modal

  if (window.closeExportModal) closeExportModal();

};



// Nueva función para exportar a Excel profesional

window.exportAsExcel = function() {

  if (gastos.length === 0) {

    alert("No hay registros para exportar");

    if (window.closeExportModal) closeExportModal();

    return;

  }

  

  if (typeof XLSX === 'undefined') {

    alert("Librería Excel no cargada. Por favor, recarga la página.");

    if (window.closeExportModal) closeExportModal();

    return;

  }

  

  try {

    // Obtener columnas visibles en orden

    const visibleColumns = columns.filter(col => !col.hidden);

    const headers = visibleColumns.map(col => col.label);

    

    // Preparar datos para Excel

    const excelData = [

      headers, // Encabezados

      ...gastos.map(gasto => 

        visibleColumns.map(col => {

          let value = gasto[col.key] || "";

          // Formatear fechas para Excel

          if (col.type === 'datetime' && value) {

            const date = new Date(value);

            if (!isNaN(date.getTime())) {

              return date;

            }

          }

          // Convertir números

          if (col.type === 'number' && value) {

            return parseFloat(value) || 0;

          }

          return value;

        })

      )

    ];

    

    // Crear workbook

    const ws = XLSX.utils.aoa_to_sheet(excelData);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Registros Contables");

    

    // Ajustar ancho de columnas

    const colWidths = headers.map((header, i) => ({

      wch: Math.max(header.length, 15, ...gastos.map(g => String(g[visibleColumns[i].key] || "").length))

    }));

    ws['!cols'] = colWidths;

    

    // Generar y descargar archivo

    XLSX.writeFile(wb, `gastos-${new Date().toISOString().slice(0, 10)}.xlsx`);

    

    console.log(`📊 Excel exportado: ${gastos.length} registros con ${headers.length} columnas`);

    

  } catch (error) {

    console.error("❌ Error exportando a Excel:", error);

    alert("Error al exportar a Excel: " + error.message);

  }

  

  // Cerrar modal

  if (window.closeExportModal) closeExportModal();

};



window.exportAsTXT = function() {

  if (gastos.length === 0) {

    alert("No hay registros para exportar");

    if (window.closeExportModal) closeExportModal();

    return;

  }

  

  let txtContent = `REGISTROS CONTABLES\n`;

  txtContent += `Exportado: ${new Date().toLocaleString()}\n`;

  txtContent += `Total de registros: ${gastos.length}\n`;

  txtContent += `${"=".repeat(80)}\n\n`;

  

  gastos.forEach((gasto, index) => {

    txtContent += `REGISTRO #${index + 1}\n`;

    txtContent += `Fecha: ${gasto.fecha || "N/A"}\n`;

    txtContent += `Tipo: ${gasto.tipo || "N/A"}\n`;

    txtContent += `Nombre: ${gasto.nombre || "N/A"}\n`;

    txtContent += `Categoría: ${gasto.categoria || "N/A"}\n`;

    txtContent += `Cantidad: ${gasto.cantidad || 0}€\n`;

    txtContent += `Descripción: ${gasto.descripcion || "N/A"}\n`;

    txtContent += `${"-".repeat(40)}\n\n`;

  });

  

  const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = `gastos-${new Date().toISOString().slice(0, 10)}.txt`;

  a.click();

  URL.revokeObjectURL(url);

  

  // Cerrar modal

  if (window.closeExportModal) closeExportModal();

};



window.exportAsPDF = function() {

  if (gastos.length === 0) {

    alert("No hay registros para exportar");

    if (window.closeExportModal) closeExportModal();

    return;

  }

  

  if (typeof window.jspdf === 'undefined') {

    alert("Librería PDF no cargada. Por favor, recarga la página.");

    if (window.closeExportModal) closeExportModal();

    return;

  }

  

  try {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    

    // Obtener datos filtrados y ordenados exactamente como se ven en pantalla

    const filtered = gastos.filter(gasto => {

      const matchesSearch = !tableFilters.search || 

        Object.values(gasto).some(val => 

          String(val).toLowerCase().includes(tableFilters.search.toLowerCase())

        );

      

      // Búsqueda parcial para nombre

      const matchesNombre = !tableFilters.nombre || 

        String(gasto.nombre || "").toLowerCase().includes(tableFilters.nombre.toLowerCase());

      

      // Búsqueda parcial para descripción

      const matchesDescripcion = !tableFilters.descripcion || 

        String(gasto.descripcion || "").toLowerCase().includes(tableFilters.descripcion.toLowerCase());

      

      const matchesDate = (!tableFilters.year || String(gasto.fecha).includes(tableFilters.year)) &&

                         (!tableFilters.month || String(gasto.fecha).includes(tableFilters.month)) &&

                         (!tableFilters.day || String(gasto.fecha).includes(tableFilters.day));

      

      const matchesType = !tableFilters.tipo || gasto.tipo === tableFilters.tipo;

      const matchesCategory = !tableFilters.categoria || gasto.categoria === tableFilters.categoria;

      

      return matchesSearch && matchesNombre && matchesDescripcion && matchesDate && matchesType && matchesCategory;

    });



    // Aplicar el mismo orden que la vista actual

    const sorted = [...filtered].sort((a, b) => {

      if (tableSort.amount !== "default") {

        const diff = (Number(a.cantidad) || 0) - (Number(b.cantidad) || 0);

        if (diff !== 0) {

          return tableSort.amount === "asc" ? diff : -diff;

        }

      }



      if (tableSort.date !== "default") {

        const aDate = new Date(a.fecha).getTime() || 0;

        const bDate = new Date(b.fecha).getTime() || 0;

        if (tableSort.date === "oldest" && aDate !== bDate) return aDate - bDate;

        if (tableSort.date === "newest" && aDate !== bDate) return bDate - aDate;

        if (tableSort.date === "current") {

          const now = Date.now();

          const aDiff = Math.abs(aDate - now);

          const bDiff = Math.abs(bDate - now);

          if (aDiff !== bDiff) return aDiff - bDiff;

        }

        if (tableSort.date === "asc" && aDate !== bDate) return aDate - bDate;

        if (tableSort.date === "desc" && aDate !== bDate) return bDate - aDate;

      }



      return String(a.fecha).localeCompare(String(b.fecha));

    });

    

    // Configuración inicial

    doc.setFontSize(20);

    doc.text("Registros Contables", 105, 20, { align: "center" });

    

    doc.setFontSize(12);

    doc.text(`Exportado: ${new Date().toLocaleString("es-ES")}`, 105, 30, { align: "center" });

    doc.text(`Total de registros: ${sorted.length} (filtrados de ${gastos.length})`, 105, 37, { align: "center" });

    

    // Preparar datos para la tabla con el orden exacto de la vista

    const visibleColumns = columns.filter(col => !col.hidden);

    const headers = visibleColumns.map(col => col.label);

    

    const tableData = sorted.map(gasto => 

      visibleColumns.map(col => {

        let value = gasto[col.key] || "";

        // Formatear valores para mostrar

        if (col.type === 'number' && value) {

          return `${parseFloat(value).toFixed(2)}€`;

        }

        if (col.type === 'datetime' && value) {

          const date = new Date(value);

          if (!isNaN(date.getTime())) {

            return date.toLocaleDateString("es-ES");

          }

        }

        return String(value);

      })

    );

    

    // Añadir tabla usando autoTable

    doc.autoTable({

      head: [headers],

      body: tableData,

      startY: 45,

      theme: 'grid',

      styles: {

        fontSize: 10,

        cellPadding: 3,

        font: 'helvetica'

      },

      headStyles: {

        fillColor: [111, 123, 95],

        textColor: 255,

        fontStyle: 'bold'

      },

      alternateRowStyles: {

        fillColor: [245, 245, 245]

      },

      columnStyles: {

        0: { cellWidth: 25 }, // Fecha

        1: { cellWidth: 20 }, // Tipo

        2: { cellWidth: 40 }, // Nombre

        3: { cellWidth: 30 }, // Categoría

        4: { cellWidth: 25 }, // Cantidad

        5: { cellWidth: 'auto' } // Descripción

      }

    });

    

    // Guardar PDF

    doc.save(`gastos-${new Date().toISOString().slice(0, 10)}.pdf`);

    

    console.log(`📋 PDF exportado: ${sorted.length} registros con ${headers.length} columnas (ordenado como vista actual)`);

    

  } catch (error) {

    console.error("❌ Error exportando a PDF:", error);

    alert("Error al exportar a PDF: " + error.message);

  }

  

  // Cerrar modal

  if (window.closeExportModal) closeExportModal();

};



window.exportAsWord = function() {

  if (gastos.length === 0) {

    alert("No hay registros para exportar");

    if (window.closeExportModal) closeExportModal();

    return;

  }

  

  let wordContent = `<html><head><meta charset="utf-8"><title>Registros Contables</title></head><body>`;

  wordContent += `<h1>REGISTROS CONTABLES</h1>`;

  wordContent += `<p>Exportado: ${new Date().toLocaleString()}</p>`;

  wordContent += `<p>Total de registros: ${gastos.length}</p>`;

  wordContent += `<table border="1" style="border-collapse: collapse; width: 100%;">`;

  wordContent += `<tr><th>Fecha</th><th>Tipo</th><th>Nombre</th><th>Categoría</th><th>Cantidad</th><th>Descripción</th></tr>`;

  

  gastos.forEach(gasto => {

    wordContent += `<tr>`;

    wordContent += `<td>${gasto.fecha || ""}</td>`;

    wordContent += `<td>${gasto.tipo || ""}</td>`;

    wordContent += `<td>${gasto.nombre || ""}</td>`;

    wordContent += `<td>${gasto.categoria || ""}</td>`;

    wordContent += `<td>${gasto.cantidad || 0}€</td>`;

    wordContent += `<td>${gasto.descripcion || ""}</td>`;

    wordContent += `</tr>`;

  });

  

  wordContent += `</table></body></html>`;

  

  const blob = new Blob([wordContent], { type: "application/vnd.ms-word" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = `gastos-${new Date().toISOString().slice(0, 10)}.doc`;

  a.click();

  URL.revokeObjectURL(url);

  

  // Cerrar modal

  if (window.closeExportModal) closeExportModal();

};



window.exportAsImage = function() {

  alert("Exportación como Imagen - Esta función capturará la tabla como imagen. Asegúrate de que todos los registros sean visibles.");

  

  // Usar html2canvas si está disponible, o sugerir alternativa

  if (typeof html2canvas !== 'undefined') {

    const tabla = document.getElementById('tabla-body');

    if (tabla) {

      html2canvas(tabla).then(canvas => {

        const url = canvas.toDataURL('image/png');

        const a = document.createElement("a");

        a.href = url;

        a.download = `gastos-${new Date().toISOString().slice(0, 10)}.png`;

        a.click();

      });

    }

  } else {

    alert("Para exportar como imagen, necesita hacer una captura de pantalla manualmente o instalar la librería html2canvas.");

  }

  

  // Cerrar modal

  if (window.closeExportModal) closeExportModal();

};



// FUNCIÓN DE MENÚ DE IMPORTACIÓN

window.showImportMenu = function() {

  // Crear modal de opciones de importación

  const modal = document.createElement('div');

  modal.style.cssText = `

    position: fixed;

    top: 50%;

    left: 50%;

    transform: translate(-50%, -50%);

    background: white;

    padding: 30px;

    border-radius: 12px;

    box-shadow: 0 10px 30px rgba(0,0,0,0.3);

    z-index: 10000;

    min-width: 400px;

  `;

  

  modal.innerHTML = `

    <h3 style="margin: 0 0 20px 0; color: #333;">Importar Registros Contables</h3>

    <p style="margin: 0 0 20px 0; color: #666;">Selecciona el formato de importación:</p>

    

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">

      <button onclick="importFromJSON()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📄 JSON (Original)

      </button>

      <button onclick="importFromCSV()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📊 CSV (Excel)

      </button>

      <button onclick="importFromTXT()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📝 TXT (Texto)

      </button>

      <button onclick="attachFileManually()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #e3f2fd; color: #333;">

        📎 Adjuntar Archivo

      </button>

      <button onclick="limpiarAdjuntosProblematicos()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #ffebee; color: #333;">

        🧹 Limpiar Adjuntos

      </button>

      <button onclick="showFormatHelp()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        ❓ Ayuda Formatos

      </button>

    </div>

    

    <div style="display: flex; gap: 10px; justify-content: flex-end;">

      <button onclick="closeImportModal()" style="padding: 10px 20px; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; background: #f8f9fa; color: #333;">

        Cancelar

      </button>

    </div>

  `;

  

  // Añadir backdrop

  const backdrop = document.createElement('div');

  backdrop.style.cssText = `

    position: fixed;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    background: rgba(0,0,0,0.5);

    z-index: 9999;

  `;

  

  // Función para cerrar modal correctamente

  window.closeImportModal = function() {

    const modal = document.querySelector('[style*="z-index: 10000"]');

    const backdrop = document.querySelector('[style*="z-index: 9999"]');

    if (modal) modal.remove();

    if (backdrop) backdrop.remove();

    delete window.closeImportModal;

  };

  

  backdrop.onclick = () => closeImportModal();

  

  document.body.appendChild(backdrop);

  document.body.appendChild(modal);

};



// FUNCIONES DE IMPORTACIÓN POR FORMATO

window.importFromJSON = function() {

  document.getElementById('importFile').click();

  if (window.closeImportModal) closeImportModal();

};



window.importFromCSV = function() {

  // Filtrar para aceptar solo CSV y Excel

  const importFile = document.getElementById('importFile');

  importFile.accept = '.csv,.xlsx,.xls';

  importFile.click();

  if (window.closeImportModal) closeImportModal();

};



window.importFromTXT = function() {

  document.getElementById('importFile').click();

  if (window.closeImportModal) closeImportModal();

};



window.importFromImage = function() {

  document.getElementById('importFile').click();

  if (window.closeImportModal) closeImportModal();

};



window.importFromWord = function() {

  document.getElementById('importFile').click();

  if (window.closeImportModal) closeImportModal();

};



window.importFromPDF = function() {

  document.getElementById('importFile').click();

  if (window.closeImportModal) closeImportModal();

};



// FUNCIONES ESPECIALES PARA ALMANAQUE

window.showAlmanaqueExportMenu = function() {

  // Crear modal de opciones de exportación para Almanaque (idéntico al Registro Contable)

  const modal = document.createElement('div');

  modal.style.cssText = `

    position: fixed;

    top: 50%;

    left: 50%;

    transform: translate(-50%, -50%);

    background: white;

    padding: 30px;

    border-radius: 12px;

    box-shadow: 0 10px 30px rgba(0,0,0,0.3);

    z-index: 10000;

    min-width: 450px;

  `;

  

  modal.innerHTML = `

    <h3 style="margin: 0 0 20px 0; color: #333;">Exportar Registros Contables</h3>

    <p style="margin: 0 0 20px 0; color: #666;">Selecciona el formato de exportación:</p>

    

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">

      <button onclick="exportAsJSON()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📄 JSON (Original)

      </button>

      <button onclick="exportAsExcel()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #e8f5e8; color: #333; font-weight: 600;">

        📊 Excel (.xlsx)

      </button>

      <button onclick="exportAsCSV()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📋 CSV (Excel)

      </button>

      <button onclick="exportAsPDF()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📋 PDF (Documento)

      </button>

      <button onclick="exportAsTXT()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📝 TXT (Texto)

      </button>

      <button onclick="exportAsWord()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📝 Word (Documento)

      </button>

      <button onclick="exportAsImage()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        🖼️ Imagen (PNG/JPG)

      </button>

      <button onclick="exportAsJSON()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        🔄 Backup Completo

      </button>

    </div>

    

    <div style="display: flex; gap: 10px; justify-content: flex-end;">

      <button onclick="closeAlmanaqueExportModal()" style="padding: 10px 20px; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; background: #f8f9fa; color: #333;">

        Cancelar

      </button>

    </div>

  `;

  

  // Añadir backdrop

  const backdrop = document.createElement('div');

  backdrop.style.cssText = `

    position: fixed;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    background: rgba(0,0,0,0.5);

    z-index: 9999;

  `;

  

  // Función para cerrar modal correctamente

  window.closeAlmanaqueExportModal = function() {

    const modal = document.querySelector('[style*="z-index: 10000"]');

    const backdrop = document.querySelector('[style*="z-index: 9999"]');

    if (modal) modal.remove();

    if (backdrop) backdrop.remove();

    // Limpiar la función global

    delete window.closeAlmanaqueExportModal;

  };

  

  backdrop.onclick = () => closeAlmanaqueExportModal();

  

  document.body.appendChild(backdrop);

  document.body.appendChild(modal);

};



// FUNCIONES DE EXPORTACIÓN PARA ALMANAQUE (ahora usan las mismas funciones que el Registro Contable)

window.exportAlmanaqueAsJSON = function() {

  // Usar la función principal exportAsJSON

  exportAsJSON();

};



window.exportAlmanaqueAsCSV = function() {

  // Usar la función principal exportAsCSV

  exportAsCSV();

};



window.exportAlmanaqueAsTXT = function() {

  // Usar la función principal exportAsTXT

  exportAsTXT();

};



window.exportAlmanaqueAsPDF = function() {

  // Usar la función principal exportAsPDF

  exportAsPDF();

};



window.exportAlmanaqueAsWord = function() {

  // Usar la función principal exportAsWord

  exportAsWord();

};



window.exportAlmanaqueAsImage = function() {

  // Usar la función principal exportAsImage

  exportAsImage();

};



function splitDelimitedLine(line = "", delimiter = ",") {

  const values = [];

  let current = "";

  let insideQuotes = false;



  for (let i = 0; i < line.length; i++) {

    const char = line[i];

    if (char === '"') {

      insideQuotes = !insideQuotes;

    } else if (char === delimiter && !insideQuotes) {

      values.push(current.trim());

      current = "";

    } else {

      current += char;

    }

  }

  values.push(current.trim());

  return values;

}



function parseDelimitedRecords(text, fallbackDate = getNowDateTimeLocal()) {

  const lines = String(text || "")

    .split(/\r?\n/)

    .map(line => line.trim())

    .filter(Boolean);



  console.log(`📄 Procesando ${lines.length} líneas del CSV`);



  if (lines.length < 2) {

    console.log("❌ CSV vacío o sin datos suficientes");

    return [];

  }



  const delimiter = lines[0].includes(";") ? ";" : lines[0].includes("\t") ? "\t" : ",";

  console.log(`🔍 Delimitador detectado: "${delimiter}"`);

  

  const headers = splitDelimitedLine(lines[0], delimiter).map(mapImportedKey);

  console.log(`📋 Columnas encontradas: ${headers.join(", ")}`);



  const records = lines.slice(1).map((line, index) => {

    const values = splitDelimitedLine(line, delimiter);

    const record = {};

    headers.forEach((header, colIndex) => {

      record[header] = values[colIndex] ?? "";

    });

    if (!record.fecha) record.fecha = fallbackDate;

    

    // Logging para primeros registros

    if (index < 3) {

      console.log(`📝 Fila ${index + 1}: ${record.nombre || 'Sin nombre'} - ${record.cantidad || 0}€`);

    }

    

    return record;

  });



  console.log(`✅ Parseados ${records.length} registros del CSV`);

  return records;

}



// FUNCIÓN DE MENÚ DE IMPORTACIÓN PARA ALMANAQUE

window.showAlmanaqueImportMenu = function() {

  // Crear modal de opciones de importación para Almanaque

  const modal = document.createElement('div');

  modal.style.cssText = `

    position: fixed;

    top: 50%;

    left: 50%;

    transform: translate(-50%, -50%);

    background: white;

    padding: 30px;

    border-radius: 12px;

    box-shadow: 0 10px 30px rgba(0,0,0,0.3);

    z-index: 10000;

    min-width: 400px;

  `;

  

  modal.innerHTML = `

    <h3 style="margin: 0 0 20px 0; color: #333;">Importar Registros Contables</h3>

    <p style="margin: 0 0 20px 0; color: #666;">Selecciona el formato de importación:</p>

    

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">

      <button onclick="importAlmanaqueFromJSON()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📄 JSON (Original)

      </button>

      <button onclick="importAlmanaqueFromCSV()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📊 CSV (Excel)

      </button>

      <button onclick="importAlmanaqueFromTXT()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📝 TXT (Texto)

      </button>

      <button onclick="importAlmanaqueFromImage()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        🖼️ Imagen (OCR)

      </button>

      <button onclick="importAlmanaqueFromWord()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📝 Word (Documento)

      </button>

      <button onclick="importAlmanaqueFromPDF()" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; background: #f8f9fa; color: #333;">

        📋 PDF (Documento)

      </button>

    </div>

    

    <div style="display: flex; gap: 10px; justify-content: flex-end;">

      <button onclick="closeAlmanaqueImportModal()" style="padding: 10px 20px; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; background: #f8f9fa; color: #333;">

        Cancelar

      </button>

    </div>

  `;

  

  // Añadir backdrop

  const backdrop = document.createElement('div');

  backdrop.style.cssText = `

    position: fixed;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    background: rgba(0,0,0,0.5);

    z-index: 9999;

  `;

  

  // Función para cerrar modal correctamente

  window.closeAlmanaqueImportModal = function() {

    const modal = document.querySelector('[style*="z-index: 10000"]');

    const backdrop = document.querySelector('[style*="z-index: 9999"]');

    if (modal) modal.remove();

    if (backdrop) backdrop.remove();

    delete window.closeAlmanaqueImportModal;

  };

  

  backdrop.onclick = () => closeAlmanaqueImportModal();

  

  document.body.appendChild(backdrop);

  document.body.appendChild(modal);

};



// FUNCIONES DE IMPORTACIÓN PARA ALMANAQUE

window.importAlmanaqueFromJSON = function() {

  document.getElementById('importAlmanaqueFile').click();

  if (window.closeAlmanaqueImportModal) closeAlmanaqueImportModal();

};



window.importAlmanaqueFromCSV = function() {

  // Filtrar para aceptar solo CSV y Excel

  const importAlmanaqueFile = document.getElementById('importAlmanaqueFile');

  importAlmanaqueFile.accept = '.csv,.xlsx,.xls';

  importAlmanaqueFile.click();

  if (window.closeAlmanaqueImportModal) closeAlmanaqueImportModal();

};



window.importAlmanaqueFromTXT = function() {

  document.getElementById('importAlmanaqueFile').click();

  if (window.closeAlmanaqueImportModal) closeAlmanaqueImportModal();

};



window.importAlmanaqueFromImage = function() {

  document.getElementById('importAlmanaqueFile').click();

  if (window.closeAlmanaqueImportModal) closeAlmanaqueImportModal();

};



window.importAlmanaqueFromWord = function() {

  document.getElementById('importAlmanaqueFile').click();

  if (window.closeAlmanaqueImportModal) closeAlmanaqueImportModal();

};



window.importAlmanaqueFromPDF = function() {

  document.getElementById('importAlmanaqueFile').click();

  if (window.closeAlmanaqueImportModal) closeAlmanaqueImportModal();

};



function splitDelimitedLine(line = "", delimiter = ",") {

  const values = [];

  let current = "";

  let insideQuotes = false;



  for (let i = 0; i < line.length; i++) {

    const char = line[i];

    if (char === '"') {

      insideQuotes = !insideQuotes;

      continue;

    }

    if (char === delimiter && !insideQuotes) {

      values.push(current.trim());

      current = "";

      continue;

    }

    current += char;

  }



  values.push(current.trim());

  return values;

}



function parseDelimitedRecords(text, fallbackDate = getNowDateTimeLocal()) {

  const lines = String(text || "")

    .split(/\r?\n/)

    .map(line => line.trim())

    .filter(Boolean);



  console.log(`📄 Procesando ${lines.length} líneas del CSV`);



  if (lines.length < 2) {

    console.log("❌ CSV vacío o sin datos suficientes");

    return [];

  }



  const delimiter = lines[0].includes(";") ? ";" : lines[0].includes("\t") ? "\t" : ",";

  console.log(`🔍 Delimitador detectado: "${delimiter}"`);

  

  const headers = splitDelimitedLine(lines[0], delimiter).map(mapImportedKey);

  console.log(`📋 Columnas encontradas: ${headers.join(", ")}`);



  const records = lines.slice(1).map((line, index) => {

    const values = splitDelimitedLine(line, delimiter);

    const record = {};

    headers.forEach((header, colIndex) => {

      record[header] = values[colIndex] ?? "";

    });

    if (!record.fecha) record.fecha = fallbackDate;

    

    // Logging para primeros registros

    if (index < 3) {

      console.log(`📝 Fila ${index + 1}: ${record.nombre || 'Sin nombre'} - ${record.cantidad || 0}€`);

    }

    

    return record;

  });



  console.log(`✅ Parseados ${records.length} registros del CSV`);

  return records;

}



function fileToDataUrl(file) {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);

    reader.onerror = () => reject(new Error(`No se pudo leer ${file.name}`));

    reader.readAsDataURL(file);

  });

}



// FUNCIÓN PARA LIMPIAR ADJUNTOS PROBLEMÁTICOS

window.limpiarAdjuntosProblematicos = function() {

  console.log("🧹 LIMPIANDO ADJUNTOS PROBLEMÁTICOS");

  

  const antes = gastos.length;

  

  // Filtrar y eliminar registros problemáticos

  const gastosLimpios = gastos.filter(gasto => {

    // Eliminar FACTURA_SOLIDWORKS.pdf

    if (gasto.nombre && gasto.nombre.includes("FACTURA_SOLIDWORKS.pdf")) {

      console.log("🗑️ Eliminando:", gasto.nombre);

      return false;

    }

    

    // Eliminar registros con descripción de adjuntos automáticos

    if (gasto.descripcion && (

      gasto.descripcion.includes("Registro contable de Importado | Adjuntos:") ||

      gasto.descripcion.includes("Registro contable de Importado | Adjuntos:")

    )) {

      console.log("🗑️ Eliminando:", gasto.descripcion);

      return false;

    }

    

    // Eliminar registros que sean solo adjuntos no deseados

    if (gasto.tipo === "Importado" && gasto.nombre && (

      gasto.nombre.includes(".pdf") ||

      gasto.nombre.includes(".doc") ||

      gasto.nombre.includes(".docx") ||

      gasto.nombre.includes(".xls") ||

      gasto.nombre.includes(".xlsx") ||

      gasto.nombre.includes(".jpg") ||

      gasto.nombre.includes(".jpeg") ||

      gasto.nombre.includes(".png")

    )) {

      console.log("🗑️ Eliminando archivo adjunto no deseado:", gasto.nombre);

      return false;

    }

    

    return true;

  });

  

  // Actualizar array

  gastos.length = 0;

  gastos.push(...gastosLimpios);

  window.gastos = gastos;

  

  // Guardar en localStorage sin los adjuntos problemáticos

  localStorage.setItem(STORAGE_KEY, JSON.stringify(gastos));

  

  // Renderizar

  render();

  

  console.log(`✅ Limpieza completada: ${antes - gastos.length} registros eliminados`);

  console.log(`📊 Registros restantes: ${gastos.length}`);

  

  alert(`Se eliminaron ${antes - gastos.length} adjuntos problemáticos. La app ha sido limpiada.`);

};



// FUNCIÓN ESPECIAL PARA ADJUNTAR ARCHIVOS MANUALMENTE

window.attachFileManually = function() {

  const input = document.createElement('input');

  input.type = 'file';

  input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.bmp,.xls,.xlsx';

  input.multiple = true;

  

  input.onchange = async (event) => {

    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    

    try {

      saveRecoverySnapshot("before-attach");

      

      for (const file of files) {

        const data = await fileToDataUrl(file);

        const record = createRecordFromAttachment(

          { name: file.name, type: file.type, data }, 

          "Adjunto", 

          new Date().toISOString().slice(0, 10)

        );

        gastos.push(normalizeRecord(record));

      }

      

      saveData();

      render();

      alert(`${files.length} archivo(s) adjuntado(s) correctamente.`);

    } catch (error) {

      alert("Error al adjuntar archivos: " + error.message);

    }

  };

  

  input.click();

};



// FUNCIÓN DE AYUDA DE FORMATOS

window.showFormatHelp = function() {

  const helpModal = document.createElement('div');

  helpModal.style.cssText = `

    position: fixed;

    top: 50%;

    left: 50%;

    transform: translate(-50%, -50%);

    background: white;

    padding: 30px;

    border-radius: 12px;

    box-shadow: 0 10px 30px rgba(0,0,0,0.3);

    z-index: 10000;

    max-width: 500px;

    max-height: 80vh;

    overflow-y: auto;

  `;

  

  helpModal.innerHTML = `

    <h3 style="margin: 0 0 20px 0; color: #333;">Ayuda - Formatos de Importación</h3>

    

    <div style="margin-bottom: 20px;">

      <h4 style="color: #333; margin-bottom: 10px;">📄 Formatos Directos (Recomendado):</h4>

      <ul style="color: #666; line-height: 1.6;">

        <li><strong>JSON:</strong> Formato original de la app, preserva todos los datos</li>

        <li><strong>CSV:</strong> Compatible con Excel, Google Sheets, hojas de cálculo</li>

        <li><strong>TXT:</strong> Archivo de texto simple con datos estructurados</li>

      </ul>

    </div>

    

    <div style="margin-bottom: 20px;">

      <h4 style="color: #333; margin-bottom: 10px;">📎 Adjuntar Archivos:</h4>

      <p style="color: #666; line-height: 1.6;">

        Usa esta opción para adjuntar PDF, Word, Excel, Imágenes como registros de referencia. 

        Los archivos se guardarán como registros adjuntos pero no procesarán su contenido automáticamente.

      </p>

    </div>

    

    <div style="margin-bottom: 20px;">

      <h4 style="color: #333; margin-bottom: 10px;">⚠️ Formatos No Compatibles:</h4>

      <p style="color: #666; line-height: 1.6;">

        PDF, Word, Excel nativo, Imágenes no se procesan automáticamente. 

        Debes convertirlos a CSV/TXT o usar "Adjuntar Archivo".

      </p>

    </div>

    

    <div style="display: flex; gap: 10px; justify-content: flex-end;">

      <button onclick="this.closest('[style*=fixed]').remove()" style="padding: 10px 20px; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; background: #f8f9fa; color: #333;">

        Cerrar

      </button>

    </div>

  `;

  

  const backdrop = document.createElement('div');

  backdrop.style.cssText = `

    position: fixed;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    background: rgba(0,0,0,0.5);

    z-index: 9999;

  `;

  backdrop.onclick = () => helpModal.remove();

  

  document.body.appendChild(backdrop);

  document.body.appendChild(helpModal);

};



async function parseRecordsFromFile(file, fallbackDate = getNowDateTimeLocal()) {

  const lowerName = String(file.name || "").toLowerCase();



  if (file.type.includes("json") || lowerName.endsWith(".json")) {

    const raw = await file.text();

    const parsed = JSON.parse(raw);

    const importedRecords = Array.isArray(parsed) ? parsed : parsed?.records;

    const importedColumns = Array.isArray(parsed?.customColumns) ? parsed.customColumns : [];

    if (!Array.isArray(importedRecords)) {

      throw new Error(`El archivo ${file.name} no contiene registros JSON válidos.`);

    }

    return { mode: "replace", records: importedRecords, customColumns: importedColumns };

  }



  if (file.type.startsWith("text/") || /\.(csv|txt|tsv)$/i.test(lowerName)) {

    const raw = await file.text();

    const records = parseDelimitedRecords(raw, fallbackDate);

    if (records.length) {

      return { mode: "append", records, customColumns: [] };

    }

  }



  // Para PDF, Word, Excel e Imagen - NO crear registros automáticamente

  // Solo procesar si el usuario explícitamente lo solicita

  if (file.type.includes("pdf") || /\.(pdf)$/i.test(lowerName) ||

      file.type.includes("word") || /\.(doc|docx)$/i.test(lowerName) ||

      file.type.includes("sheet") || /\.(xls|xlsx)$/i.test(lowerName) ||

      file.type.includes("image") || /\.(jpg|jpeg|png|gif|bmp)$/i.test(lowerName)) {

    throw new Error(`El archivo ${file.name} (${file.type}) no es un formato compatible. Por favor, conviértalo a CSV o TXT para importar.`);

  }



  // Solo para archivos adjuntos manuales (no automáticos)

  const data = await fileToDataUrl(file);

  return {

    mode: "append",

    records: [createRecordFromAttachment({ name: file.name, type: file.type, data }, "Importado", fallbackDate.slice(0, 10))],

    customColumns: [],

  };

}



async function importData(files) {

  const fileList = Array.isArray(files) ? files : Array.from(files || []);

  if (!fileList.length) return;



  try {

    saveRecoverySnapshot("before-import");



    let replacePayload = null;

    const appendedRecords = [];

    const importedColumns = [];



    for (const file of fileList) {

      const parsed = await parseRecordsFromFile(file, getNowDateTimeLocal());

      if (parsed.mode === "replace") {

        replacePayload = parsed;

      } else {

        appendedRecords.push(...parsed.records);

      }

      importedColumns.push(...(parsed.customColumns || []));

    }



    if (replacePayload) {

      restoreColumns(replacePayload.customColumns || importedColumns);

      mergeCustomColumnsFromRecords(replacePayload.records);

      

      // Para modo replace, primero limpiar todos los registros existentes

      // usando la lógica de eliminación existente, luego agregar los nuevos

      console.log(`🔄 Reemplazando datos: ${gastos.length} registros existentes serán eliminados`);

      

      // Eliminar registros existentes uno por uno para mantener consistencia

      while (gastos.length > 0) {

        gastos.pop(); // Eliminar del final para no afectar índices

      }

      

      // Agregar nuevos registros usando addRow (única fuente de verdad)

      console.log(`📥 Agregando ${replacePayload.records.length} nuevos registros...`);

      for (const record of replacePayload.records) {

        addRow(record, { skipSnapshot: true });

      }

      

      if (appendedRecords.length) {

        console.log(`📥 Agregando ${appendedRecords.length} registros adicionales...`);

        for (const record of appendedRecords) {

          addRow(record, { skipSnapshot: true });

        }

      }

    } else if (appendedRecords.length) {

      mergeCustomColumnsFromRecords(appendedRecords);

      

      // Usar addRow para cada registro importado (con sincronización Firebase)

      console.log(`📥 Importando ${appendedRecords.length} registros con sincronización Firebase...`);

      for (const record of appendedRecords) {

        addRow(record, { skipSnapshot: true }); // Evitar múltiples snapshots

      }

      console.log("✅ Todos los registros importados y sincronizados con Firebase");

    } else {

      alert("No se pudieron importar registros desde los archivos seleccionados.");

      return;

    }



    syncCustomColumnsWithSettings();

    buildFormFields();

    saveData();

    render();

    renderAlmanaque(); // Sincronizar Almanaque también

    

    // Mostrar resumen de importación

    const totalImported = replacePayload ? 

      replacePayload.records.length + appendedRecords.length : 

      appendedRecords.length;

    console.log(`📊 Importación completada: ${totalImported} registros procesados`);

    console.log(`✅ Sincronización completa entre módulos:`);

    console.log(`   - Registro de Contabilidad: ${document.querySelectorAll('#tabla-body tr').length} filas`);

    console.log(`   - Almanaque: ${document.querySelectorAll('#almanaqueBody tr').length} filas`);

    console.log(`   - Array gastos (fuente única): ${gastos.length} registros`);

    console.log(`   - Firebase: Sincronizado automáticamente vía addRow()`);

    

  } catch (error) {

    console.error("❌ Error en importación:", error);

    alert("Error al importar archivos: " + error.message);

  }

}



function downloadTextFile(filename, content) {

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = filename;

  a.click();

  URL.revokeObjectURL(url);

}



function getDashboardSummaryData() {

  if (!dashboardPeriod || !dashboardDate) return null;



  const period = dashboardPeriod.value;

  const metric = dashboardMetric ? dashboardMetric.value : "balance";

  const ref = dashboardDate.value ? new Date(dashboardDate.value) : new Date();

  const { start, end } = getPeriodRange(period, ref);



  const filtered = gastos.filter(g => {

    const d = new Date(g.fecha);

    return !isNaN(d.getTime()) && d >= start && d <= end;

  });



  const totalIncome = filtered.reduce((sum, g) => sum + (String(g.tipo).toLowerCase() === "ingreso" ? Number(g.cantidad) || 0 : 0), 0);

  const totalExpense = filtered.reduce((sum, g) => sum + (String(g.tipo).toLowerCase() === "gasto" ? Number(g.cantidad) || 0 : 0), 0);



  return {

    period,

    metric,

    ref,

    start,

    end,

    totalIncome,

    totalExpense,

    balance: totalIncome - totalExpense,

    records: filtered,

  };

}



function exportDashboardSummary() {

  const summary = getDashboardSummaryData();

  if (!summary) return;



  const lines = [

    "RESUMEN DEL DASHBOARD",

    `Generado: ${new Date().toLocaleString("es-ES")}`,

    `Periodo: ${summary.period}`,

    `Fecha de referencia: ${summary.ref.toLocaleDateString("es-ES")}`,

    `Rango: ${summary.start.toLocaleDateString("es-ES")} - ${summary.end.toLocaleDateString("es-ES")}`,

    `Metrica: ${getMetricLabel(summary.metric)}`,

    `Registros analizados: ${summary.records.length}`,

    `Ingresos: ${summary.totalIncome.toFixed(2)} EUR`,

    `Gastos: ${summary.totalExpense.toFixed(2)} EUR`,

    `Saldo: ${summary.balance.toFixed(2)} EUR`,

    "",

    "DETALLE DE MOVIMIENTOS",

  ];



  summary.records

    .sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)))

    .forEach(record => {

      lines.push(

        `${record.fecha || "Sin fecha"} | ${record.tipo || "-"} | ${record.nombre || "-"} | ${Number(record.cantidad || 0).toFixed(2)} EUR | ${record.categoria || "General"}`

      );

    });



  downloadTextFile(`dashboard-resumen-${new Date().toISOString().slice(0, 10)}.txt`, lines.join("\n"));

}



function getAlmanaqueSummaryData() {

  if (!almanaqueYear || !almanaqueMonth || !almanaqueViewMode) return null;



  const year = Number(almanaqueYear.value);

  const monthIndex = Number(almanaqueMonth.value);

  const dayValue = almanaqueDay ? almanaqueDay.value : "";

  const viewMode = almanaqueViewMode.value || "month";

  const typeFilter = almanaqueTypeFilter?.value || "";

  const filtered = gastos.filter(g => {

    const date = new Date(g.fecha);

    if (isNaN(date.getTime()) || date.getFullYear() !== year) return false;

    if (typeFilter && String(g.tipo) !== typeFilter) return false;

    if (viewMode === "year") return true;

    if (date.getMonth() !== monthIndex) return false;

    if (viewMode === "month") return true;

    return String(date.getDate()).padStart(2, "0") === dayValue;

  });



  // 🔴 RENUMERACIÓN CORRELATIVA PARA ALMANAQUE (ASCENDENTE)

  filtered.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  filtered.forEach((gasto, index) => {

    gasto.numero = index + 1;

  });



  const totalIncome = filtered.reduce((sum, g) => sum + (String(g.tipo).toLowerCase() === "ingreso" ? Number(g.cantidad) || 0 : 0), 0);

  const totalExpense = filtered.reduce((sum, g) => sum + (String(g.tipo).toLowerCase() === "gasto" ? Number(g.cantidad) || 0 : 0), 0);



  return {

    year,

    monthIndex,

    dayValue,

    viewMode,

    typeFilter,

    monthName: almanaqueMonth.options[almanaqueMonth.selectedIndex]?.textContent || String(monthIndex + 1),

    totalIncome,

    totalExpense,

    balance: totalIncome - totalExpense,

    filtered,

  };

}



function exportAlmanaqueSummary() {

  const summary = getAlmanaqueSummaryData();

  if (!summary) return;



  const header = ["N", "Tipo", "Fecha Hora", "Nombre", "Categoria", "Descripcion", "Cantidad"];

  const rows = summary.filtered

    .sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)))

    .map(record => [

      record.numero || "",

      record.tipo || "",

      formatValue(record.fecha, "datetime"),

      record.nombre || "",

      record.categoria || "",

      String(record.descripcion || "").replace(/\r?\n/g, " "),

      Number(record.cantidad || 0).toFixed(2),

    ]);



  rows.push([]);

  rows.push(["Ingresos", summary.totalIncome.toFixed(2)]);

  rows.push(["Gastos", summary.totalExpense.toFixed(2)]);

  rows.push(["Saldo", summary.balance.toFixed(2)]);



  const csvContent = [header, ...rows]

    .map(row => row.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(";"))

    .join("\n");



  const suffix =

    summary.viewMode === "year"

      ? `${summary.year}`

      : summary.viewMode === "month"

        ? `${summary.year}-${String(summary.monthIndex + 1).padStart(2, "0")}`

        : `${summary.year}-${String(summary.monthIndex + 1).padStart(2, "0")}-${summary.dayValue}`;



  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = `almanaque-resumen-${suffix}.csv`;

  a.click();

  URL.revokeObjectURL(url);

}



function restoreLastSnapshot() {

  if (!recoverySnapshot || !Array.isArray(recoverySnapshot.records)) {

    showFormFeedback("No hay ninguna copia disponible para restablecer.", "warning");

    return;

  }



  editingRowId = null;

  lastDeleted = null;

  currentAlmanaqueSelectedDate = null;

  tableFilters = {

    search: "",

    dateMode: "all",

    day: "",

    month: "",

    year: "",

    tipo: "",

    categoria: "",

  };

  tableSort = {

    amount: "default",

    date: "default",

  };



  if (searchInput) searchInput.value = "";

  if (filterDay) filterDay.value = "";

  if (filterMonth) filterMonth.value = "";

  if (filterYear) filterYear.value = "";

  if (sortAmount) sortAmount.value = "default";

  if (sortDate) sortDate.value = "default";



  restoreColumns(Array.isArray(recoverySnapshot.customColumns) ? recoverySnapshot.customColumns : []);

  mergeCustomColumnsFromRecords(recoverySnapshot.records);

  gastos = recoverySnapshot.records.map(normalizeRecord);

  recoverySnapshot = {

    ...recoverySnapshot,

    records: gastos.map(record => ({

      ...record,

      attachments: Array.isArray(record.attachments) ? [...record.attachments] : [],

    })),

  };

  syncCustomColumnsWithSettings();

  buildFormFields();

  clearForm();

  showFormFeedback("", "success");

  render();

}



function populateAlmanaqueSelectors() {

  if (!almanaqueYear || !almanaqueMonth || !almanaqueDay) return;



  const now = new Date();

  const currentYear = now.getFullYear();



  const years = [];

  for (let y = currentYear; y <= 2030; y++) {

    years.push(y);

  }



  almanaqueYear.innerHTML = "";

  years.forEach(y => {

    const opt = document.createElement("option");

    opt.value = y;

    opt.textContent = y;

    almanaqueYear.appendChild(opt);

  });



  const months = [

    "Enero",

    "Febrero",

    "Marzo",

    "Abril",

    "Mayo",

    "Junio",

    "Julio",

    "Agosto",

    "Septiembre",

    "Octubre",

    "Noviembre",

    "Diciembre",

  ];



  almanaqueMonth.innerHTML = "";

  months.forEach((m, i) => {

    const opt = document.createElement("option");

    opt.value = String(i);

    opt.textContent = m;

    almanaqueMonth.appendChild(opt);

  });



  almanaqueYear.value = currentYear;

  almanaqueMonth.value = String(now.getMonth());

  refreshAlmanaqueDayOptions();

  almanaqueDay.value = String(now.getDate()).padStart(2, "0");

}



function refreshAlmanaqueDayOptions() {

  if (!almanaqueYear || !almanaqueMonth || !almanaqueDay) return;

  const year = Number(almanaqueYear.value || new Date().getFullYear());

  const monthIndex = Number(almanaqueMonth.value || 0);

  const previous = almanaqueDay.value;

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  almanaqueDay.innerHTML = "";

  for (let day = 1; day <= daysInMonth; day++) {

    const opt = document.createElement("option");

    opt.value = String(day).padStart(2, "0");

    opt.textContent = String(day).padStart(2, "0");

    almanaqueDay.appendChild(opt);

  }

  almanaqueDay.value = previous && Number(previous) <= daysInMonth ? previous : "01";

}



function getSelectedAlmanaqueDate() {

  if (currentAlmanaqueSelectedDate) return currentAlmanaqueSelectedDate;

  if (!almanaqueYear || !almanaqueMonth || !almanaqueDay) return "";

  return `${almanaqueYear.value}-${String(Number(almanaqueMonth.value) + 1).padStart(2, "0")}-${almanaqueDay.value}`;

}



function showDayMovements(year, monthIndex, day) {

  currentAlmanaqueSelectedDate = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  if (almanaqueViewMode) almanaqueViewMode.value = "day";

  if (almanaqueYear) almanaqueYear.value = String(year);

  if (almanaqueMonth) almanaqueMonth.value = String(monthIndex);

  refreshAlmanaqueDayOptions();

  if (almanaqueDay) almanaqueDay.value = String(day).padStart(2, "0");

  if (selectedDayInput) selectedDayInput.value = currentAlmanaqueSelectedDate;

  renderAlmanaque();



  if (almanaqueDayDetails) {

    almanaqueDayDetails.style.display = "none";

  }

  if (selectedDayList) {

    selectedDayList.innerHTML = "";

  }

}



function resetDayView() {

  if (!almanaqueDayDetails || !selectedDayList || !selectedDayInput) return;

  almanaqueDayDetails.style.display = "none";

  selectedDayList.innerHTML = "";

  selectedDayInput.value = "";

  currentAlmanaqueSelectedDate = null;

}



function applySelectedDay() {

  if (!almanaquePanel) return;

  const dateValue = selectedDayInput?.value || currentAlmanaqueSelectedDate;

  if (!dateValue) return;



  const date = new Date(dateValue);

  if (isNaN(date.getTime())) {

    alert("Fecha inválida.");

    return;

  }



  const year = date.getFullYear();

  const monthIndex = date.getMonth();

  const day = date.getDate();



  almanaqueYear.value = String(year);

  almanaqueMonth.value = String(monthIndex);

  if (almanaqueViewMode) almanaqueViewMode.value = "day";

  refreshAlmanaqueDayOptions();

  if (almanaqueDay) almanaqueDay.value = String(day).padStart(2, "0");

  renderAlmanaque();

  almanaquePanel.scrollIntoView({ behavior: "smooth", block: "start" });

}



function parseAmountFromText(text) {

  if (!text) return null;

  const cleaned = text.replace(/,/g, ".");

  const match = cleaned.match(/(?:importe|monto|valor|total|cantidad)[-_ ]?(\d+(?:\.\d+)?)/i) || cleaned.match(/(\d+(?:\.\d+)?)/);

  return match ? parseFloat(match[1]) : null;

}



function createRecordFromAttachment(file, attachmentType, selectedDate) {

  const parsedAmount = parseAmountFromText(file.name);

  const amount = parsedAmount !== null ? parsedAmount : 0;

  const tipo = attachmentType === "Tributo" ? "Gasto" : attachmentType === "Precio" ? "Ingreso" : "Gasto";



  return {

    nombre: file.name,

    tipo,

    cantidad: amount,

    categoria: attachmentType || "Adjunto",

    fecha: `${selectedDate}T12:00`,

    descripcion: `Registro contable de ${attachmentType || "Adjunto"}: ${file.name}`,

    attachments: [{ name: file.name, type: file.type, data: file.data || "" }],

  };

}



function getAttachmentsForDate(dateString) {

  const dayDate = new Date(dateString);

  if (isNaN(dayDate.getTime())) return [];



  return gastos

    .filter(g => {

      const rowDate = new Date(g.fecha);

      return (

        rowDate.getFullYear() === dayDate.getFullYear() &&

        rowDate.getMonth() === dayDate.getMonth() &&

        rowDate.getDate() === dayDate.getDate()

      );

    })

    .flatMap(g => (Array.isArray(g.attachments) ? g.attachments.map(a => ({ ...a, source: g.nombre, date: g.fecha })) : []));

}



function exportDayAttachments() {

  const selectedDate = getSelectedAlmanaqueDate();

  if (!selectedDate) {

    alert("Selecciona primero un día con el botón Ver en el almanaque.");

    return;

  }

  currentAlmanaqueSelectedDate = selectedDate;



  const attachments = getAttachmentsForDate(currentAlmanaqueSelectedDate);

  if (!attachments.length) {

    alert("No hay adjuntos para este día.");

    return;

  }



  const exportData = {

    date: currentAlmanaqueSelectedDate,

    attachments,

  };



  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = `adjuntos-${currentAlmanaqueSelectedDate}.json`;

  a.click();

  URL.revokeObjectURL(url);

}



function handleAlmanaqueDrop(event) {

  event.preventDefault();

  const selectedDate = getSelectedAlmanaqueDate();

  if (!selectedDate) {

    alert("Selecciona primero un día con el botón Ver en el almanaque.");

    return;

  }

  currentAlmanaqueSelectedDate = selectedDate;



  const files = Array.from(event.dataTransfer.files || []);

  if (!files.length) return;



  files.forEach(file => {

    const reader = new FileReader();

    reader.onload = () => {

      const attachmentType = almanaqueAttachmentType ? almanaqueAttachmentType.value : "Documento";

      addRow(createRecordFromAttachment({ name: file.name, type: file.type, data: reader.result }, attachmentType, currentAlmanaqueSelectedDate));

      render();

      showDayMovements(...currentAlmanaqueSelectedDate.split("-").map((v, i) => (i === 1 ? Number(v) - 1 : Number(v))));

    };

    reader.readAsDataURL(file);

  });

}



function renderAlmanaque() {

  if (!almanaqueBody) return;

  const summary = getAlmanaqueSummaryData();

  if (!summary) return;

  const almanaqueColumns = almanaqueColumnKeys

    .map(key => columns.find(col => col.key === key))

    .filter(Boolean);



  if (almanaqueMonth) almanaqueMonth.hidden = summary.viewMode === "year";

  if (almanaqueDay) almanaqueDay.hidden = summary.viewMode !== "day";

  currentAlmanaqueSelectedDate =

    summary.viewMode === "day"

      ? `${summary.year}-${String(summary.monthIndex + 1).padStart(2, "0")}-${summary.dayValue}`

      : null;

  if (selectedDayInput && currentAlmanaqueSelectedDate) {

    selectedDayInput.value = currentAlmanaqueSelectedDate;

  }



  // Aplicar el mismo ordenamiento global que el Registro Contable

  const filtered = [...summary.filtered].sort((a, b) => {

    // Primero verificar ordenamiento por cantidad

    if (tableSort.amount !== "default") {

      const diff = (Number(a.cantidad) || 0) - (Number(b.cantidad) || 0);

      if (diff !== 0) {

        return tableSort.amount === "asc" ? diff : -diff;

      }

    }



    // Luego verificar ordenamiento por fecha (con todas las opciones)

    if (tableSort.date !== "default") {

      const aDate = new Date(a.fecha).getTime() || 0;

      const bDate = new Date(b.fecha).getTime() || 0;

      

      if (tableSort.date === "oldest" && aDate !== bDate) return aDate - bDate;

      if (tableSort.date === "newest" && aDate !== bDate) return bDate - aDate;

      if (tableSort.date === "current") {

        const now = Date.now();

        const aDiff = Math.abs(aDate - now);

        const bDiff = Math.abs(bDate - now);

        if (aDiff !== bDiff) return aDiff - bDiff;

      }

      if (tableSort.date === "asc" && aDate !== bDate) return aDate - bDate;  // Menor a Mayor

      if (tableSort.date === "desc" && aDate !== bDate) return bDate - aDate;  // Mayor a Menor

    }



    // Por defecto, ordenar por fecha ascendente

    return String(a.fecha).localeCompare(String(b.fecha));

  });

  

  almanaqueBody.innerHTML = "";

  if (!filtered.length) {

    const tr = document.createElement("tr");

    const td = document.createElement("td");

    td.colSpan = almanaqueColumns.length + 1;

    td.className = "table-empty";

    td.textContent = "No hay movimientos en esta vista del almanaque.";

    tr.appendChild(td);

    almanaqueBody.appendChild(tr);

  } else {

    filtered.forEach(record => {

      const tr = document.createElement("tr");

      almanaqueColumns.forEach(col => {

        const td = document.createElement("td");

        

        // 🔴 COLUMNA "N" NO ES EDITABLE en Almanaque

        if (col.key === "numero") {

          td.contentEditable = false;

          td.classList.add("non-editable");

          td.style.backgroundColor = "#f8f9fa";

          td.style.fontWeight = "bold";

          td.style.textAlign = "center";

          td.style.color = "#2c3e50";

        }

        

        let value = formatValue(record[col.key], col.type, col.key);

        if (col.key === "descripcion" && Array.isArray(record.attachments) && record.attachments.length) {

          value = `${value}${value ? " | " : ""}Adjuntos: ${record.attachments.map(att => att.name).join(", ")}`;

        }

        td.textContent = value;

        tr.appendChild(td);

      });

      tr.appendChild(createRowActionsCell(record));

      almanaqueBody.appendChild(tr);

    });

  }



  if (almanaqueSummary) {

    const typeSuffix =

      summary.typeFilter === "Ingreso"

        ? " de ingresos"

        : summary.typeFilter === "Gasto"

          ? " de gastos"

          : "";

    const label =

      summary.viewMode === "year"

        ? `Mostrando ${summary.filtered.length} movimientos${typeSuffix} del año ${summary.year}.`

        : summary.viewMode === "month"

          ? `Mostrando ${summary.filtered.length} movimientos${typeSuffix} de ${summary.monthName} ${summary.year}.`

          : `Mostrando ${summary.filtered.length} movimientos${typeSuffix} del día ${summary.dayValue}/${String(summary.monthIndex + 1).padStart(2, "0")}/${summary.year}.`;

    almanaqueSummary.textContent = label;

  }

  if (almanaqueIncome) almanaqueIncome.textContent = summary.totalIncome.toFixed(2);

  if (almanaqueExpense) almanaqueExpense.textContent = summary.totalExpense.toFixed(2);

  if (almanaqueTotal) almanaqueTotal.textContent = summary.balance.toFixed(2);

  const almanaqueTotalsBox = document.querySelector("#almanaquePanel .totals");

  if (almanaqueTotalsBox) {

    almanaqueTotalsBox.classList.add("totals-bordered");

    const showOnlyIncome = summary.typeFilter === "Ingreso";

    const showOnlyExpense = summary.typeFilter === "Gasto";

    Array.from(almanaqueTotalsBox.children).forEach(child => {

      const text = child.textContent || "";

      if (text.startsWith("Ingresos")) child.hidden = showOnlyExpense;

      if (text.startsWith("Gastos")) child.hidden = showOnlyIncome;

      if (text.startsWith("Saldo")) child.hidden = showOnlyIncome || showOnlyExpense;

    });

  }

}



function buildFormFields() {

  form.innerHTML = "";

  renderEntryFormLabels();



  columns.forEach(col => {
    // Omitir creación de input para searchTerms
    if (col.key === 'searchTerms') return;

    if (col.type === "select") {

      const select = document.createElement("select");

      select.name = col.key;

      select.id = col.key;

      select.className = "entry-form-field";



      const options = col.key === "tipo" ? types : categories;



      options.forEach(optionValue => {

        const option = document.createElement("option");

        option.value = optionValue;

        option.textContent = optionValue;

        select.appendChild(option);

      });



      form.appendChild(select);

      return;

    }



    const input = document.createElement("input");

    input.name = col.key;

    input.id = col.key;
    
    // Debug: Verificar que no se crea input searchTerms
    if (col.key === 'searchTerms') {
      console.error('ERROR: Se intentó crear input searchTerms - esto no debería ocurrir');
    }

    input.placeholder = col.label;

    input.autocomplete = "off";

    input.className = "entry-form-field";



    if (col.type === "number") {

      input.type = "number";

      input.step = "0.01";

    } else if (col.type === "datetime") {

      input.type = "datetime-local";

      input.value = getNowDateTimeLocal();

      form.appendChild(input);

      return;

    } else {

      input.type = "text";

      if (col.key === "nombre") {

        input.setAttribute("list", "nombreSuggestions");

      }

      if (col.key === "descripcion") {

        input.setAttribute("list", "descripcionSuggestions");

      }

    }



    form.appendChild(input);

  });



  const nombreSuggestions = document.createElement("datalist");

  nombreSuggestions.id = "nombreSuggestions";

  form.appendChild(nombreSuggestions);



  const descripcionSuggestions = document.createElement("datalist");

  descripcionSuggestions.id = "descripcionSuggestions";

  form.appendChild(descripcionSuggestions);



  const actionGroup = document.createElement("div");

  actionGroup.className = "entry-form-actions";



  if (editingRowId != null) {

    const submitBtn = document.createElement("button");

    submitBtn.type = "submit";

    submitBtn.id = "btnAgregar";

    submitBtn.className = "entry-form-action entry-form-action-primary";

    submitBtn.textContent = "Guardar cambios";

    actionGroup.appendChild(submitBtn);

  } else {

    const addModeSelect = document.createElement("select");

    addModeSelect.id = "btnAgregar";

    addModeSelect.className = "entry-form-action entry-form-action-primary entry-form-action-select";

    actionGroup.appendChild(addModeSelect);

  }



  form.appendChild(actionGroup);

  bindEntryFormEnhancements();

}



function renderEntryFormLabels() {

  if (!entryFormLabels) return;



  const gridTemplate = `repeat(${columns.length}, minmax(88px, 1fr)) 136px`;

  entryFormLabels.style.setProperty("--entry-grid-template", gridTemplate);

  form.style.setProperty("--entry-grid-template", gridTemplate);



  entryFormLabels.innerHTML = "";



  columns.forEach(col => {

    const label = document.createElement("span");

    label.textContent = col.label;

    entryFormLabels.appendChild(label);

  });



  const actionsLabel = document.createElement("span");

  actionsLabel.textContent = "Acciones";

  entryFormLabels.appendChild(actionsLabel);

}



function showFormFeedback(message, tone = "success") {

  if (!formFeedback) return;

  const shouldShow = tone === "warning" && Boolean(message);

  formFeedback.hidden = !shouldShow;

  formFeedback.textContent = shouldShow ? message : "";

  formFeedback.dataset.tone = shouldShow ? tone : "";

}



function getFormValues() {

  const values = {};



  columns.forEach(col => {

    const input = form.querySelector(`[name="${col.key}"]`);

    if (!input) return;



    if (col.type === "number") {

      values[col.key] = parseFloat(input.value) || 0;

    } else {

      values[col.key] = input.value;

    }

  });



  return values;

}



function getFilteredMetadataRecords() {

  const tipo = form.querySelector('[name="tipo"]')?.value || "";

  const categoria = form.querySelector('[name="categoria"]')?.value || "";

  return gastos.filter(record => {

    const sameType = !tipo || normalizeText(record.tipo) === normalizeText(tipo);

    const sameCategory = !categoria || normalizeText(record.categoria) === normalizeText(categoria);

    return sameType && sameCategory;

  });

}



function populateSuggestionList(listId, values) {

  const list = document.getElementById(listId);

  if (!list) return;

  list.innerHTML = "";

  [...new Set(values.filter(Boolean))].slice(0, 20).forEach(value => {

    const option = document.createElement("option");

    option.value = value;

    list.appendChild(option);

  });

}



function updateAddActionOptions() {

  const addModeSelect = document.getElementById("btnAgregar");

  if (!addModeSelect || addModeSelect.tagName !== "SELECT") return;

  const tipo = form.querySelector('[name="tipo"]')?.value || "Gasto";

  const isIncome = normalizeText(tipo) === "ingreso";

  const singleLabel = isIncome ? "Agregar un ingreso" : "Agregar un pago";

  const monthlyLabel = isIncome ? "Un registro mensual" : "Un registro mensual";

  const yearlyLabel = isIncome ? "Ingreso Anual" : "Gasto Anual";

  const monthlyUntilLabel = isIncome ? "Ingreso cada mes hasta fecha" : "Gasto cada mes hasta fecha";

  const options = [

    { value: "", label: "Agregar" },

    { value: "single", label: singleLabel },

    { value: "monthly-single", label: monthlyLabel },

    { value: "yearly", label: yearlyLabel },

    { value: "monthly-until", label: monthlyUntilLabel },

    { value: "separator", label: "---", disabled: true },

    { value: "delete-debts", label: "🗑️ Eliminar deudas a plazo" },

    { value: "undo", label: "Deshacer" },

  ];

  addModeSelect.innerHTML = "";

  options.forEach(optionData => {

    const option = document.createElement("option");

    option.value = optionData.value;

    option.textContent = optionData.label;

    addModeSelect.appendChild(option);

  });

  addModeSelect.value = "";

}



function refreshFormMetadata() {

  const records = getFilteredMetadataRecords();

  populateSuggestionList("nombreSuggestions", records.map(record => record.nombre));

  populateSuggestionList("descripcionSuggestions", records.map(record => record.descripcion));

}



function applyKnownMetadataFromName() {

  const nombreInput = form.querySelector('[name="nombre"]');

  const categoriaInput = form.querySelector('[name="categoria"]');

  const descripcionInput = form.querySelector('[name="descripcion"]');

  const typedName = nombreInput?.value?.trim();

  if (!typedName || !categoriaInput || !descripcionInput) return;



  const match = [...getFilteredMetadataRecords()]

    .reverse()

    .find(record => normalizeText(record.nombre) === normalizeText(typedName));



  if (!match) return;



  if (!categoriaInput.value || categoriaInput.value === categories[0]) {

    categoriaInput.value = match.categoria || categoriaInput.value;

  }

  if (!descripcionInput.value) {

    descripcionInput.value = match.descripcion || "";

  }

}



function bindEntryFormEnhancements() {

  const tipoInput = form.querySelector('[name="tipo"]');

  const categoriaInput = form.querySelector('[name="categoria"]');

  const nombreInput = form.querySelector('[name="nombre"]');

  const addModeSelect = document.getElementById("btnAgregar");



  updateAddActionOptions();

  refreshFormMetadata();



  if (tipoInput) {

    tipoInput.addEventListener("change", () => {

      updateAddActionOptions();

      refreshFormMetadata();

    });

  }



  if (categoriaInput) {

    categoriaInput.addEventListener("change", refreshFormMetadata);

  }



  if (nombreInput) {

    nombreInput.addEventListener("blur", applyKnownMetadataFromName);

  }



  if (addModeSelect && addModeSelect.tagName === "SELECT") {

    addModeSelect.addEventListener("change", () => {

      const nextMode = addModeSelect.value || "";

      if (!nextMode) return;

      if (nextMode === "undo") {

        restoreLastSnapshot();

        pendingAddMode = "single";

        updateAddActionOptions();

        return;

      }

      pendingAddMode = nextMode;

      form.requestSubmit();

    });

  }

}



function clearForm() {

  columns.forEach(col => {

    const input = form.querySelector(`[name="${col.key}"]`);

    if (!input) return;



    if (col.type === "datetime") {

      input.value = getNowDateTimeLocal();

    } else if (col.type === "select") {

      if (col.key === "categoria") {

        input.value = categories[0];

      } else if (col.key === "tipo") {

        input.value = types[0];

      }

    } else {

      input.value = "";

    }

  });



  form.querySelector("input")?.focus();

  pendingAddMode = "single";

  updateAddActionOptions();

  refreshFormMetadata();

}



function cancelEditing() {

  editingRowId = null;

  clearForm();

  buildFormFields();

  clearForm();

  showFormFeedback("", "success");

}



function fillForm(values = {}) {

  columns.forEach(col => {

    const input = form.querySelector(`[name="${col.key}"]`);

    if (!input) return;



    if (col.type === "datetime") {

      input.value = values[col.key] || getNowDateTimeLocal();

      return;

    }



    input.value = values[col.key] ?? "";

  });

  refreshFormMetadata();

}



function startEditingRecord(record) {

  if (!record) return;

  editingRowId = record.id;

  buildFormFields();

  fillForm(record);

  form.scrollIntoView({ behavior: "smooth", block: "center" });

  document.getElementById("nombre")?.focus();

}



function formatValue(value, type, key) {

  if (value == null || value === "" || Number.isNaN(value)) return "";



  // 🔴 CAMPO "N" - CONTROL NUMÉRICO (PRIMERO)

  if (key === "numero") {

    return String(Math.floor(Number(value)) || "");

  }



  if (type === "number") {

    return Number(value).toFixed(2);

  }



  if (type === "datetime") {

    // 🔴 SOLO INTERCEPTAR CAMPO FECHA - PARCHE QUIRÚRGICO

    if (key === "fecha") {

      return formatFechaSegura(value);

    }

    

    // 🔴 RESTO DE CAMPOS TIPO DATETIME - SIN MODIFICACIONES

    const parsed = new Date(String(value));

    if (!isNaN(parsed.getTime())) {

      return parsed.toLocaleString("es-ES", {

        year: "numeric",

        month: "2-digit",

        day: "2-digit",

        hour: "2-digit",

        minute: "2-digit",

      });

    }

    const { date, time } = splitDateTimeLocal(String(value));

    return date && time ? `${date} ${time}` : String(value);

  }



  return String(value);

}



function parseValue(raw, type, rowIndex = 0) {

  if (typeof raw !== "string") return raw;

  raw = raw.trim();



  if (raw === "") {

    return type === "number" ? 0 : "";

  }



  // Formula (e.g. =A1+B1 or =10*5)

  if (raw.startsWith("=")) {

    const expression = raw

      .slice(1)

      // Reemplaza referencias A1, B2, etc.

      .replace(/([A-Z]+)(\d+)/g, (match, colLetters, rowNum) => {

        const colIndex = toColumnIndex(colLetters);

        const r = Number(rowNum) - 1;

        const row = gastos[r];

        if (!row || colIndex < 0 || colIndex >= columns.length) return "0";

        const key = columns[colIndex]?.key;

        const value = Number(row[key]) || 0;

        return String(value);

      })

      // Permite 50% como 0.5

      .replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");



    // Validar que no haya caracteres inseguros

    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {

      return raw;

    }



    try {

      // eslint-disable-next-line no-new-func

      return Function(`"use strict"; return (${expression})`)();

    } catch {

      return raw;

    }

  }



  if (type === "number") {

    const percentMatch = raw.match(/^(\d+(?:\.\d+)?)%$/);

    if (percentMatch) return Number(percentMatch[1]) / 100;



    const parsed = parseFloat(raw.replace(",", "."));

    return isNaN(parsed) ? 0 : parsed;

  }



  if (type === "datetime") {

    const normalized = raw.replace(/\s+/g, "T");

    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(normalized)) {

      return normalized;

    }



    const parsed = new Date(raw);

    if (isNaN(parsed.getTime())) return "";



    return formatLocalDate(parsed);

  }



  return raw;

}



function toColumnIndex(colLetters) {

  let index = 0;

  for (let i = 0; i < colLetters.length; i++) {

    const charCode = colLetters.charCodeAt(i) - 65; // A=0

    index = index * 26 + (charCode + 1);

  }

  return index - 1;

}



function normalizeText(value) {

  return String(value || "")

    .normalize("NFD")

    .replace(/[\u0300-\u036f]/g, "")

    .toLowerCase();

}



function getFilteredEntries() {

  const filtered = gastos.filter(record => {

    const matchesSearch =

      !tableFilters.search ||

      columns.some(col => normalizeText(record[col.key]).includes(tableFilters.search));

    

    // Búsqueda parcial para nombre

    const matchesNombre =

      !tableFilters.nombre ||

      normalizeText(record.nombre || "").includes(normalizeText(tableFilters.nombre));

    

    // Búsqueda parcial para descripción

    const matchesDescripcion =

      !tableFilters.descripcion ||

      normalizeText(record.descripcion || "").includes(normalizeText(tableFilters.descripcion));

    

    const matchesType =

      !tableFilters.tipo || normalizeText(record.tipo) === normalizeText(tableFilters.tipo);

    const matchesCategory =

      !tableFilters.categoria || normalizeText(record.categoria) === normalizeText(tableFilters.categoria);

    const dateValue = String(record.fecha || "");

    const monthValue = dateValue.slice(5, 7);

    const yearValue = dateValue.slice(0, 4);

    const dayValue = dateValue.slice(8, 10);



    const matchesDate =

      tableFilters.dateMode === "all" ||

      (

        tableFilters.dateMode === "day" &&

        tableFilters.day &&

        tableFilters.month &&

        tableFilters.year &&

        dayValue === tableFilters.day &&

        monthValue === tableFilters.month &&

        yearValue === tableFilters.year

      ) ||

      (

        tableFilters.dateMode === "month" &&

        tableFilters.month &&

        tableFilters.year &&

        monthValue === tableFilters.month &&

        yearValue === tableFilters.year

      ) ||

      (tableFilters.dateMode === "year" && tableFilters.year && yearValue === tableFilters.year);



    return matchesSearch && matchesNombre && matchesDescripcion && matchesDate && matchesType && matchesCategory;

  });



  filtered.sort((a, b) => {

    if (tableSort.amount !== "default") {

      const diff = (Number(a.cantidad) || 0) - (Number(b.cantidad) || 0);

      if (diff !== 0) {

        return tableSort.amount === "asc" ? diff : -diff;

      }

    }



    if (tableSort.date !== "default") {

      const aDate = new Date(a.fecha).getTime() || 0;

      const bDate = new Date(b.fecha).getTime() || 0;

      

      if (tableSort.date === "oldest" && aDate !== bDate) return aDate - bDate;      // Antiguas

      if (tableSort.date === "newest" && aDate !== bDate) return bDate - aDate;      // Nuevas

      if (tableSort.date === "current") {

        const now = Date.now();

        const aDiff = Math.abs(aDate - now);

        const bDiff = Math.abs(bDate - now);

        if (aDiff !== bDiff) return aDiff - bDiff;

      }

      if (tableSort.date === "asc" && aDate !== bDate) return aDate - bDate;        // Menor a Mayor 🆕

      if (tableSort.date === "desc" && aDate !== bDate) return bDate - aDate;       // Mayor a Menor 🆕

    }



    return 0;

  });



  return filtered;

}



function refreshDateFilterOptions() {

  if (filterMonth) {

    const previous = filterMonth.value;

    const months = [

      "Enero",

      "Febrero",

      "Marzo",

      "Abril",

      "Mayo",

      "Junio",

      "Julio",

      "Agosto",

      "Septiembre",

      "Octubre",

      "Noviembre",

      "Diciembre",

    ];



    filterMonth.innerHTML = '<option value="">Mes</option>';

    months.forEach((monthLabel, index) => {

      const option = document.createElement("option");

      option.value = String(index + 1).padStart(2, "0");

      option.textContent = monthLabel;

      filterMonth.appendChild(option);

    });

    filterMonth.value = previous;

  }



  if (filterDay) {

    const previous = filterDay.value;

    const selectedMonth = Number(tableFilters.month || filterMonth?.value || "1");

    const selectedYear = Number(tableFilters.year || filterYear?.value || "2026");

    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

    filterDay.innerHTML = '<option value="">Día</option>';

    for (let day = 1; day <= daysInMonth; day++) {

      const option = document.createElement("option");

      option.value = String(day).padStart(2, "0");

      option.textContent = String(day).padStart(2, "0");

      filterDay.appendChild(option);

    }

    filterDay.value = previous && Number(previous) <= daysInMonth ? previous : "";

  }



  if (filterYear) {

    const previous = filterYear.value;

    filterYear.innerHTML = '<option value="">Año</option>';

    for (let year = 2020; year <= 2030; year++) {

      const option = document.createElement("option");

      option.value = String(year);

      option.textContent = String(year);

      filterYear.appendChild(option);

    }

    filterYear.value = previous;

  }



  updateDateFilterVisibility();

}



function updateDateFilterVisibility() {

  if (filterDateModeButtons.length) {

    filterDateModeButtons.forEach(button => {

      button.classList.toggle("is-active", button.dataset.mode === tableFilters.dateMode);

    });

  }

  if (filterDay) {

    filterDay.hidden = tableFilters.dateMode !== "day";

  }

  if (filterMonth) {

    filterMonth.hidden = !["day", "month"].includes(tableFilters.dateMode);

  }

  if (filterYear) {

    filterYear.hidden = !["day", "month", "year"].includes(tableFilters.dateMode);

  }

}



function getPeriodRange(period, refDate) {

  const start = new Date(refDate);

  start.setHours(0, 0, 0, 0);

  const end = new Date(start);



  if (period === "day") {

    end.setHours(23, 59, 59, 999);

  } else if (period === "month") {

    start.setDate(1);

    end.setMonth(start.getMonth() + 1, 0);

    end.setHours(23, 59, 59, 999);

  } else if (period === "year") {

    start.setMonth(0, 1);

    end.setMonth(11, 31);

    end.setHours(23, 59, 59, 999);

  }



  return { start, end };

}



function getLocalDateKey(date) {

  if (!(date instanceof Date) || isNaN(date.getTime())) return "";

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;

}



function getMetricPalette(metric, total = 1) {

  const paletteByMetric = {

    balance: ["rgba(21, 101, 192, 0.78)", "rgba(2, 136, 209, 0.78)", "rgba(0, 121, 107, 0.78)", "rgba(124, 77, 255, 0.78)"],

    ingresos: ["rgba(46, 125, 50, 0.78)", "rgba(67, 160, 71, 0.78)", "rgba(102, 187, 106, 0.78)", "rgba(0, 137, 123, 0.78)"],

    gastos: ["rgba(211, 47, 47, 0.78)", "rgba(229, 57, 53, 0.78)", "rgba(244, 81, 30, 0.78)", "rgba(255, 112, 67, 0.78)"],

    count: ["rgba(94, 53, 177, 0.78)", "rgba(123, 31, 162, 0.78)", "rgba(156, 39, 176, 0.78)", "rgba(171, 71, 188, 0.78)"],

    average: ["rgba(245, 124, 0, 0.78)", "rgba(251, 140, 0, 0.78)", "rgba(255, 167, 38, 0.78)", "rgba(255, 183, 77, 0.78)"],

    flow: ["rgba(0, 151, 167, 0.78)", "rgba(0, 172, 193, 0.78)", "rgba(38, 198, 218, 0.78)", "rgba(77, 208, 225, 0.78)"],

    networth: ["rgba(46, 125, 50, 0.78)", "rgba(211, 47, 47, 0.78)", "rgba(21, 101, 192, 0.78)"],

    highest: ["rgba(2, 119, 189, 0.78)", "rgba(3, 155, 229, 0.78)", "rgba(79, 195, 247, 0.78)", "rgba(129, 212, 250, 0.78)"],

    lowest: ["rgba(141, 110, 99, 0.78)", "rgba(161, 136, 127, 0.78)", "rgba(188, 170, 164, 0.78)", "rgba(215, 204, 200, 0.9)"],

    savings_rate: ["rgba(56, 142, 60, 0.8)", "rgba(229, 57, 53, 0.8)"],

    efficiency: ["rgba(46, 125, 50, 0.8)", "rgba(251, 192, 45, 0.8)", "rgba(211, 47, 47, 0.8)"],

    projection: ["rgba(33, 150, 243, 0.8)", "rgba(156, 39, 176, 0.8)"],

    cost_optimization: ["rgba(255, 152, 0, 0.8)", "rgba(255, 87, 34, 0.8)", "rgba(244, 67, 54, 0.8)"],

    financial_dashboard: ["rgba(63, 81, 181, 0.8)", "rgba(103, 58, 183, 0.8)", "rgba(156, 39, 176, 0.8)"],

  };



  const fallback = ["rgba(30, 126, 226, 0.75)", "rgba(0, 151, 167, 0.75)", "rgba(245, 124, 0, 0.75)", "rgba(106, 27, 154, 0.75)"];

  const source = paletteByMetric[metric] || fallback;

  return Array.from({ length: total }, (_, index) => source[index % source.length]);

}



function withAlpha(color, alpha = 1) {

  return String(color).replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/, `rgba($1,$2,$3,${alpha})`);

}



function computeFlowData(filtered, period, start, end) {

  const entries = {};



  filtered.forEach(g => {

    const d = new Date(g.fecha);

    const amount = Number(g.cantidad) || 0;

    const sign = String(g.tipo).toLowerCase() === "gasto" ? -1 : 1;

    const key = getLocalDateKey(d);

    entries[key] = (entries[key] || 0) + amount * sign;

  });



  const labels = [];

  const values = [];

  let cumulative = 0;



  if (period === "year") {

    const year = start.getFullYear();

    const monthFormat = m => `${year}-${String(m + 1).padStart(2, "0")}`;

    for (let m = 0; m < 12; m++) {

      const monthKey = monthFormat(m);

      const monthSum = Object.keys(entries)

        .filter(k => k.startsWith(monthKey))

        .reduce((sum, k) => sum + entries[k], 0);

      cumulative += monthSum;

      labels.push(monthKey);

      values.push(cumulative);

    }

  } else {

    const day = new Date(start);

    while (day <= end) {

      const key = getLocalDateKey(day);

      cumulative += entries[key] || 0;

      labels.push(key);

      values.push(cumulative);

      day.setDate(day.getDate() + 1);

    }

  }



  return { labels, values };

}



function computeIncomeExpenseSeries(filtered, period, start, end) {

  const incomes = {};

  const expenses = {};



  filtered.forEach(g => {

    const d = new Date(g.fecha);

    const amount = Number(g.cantidad) || 0;

    const key = getLocalDateKey(d);

    if (String(g.tipo).toLowerCase() === "ingreso") {

      incomes[key] = (incomes[key] || 0) + amount;

    } else {

      expenses[key] = (expenses[key] || 0) + amount;

    }

  });



  const labels = [];

  const incomeValues = [];

  const expenseValues = [];



  if (period === "year") {

    const year = start.getFullYear();

    const monthFormat = m => `${year}-${String(m + 1).padStart(2, "0")}`;

    for (let m = 0; m < 12; m++) {

      const monthKey = monthFormat(m);

      const monthIncome = Object.keys(incomes)

        .filter(k => k.startsWith(monthKey))

        .reduce((sum, k) => sum + incomes[k], 0);

      const monthExpense = Object.keys(expenses)

        .filter(k => k.startsWith(monthKey))

        .reduce((sum, k) => sum + expenses[k], 0);

      labels.push(monthKey);

      incomeValues.push(monthIncome);

      expenseValues.push(monthExpense);

    }

  } else {

    const day = new Date(start);

    while (day <= end) {

      const key = getLocalDateKey(day);

      labels.push(key);

      incomeValues.push(incomes[key] || 0);

      expenseValues.push(expenses[key] || 0);

      day.setDate(day.getDate() + 1);

    }

  }



  return { labels, incomes: incomeValues, expenses: expenseValues };

}



function getMetricLabel(metric) {

  const metricLabels = {

    balance: "Saldo por categoría",

    ingresos: "Ingresos por categoría",

    gastos: "Gastos por categoría",

    count: "Transacciones por categoría",

    average: "Promedio por categoría",

    flow: "Flujo acumulado",

    ingresos_gastos: "Ingresos vs Gastos",

    comparative: "Comparativa temporal",

    highest: "Mayor movimiento",

    lowest: "Menor movimiento",

    networth: "Balance neto del periodo",

    savings_rate: "Tasa de ahorro",

    efficiency: "Eficiencia financiera",

    projection: "Proyección mensual",

    cost_optimization: "Optimización de Costes",

    financial_dashboard: "Dashboard Financiero",

  };

  return metricLabels[metric] || metricLabels.balance;

}



function formatPeriodLabel(date, period) {

  if (period === "day") {

    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });

  }



  if (period === "month") {

    return date.toLocaleDateString("es-ES", { month: "short", year: "numeric" });

  }



  return String(date.getFullYear());

}



function shiftDateByPeriod(date, period, delta) {

  const shifted = new Date(date);

  const originalDay = shifted.getDate();

  shifted.setHours(12, 0, 0, 0);



  if (period === "day") {

    shifted.setDate(shifted.getDate() + delta);

  } else if (period === "month") {

    shifted.setDate(1);

    shifted.setMonth(shifted.getMonth() + delta);

    const daysInMonth = new Date(shifted.getFullYear(), shifted.getMonth() + 1, 0).getDate();

    shifted.setDate(Math.min(originalDay, daysInMonth));

  } else {

    shifted.setDate(1);

    shifted.setFullYear(shifted.getFullYear() + delta);

    const daysInMonth = new Date(shifted.getFullYear(), shifted.getMonth() + 1, 0).getDate();

    shifted.setDate(Math.min(originalDay, daysInMonth));

  }



  return shifted;

}



function getPeriodSummary(period, refDate) {

  const { start, end } = getPeriodRange(period, refDate);

  let income = 0;

  let expense = 0;



  gastos.forEach(record => {

    const date = new Date(record.fecha);

    if (isNaN(date.getTime()) || date < start || date > end) return;



    const amount = Number(record.cantidad) || 0;

    if (String(record.tipo).toLowerCase() === "ingreso") {

      income += amount;

    } else {

      expense += amount;

    }

  });



  return {

    income,

    expense,

    balance: income - expense,

  };

}



function computeComparativeSeries(period, refDate) {

  const totalPeriods = period === "year" ? 5 : period === "month" ? 6 : 7;

  const labels = [];

  const incomes = [];

  const expenses = [];

  const balances = [];



  for (let index = totalPeriods - 1; index >= 0; index--) {

    const targetDate = shiftDateByPeriod(refDate, period, -index);

    const summary = getPeriodSummary(period, targetDate);



    labels.push(formatPeriodLabel(targetDate, period));

    incomes.push(summary.income);

    expenses.push(summary.expense);

    balances.push(summary.balance);

  }



  return { labels, incomes, expenses, balances };

}



function shiftDashboardDate(delta) {

  if (!dashboardDate || !dashboardPeriod) return;



  const period = dashboardPeriod.value;

  const current = dashboardDate.value ? new Date(dashboardDate.value) : new Date();



  if (period === "day") {

    current.setDate(current.getDate() + delta);

  } else if (period === "month") {

    current.setMonth(current.getMonth() + delta);

  } else if (period === "year") {

    current.setFullYear(current.getFullYear() + delta);

  }



  dashboardDate.value = current.toISOString().slice(0, 10);

  updateDashboard();

}



function updateDashboard() {

  if (!dashboardPeriod || !dashboardDate) return;



  const period = dashboardPeriod.value;

  const metric = dashboardMetric ? dashboardMetric.value : "balance";

  const ref = dashboardDate.value ? new Date(dashboardDate.value) : new Date();

  const { start, end } = getPeriodRange(period, ref);



  const filtered = gastos.filter(g => {

    const d = new Date(g.fecha);

    return !isNaN(d.getTime()) && d >= start && d <= end;

  });



  const totalIncome = filtered.reduce((sum, g) => {

    return sum + (String(g.tipo).toLowerCase() === "ingreso" ? Number(g.cantidad) || 0 : 0);

  }, 0);



  const totalExpense = filtered.reduce((sum, g) => {

    return sum + (String(g.tipo).toLowerCase() === "gasto" ? Number(g.cantidad) || 0 : 0);

  }, 0);



  const balance = totalIncome - totalExpense;



  // Actualizar tarjetas principales

  dashboardIncome.textContent = totalIncome.toFixed(2) + " €";

  dashboardExpense.textContent = totalExpense.toFixed(2) + " €";

  dashboardBalance.textContent = balance.toFixed(2) + " €";

  

  // Calcular y actualizar proyección mensual

  const projectionMultiplier = period === "day" ? 30 : period === "month" ? 1 : 12;

  const projectedBalance = balance * projectionMultiplier;

  dashboardProjection.textContent = projectedBalance.toFixed(2) + " €";

  

  // Calcular tendencias (comparación con período anterior)

  const previousPeriodData = getPreviousPeriodData(period, dashboardDate);

  updateTrends(totalIncome, totalExpense, balance, previousPeriodData);



  const byCategory = {};

  const categoryStats = {};



  filtered.forEach(g => {

    const cat = g.categoria || "General";

    const amount = Number(g.cantidad) || 0;

    const type = String(g.tipo).toLowerCase();



    if (metric === "balance") {

      const sign = type === "gasto" ? -1 : 1;

      byCategory[cat] = (byCategory[cat] || 0) + amount * sign;

    } else if (metric === "ingresos" && type === "ingreso") {

      byCategory[cat] = (byCategory[cat] || 0) + amount;

    } else if (metric === "gastos" && type === "gasto") {

      byCategory[cat] = (byCategory[cat] || 0) + amount;

    } else if (metric === "count") {

      byCategory[cat] = (byCategory[cat] || 0) + 1;

    } else if (metric === "average") {

      if (!categoryStats[cat]) categoryStats[cat] = { sum: 0, count: 0 };

      categoryStats[cat].sum += amount;

      categoryStats[cat].count += 1;

    }

  });



  let labels = [];

  let values = [];

  let chartType = "bar";

  const sortedByAmount = [...filtered].sort((a, b) => (Number(b.cantidad) || 0) - (Number(a.cantidad) || 0));



  if (metric === "flow") {

    const flow = computeFlowData(filtered, period, start, end);

    labels = flow.labels;

    values = [

      {

        label: "Flujo acumulado",

        data: flow.values,

        backgroundColor: withAlpha(getMetricPalette(metric, 1)[0], 0.22),

        borderColor: withAlpha(getMetricPalette(metric, 1)[0], 1),

        fill: true,

        tension: 0.35,

      },

    ];

    chartType = "line";

  } else if (metric === "comparative") {

    const series = computeComparativeSeries(period, ref);

    labels = series.labels;

    chartType = "bar";

    const datasets = [

      {

        label: "Ingresos",

        data: series.incomes,

        backgroundColor: "rgba(46, 125, 50, 0.72)",

        borderColor: "rgba(46, 125, 50, 1)",

        borderWidth: 1,

      },

      {

        label: "Gastos",

        data: series.expenses,

        backgroundColor: "rgba(211, 47, 47, 0.72)",

        borderColor: "rgba(220, 53, 69, 1)",

        borderWidth: 1,

      },

      {

        label: "Saldo",

        data: series.balances,

        backgroundColor: "rgba(21, 101, 192, 0.72)",

        borderColor: "rgba(21, 101, 192, 1)",

        borderWidth: 1,

      },

    ];



    values = datasets;

  } else if (metric === "ingresos_gastos") {

    const series = computeIncomeExpenseSeries(filtered, period, start, end);

    labels = series.labels;

    chartType = "line";

    values = [

      {

        label: "Ingresos",

        data: series.incomes,

        backgroundColor: "rgba(46, 125, 50, 0.18)",

        borderColor: "rgba(46, 125, 50, 1)",

        fill: true,

        tension: 0.35,

      },

      {

        label: "Gastos",

        data: series.expenses,

        backgroundColor: "rgba(211, 47, 47, 0.18)",

        borderColor: "rgba(211, 47, 47, 1)",

        fill: true,

        tension: 0.35,

      },

    ];

  } else if (metric === "highest" || metric === "lowest") {

    const selected = metric === "highest" ? sortedByAmount.slice(0, 10) : sortedByAmount.slice(-10).reverse();

    labels = selected.map(item => item.nombre || "Sin nombre");

    values = selected.map(item => Number(item.cantidad) || 0);

  } else if (metric === "networth") {

    labels = ["Ingresos", "Gastos", "Saldo"];

    values = [totalIncome, totalExpense, balance];

  } else if (metric === "savings_rate") {

    const rawSavingsRate = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;

    const savingsRate = Math.max(Math.min(rawSavingsRate, 100), -100);

    labels = ["Ahorro %", "Gasto %"];

    values = [savingsRate, Math.max(0, Math.min(100, (totalExpense / Math.max(totalIncome, 1)) * 100))];

  } else if (metric === "efficiency") {

    // Eficiencia financiera: (Ingresos - Gastos) / Ingresos * 100

    const efficiency = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

    const efficiencyLevel = efficiency >= 80 ? 'Excelente' : efficiency >= 50 ? 'Buena' : efficiency >= 20 ? 'Regular' : 'Mejorar';

    labels = ["Eficiencia %", "Meta 80%"];

    values = [Math.max(0, Math.min(100, efficiency)), 80];

  } else if (metric === "projection") {

    // Proyección mensual basada en el período actual

    const projectionMultiplier = period === "day" ? 30 : period === "month" ? 1 : 12;

    const projectedIncome = totalIncome * projectionMultiplier;

    const projectedExpense = totalExpense * projectionMultiplier;

    const projectedBalance = balance * projectionMultiplier;

    labels = ["Ingresos Proyectados", "Gastos Proyectados", "Balance Proyectado"];

    values = [projectedIncome, projectedExpense, projectedBalance];

  } else if (metric === "cost_optimization") {

    // Optimización de Costes - análisis de gastos por categoría

    const gastosPorCategoria = {};

    filtered.filter(g => g.tipo === 'gasto').forEach(g => {

      if (!gastosPorCategoria[g.categoria]) gastosPorCategoria[g.categoria] = 0;

      gastosPorCategoria[g.categoria] += Number(g.cantidad) || 0;

    });

    

    const sortedCategories = Object.entries(gastosPorCategoria)

      .sort((a, b) => b[1] - a[1])

      .slice(0, 8);

    

    labels = sortedCategories.map(([cat]) => cat);

    values = sortedCategories.map(([, amount]) => amount);

  } else if (metric === "financial_dashboard") {

    // Dashboard Financiero - resumen completo

    labels = ["Ingresos", "Gastos", "Ahorro", "Inversiones"];

    const ahorro = Math.max(0, balance);

    const inversiones = filtered.filter(g => g.categoria === 'Inversiones' || g.categoria === 'Inversion')

      .reduce((sum, g) => sum + (Number(g.cantidad) || 0), 0);

    values = [totalIncome, totalExpense, ahorro, inversiones];

  } else {

    const sourceEntries = Object.entries(metric === "average" ? categoryStats : byCategory)

      .map(([key, value]) => [

        key,

        metric === "average" ? (value.count ? value.sum / value.count : 0) : value,

      ])

      .sort((a, b) => Math.abs(Number(b[1]) || 0) - Math.abs(Number(a[1]) || 0))

      .slice(0, 12);



    labels = sourceEntries.map(([key]) => key);

    values =

      sourceEntries.map(([, value]) => value);

  }



  let metricTotal = 0;

  if (metric === "balance") {

    metricTotal = balance;

  } else if (metric === "ingresos") {

    metricTotal = totalIncome;

  } else if (metric === "gastos") {

    metricTotal = totalExpense;

  } else if (metric === "count") {

    metricTotal = filtered.length;

  } else if (metric === "average") {

    const totalAmount = filtered.reduce((sum, g) => sum + (Number(g.cantidad) || 0), 0);

    metricTotal = filtered.length ? totalAmount / filtered.length : 0;

  } else if (metric === "flow") {

    const flowDataset = Array.isArray(values) && values[0]?.data ? values[0].data : [];

    metricTotal = flowDataset.length ? flowDataset[flowDataset.length - 1] : 0;

  } else if (metric === "comparative") {

    metricTotal = balance;

  } else if (metric === "highest") {

    metricTotal = sortedByAmount[0] ? Number(sortedByAmount[0].cantidad) || 0 : 0;

  } else if (metric === "lowest") {

    metricTotal = sortedByAmount.length ? Number(sortedByAmount[sortedByAmount.length - 1].cantidad) || 0 : 0;

  } else if (metric === "networth") {

    metricTotal = balance;

  } else if (metric === "savings_rate") {

    metricTotal = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;

  } else if (metric === "efficiency") {

    metricTotal = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  } else if (metric === "projection") {

    const projectionMultiplier = period === "day" ? 30 : period === "month" ? 1 : 12;

    metricTotal = balance * projectionMultiplier;

  } else if (metric === "cost_optimization") {

    const totalGastos = filtered.filter(g => g.tipo === 'gasto')

      .reduce((sum, g) => sum + (Number(g.cantidad) || 0), 0);

    metricTotal = totalGastos;

  } else if (metric === "financial_dashboard") {

    const ahorro = Math.max(0, balance);

    const inversiones = filtered.filter(g => g.categoria === 'Inversiones' || g.categoria === 'Inversion')

      .reduce((sum, g) => sum + (Number(g.cantidad) || 0), 0);

    metricTotal = ahorro + inversiones;

  }



  if (dashboardMetricTitle) dashboardMetricTitle.textContent = getMetricLabel(metric);

  if (dashboardMetricValue) {

    const metricText =

      metric === "count"

        ? String(metricTotal)

        : metric === "savings_rate"

          ? `${metricTotal.toFixed(2)} %`

        : metric === "efficiency"

          ? `${metricTotal.toFixed(1)} %`

        : metric === "projection"

          ? `${metricTotal.toFixed(2)} €`

        : metric === "cost_optimization"

          ? `${metricTotal.toFixed(2)} €`

        : metric === "financial_dashboard"

          ? `${metricTotal.toFixed(2)} €`

          : `${metricTotal.toFixed(2)} €`;

    dashboardMetricValue.textContent = metricText;

  }



  if (!Array.isArray(values) || !values.length || typeof values[0] !== "object") {

    const palette = getMetricPalette(metric, labels.length || 1);

    const backgroundColors = labels.map((_, index) => palette[index % palette.length]);

    const borderColors = backgroundColors.map(color => withAlpha(color, 1));



    values = [

      {

        label: getMetricLabel(metric),

        data: values,

        backgroundColor: backgroundColors,

        borderColor: borderColors,

        borderWidth: 2,

        fill: chartType === "line",

        tension: chartType === "line" ? 0.35 : 0,

      },

    ];

  }



  updateChart(labels, values, getMetricLabel(metric), chartType);

}



function ensureChart(type = "bar", datasetCount = 1) {

  if (dashboardChart) {

    if (dashboardChart.config.type !== type || dashboardChart.data.datasets.length !== datasetCount) {

      dashboardChart.destroy();

      dashboardChart = null;

    } else {

      return;

    }

  }



  if (!dashboardCanvas) return;

  const ctx = dashboardCanvas.getContext("2d");

  const palette = themePalette[currentTheme] || themePalette.natural;



  const textColor = getCssVar("--text") || "#000";

  const gridColor = getCssVar("--table-border") || "rgba(0,0,0,0.1)";



  dashboardChart = new Chart(ctx, {

    type,

    data: {

      labels: [],

      datasets: Array.from({ length: datasetCount }, (_, i) => ({

        label: "",

        data: [],

        backgroundColor: palette.chartBg,

        borderColor: palette.chartBorder,

        borderWidth: 2,

        fill: type === "line" ? false : true,

        tension: type === "line" ? 0.35 : 0,

      })),

    },

    options: {

      responsive: true,

      maintainAspectRatio: false,

      scales: {

        x: {

          ticks: { color: textColor },

          grid: { color: gridColor },

        },

        y: {

          beginAtZero: true,

          ticks: { color: textColor },

          grid: { color: gridColor },

        },

      },

      plugins: {

        legend: {

          display: true,

          labels: {

            color: textColor,

          },

        },

      },

    },

  });

}



function updateChart(labels, values, label, type = "bar") {

  const datasets = Array.isArray(values) && values.length && typeof values[0] === "object" ? values : null;



  if (datasets) {

    ensureChart(type, datasets.length);

  } else {

    ensureChart(type, 1);

  }



  if (!dashboardChart) return;



  dashboardChart.data.labels = labels;



  if (datasets) {

    datasets.forEach((ds, index) => {

      if (!dashboardChart.data.datasets[index]) return;

      dashboardChart.data.datasets[index].label = ds.label || "";

      dashboardChart.data.datasets[index].data = ds.data || [];

      if (ds.backgroundColor) dashboardChart.data.datasets[index].backgroundColor = ds.backgroundColor;

      if (ds.borderColor) dashboardChart.data.datasets[index].borderColor = ds.borderColor;

      if (ds.borderWidth != null) dashboardChart.data.datasets[index].borderWidth = ds.borderWidth;

      dashboardChart.data.datasets[index].fill = ds.fill ?? (type !== "line");

      dashboardChart.data.datasets[index].tension = ds.tension ?? (type === "line" ? 0.35 : 0);

    });

  } else {

    dashboardChart.data.datasets[0].data = values;

    dashboardChart.data.datasets[0].label = label;

  }



  dashboardChart.update();

}



function buildTableHeader() {

  const thead = document.createElement("thead");

  const tr = document.createElement("tr");



  columns.forEach((col, colIndex) => {

    const th = document.createElement("th");

    th.tabIndex = 0;

    th.dataset.colKey = col.key;

    th.dataset.colIndex = colIndex;



    const label = document.createElement("span");

    label.textContent = col.label;



    if (["tipo", "categoria", "cantidad", "fecha"].includes(col.key)) {

      const wrapper = document.createElement("div");

      wrapper.className = "th-with-control";

      wrapper.appendChild(label);



      const select = document.createElement("select");

      select.className = "header-sort";



      if (col.key === "tipo") {

        [{ value: "", label: "Todos" }, ...types.map(value => ({ value, label: value }))].forEach(optionData => {

          const option = document.createElement("option");

          option.value = optionData.value;

          option.textContent = optionData.label;

          select.appendChild(option);

        });

        select.value = tableFilters.tipo || "";

        select.addEventListener("change", () => {

          tableFilters.tipo = select.value;

          render();

        });

      } else if (col.key === "categoria") {

        [{ value: "", label: "Todas" }, ...categories.map(value => ({ value, label: value }))].forEach(optionData => {

          const option = document.createElement("option");

          option.value = optionData.value;

          option.textContent = optionData.label;

          select.appendChild(option);

        });

        select.value = tableFilters.categoria || "";

        select.addEventListener("change", () => {

          tableFilters.categoria = select.value;

          render();

        });

      } else if (col.key === "cantidad") {

        [

          { value: "default", label: "Volver" },

          { value: "desc", label: "Mayor" },

          { value: "asc", label: "Menor" },

        ].forEach(optionData => {

          const option = document.createElement("option");

          option.value = optionData.value;

          option.textContent = optionData.label;

          select.appendChild(option);

        });

        select.value = tableSort.amount;

        select.addEventListener("change", () => {

          tableSort.amount = select.value;

          if (sortAmount) sortAmount.value = select.value;

          render();

        });

      } else {

        [

          { value: "default", label: "Volver" },

          { value: "oldest", label: "Antiguas" },

          { value: "newest", label: "Nuevas" },

          { value: "current", label: "F actual" },

          { value: "asc", label: "Menor a Mayor" },

          { value: "desc", label: "Mayor a Menor" },

        ].forEach(optionData => {

          const option = document.createElement("option");

          option.value = optionData.value;

          option.textContent = optionData.label;

          select.appendChild(option);

        });

        select.value = tableSort.date;

        select.addEventListener("change", () => {

          tableSort.date = select.value;

          if (sortDate) sortDate.value = select.value;

          render();

        });

      }



      wrapper.appendChild(select);

      th.appendChild(wrapper);

    } else if (["nombre", "descripcion"].includes(col.key)) {

      const wrapper = document.createElement("div");

      wrapper.className = "th-with-control";

      wrapper.appendChild(label);



      const searchInput = document.createElement("input");

      searchInput.type = "text";

      searchInput.className = "header-search";

      searchInput.placeholder = "Buscar...";

      searchInput.value = tableFilters[col.key] || "";



      // Búsqueda simplificada y optimizada

      let searchTimeout;

      let isUserTyping = false;

      

      searchInput.addEventListener("blur", (e) => {

        if (!isUserTyping) {

          tableFilters[col.key] = e.target.value.trim();

          render();

        }

      });



      // Búsqueda automática con debounce mejorado

      searchInput.addEventListener("input", (e) => {

        const currentValue = e.target.value;

        isUserTyping = true;

        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {

          isUserTyping = false;

          tableFilters[col.key] = currentValue.trim();

          render();

        }, 800); // Aumentado a 800ms para evitar disparo mientras escribe

      });



      // Búsqueda inmediata al presionar Enter

      searchInput.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

          e.preventDefault();

          clearTimeout(searchTimeout);

          isUserTyping = false;

          tableFilters[col.key] = e.target.value.trim();

          render();

        }

      });



      wrapper.appendChild(searchInput);

      th.appendChild(wrapper);

    } else {

      th.appendChild(label);

    }



    if (!col.fixed) {

      th.title = "Presiona Supr para eliminar esta columna";

    }



    th.addEventListener("keydown", e => {

      if (!col.fixed && e.key === "Delete") {

        removeColumn(col.key);

      }

    });



    tr.appendChild(th);

  });



  const actionsTh = document.createElement("th");

  const actionsWrapper = document.createElement("div");

  actionsWrapper.className = "th-with-control";

  const actionsLabel = document.createElement("span");

  actionsLabel.textContent = "Acción";

  const resetButton = document.createElement("button");

  resetButton.className = "header-sort reset-button";

  resetButton.innerHTML = "↻";

  resetButton.style.fontSize = "18px";

  resetButton.addEventListener("click", () => {

    console.log("🔄 Click en botón Restablecer");

    console.log("📊 Estado antes de reset - Filtros:", tableFilters, "Orden:", tableSort);

    

    // Feedback visual inmediato

    resetButton.style.transform = "scale(0.95)";

    resetButton.style.background = "var(--primary-dark)";

    

    // Aplicar el reset

    tableFilters.tipo = "";

    tableFilters.categoria = "";

    tableSort.amount = "default";

    tableSort.date = "default";

    

    console.log("🔄 Filtros y ordenación reiniciados");

    console.log("📊 Estado después de reset - Filtros:", tableFilters, "Orden:", tableSort);

    

    // Actualizar selects si existen

    if (sortAmount) {

      sortAmount.value = "default";

      console.log("✅ sortAmount actualizado a default");

    } else {

      console.warn("⚠️ sortAmount no encontrado");

    }

    

    if (sortDate) {

      sortDate.value = "default";

      console.log("✅ sortDate actualizado a default");

    } else {

      console.warn("⚠️ sortDate no encontrado");

    }

    

    // Actualizar ambas vistas

    console.log("🔄 Actualizando vistas...");

    render();

    renderAlmanaque();

    console.log("✅ Vistas actualizadas");

    

    // Restaurar colores del tema después de un breve delay

    setTimeout(() => {

      resetButton.style.transform = "scale(1)";

      resetButton.style.background = "var(--primary)";

      console.log("✅ Botón restablecer visual restaurado");

    }, 150);

    

    console.log("🔄 Restablecimiento completo: filtros y ordenación reiniciados");

  });

  actionsWrapper.appendChild(actionsLabel);

  actionsWrapper.appendChild(resetButton);

  actionsTh.appendChild(actionsWrapper);

  tr.appendChild(actionsTh);



  thead.appendChild(tr);

  return thead;

}



function addRow(values = {}, options = {}) {

  if (!options.skipSnapshot) {

    saveRecoverySnapshot("add-row");

  }

  lastDeleted = null;

  setUndoVisible(false);

  const row = { id: createUniqueId() };

  columns.forEach(col => {

    if (values[col.key] != null && values[col.key] !== "") {

      row[col.key] = values[col.key];

    } else if (col.type === "number") {

      row[col.key] = 0;

    } else if (col.type === "datetime") {

      row[col.key] = getNowDateTimeLocal();

    } else if (col.type === "select") {

      row[col.key] = col.key === "tipo" ? types[0] : categories[0];

    } else {

      row[col.key] = "";

    }

  });



  // adjuntos para cada registro

  row.attachments = values.attachments || [];



  gastos.push(normalizeRecord(row));

  

  // 🔴 RENUMERACIÓN CORRELATIVA AL AGREGAR NUEVO REGISTRO

  renumerarRegistros();

  

  // Sincronizar con Firebase (sin afectar la lógica actual)

  if (typeof window.guardarGastoEnFirebase === 'function') {

    const nuevoGasto = normalizeRecord(row);

    window.guardarGastoEnFirebase(nuevoGasto);

  }

  

  focusAfterRender = { row: gastos.length - 1, col: 0 };

}



function getRecurringDates(startDateValue, mode) {

  if (mode === "single") return [startDateValue];

  const startDate = new Date(startDateValue);

  if (isNaN(startDate.getTime())) return [startDateValue];



  const dates = [];

  const cursor = new Date(startDate);

  const limitYear = 2030;

  const anchorDay = startDate.getDate();



  while (cursor.getFullYear() <= limitYear) {

    dates.push(formatLocalDate(cursor));

    if (mode === "monthly") {

      cursor.setMonth(cursor.getMonth() + 1, 1);

      const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();

      cursor.setDate(Math.min(anchorDay, daysInMonth));

    } else if (mode === "yearly") {

      cursor.setFullYear(cursor.getFullYear() + 1, cursor.getMonth(), anchorDay);

    } else {

      break;

    }

  }



  return dates;

}



function getRecordIdentityKey(values = {}) {

  return [

    normalizeComparableText(values.tipo),

    normalizeComparableText(values.nombre),

    normalizeComparableText(values.categoria),

    normalizeComparableText(values.descripcion),

    Number(values.cantidad || 0).toFixed(2),

  ].join("|");

}



function getRecordPeriodKey(dateValue, mode = "single") {

  const date = String(dateValue || "");

  if (mode === "monthly") return date.slice(0, 7);

  if (mode === "yearly") return date.slice(0, 4);

  return date.slice(0, 10);

}



function hasDuplicateForMode(values, dateValue, mode = "single") {

  const targetIdentity = getRecordIdentityKey(values);

  const targetPeriod = getRecordPeriodKey(dateValue, mode);



  return gastos.some(record => {

    const recordIdentity = getRecordIdentityKey(record);

    const recordPeriod = getRecordPeriodKey(record.fecha, mode);

    return recordIdentity === targetIdentity && recordPeriod === targetPeriod;

  });

}



function addRowsFromMode(values, mode = "single") {

  // Manejar opción especial de eliminar deudas

  if (mode === "delete-debts") {

    return deleteDebtRecords();

  }

  

  // Manejar opción monthly-until

  if (mode === "monthly-until") {

    return showMonthlyUntilDialog(values);

  }

  

  // Manejar opción monthly-single (un solo registro mensual)

  if (mode === "monthly-single") {

    return addSingleMonthlyRecord(values);

  }

  

  const dates = getRecurringDates(values.fecha || getNowDateTimeLocal(), mode);

  const groupId = mode === "single" ? null : `series-${createUniqueId()}`;

  saveRecoverySnapshot(mode === "single" ? "add-row" : `add-row-${mode}`);

  lastDeleted = null;

  setUndoVisible(false);

  let added = 0;

  let skipped = 0;

  dates.forEach((dateValue, index) => {

    if (hasDuplicateForMode(values, dateValue, mode)) {

      skipped += 1;

      return;

    }

    addRow({

      ...values,

      fecha: dateValue,

      recurrenceMode: mode,

      recurrenceGroup: groupId,

      recurrenceIndex: index,

    }, { skipSnapshot: true });

    added += 1;

  });



  return { added, skipped };

}



function deleteDebtRecords() {

  console.log('🔍 Buscando registros de deuda a plazo...');

  

  // Búsqueda más específica y precisa

  const debtRecords = gastos.filter(gasto => {

    const nombre = (gasto.nombre || '').toLowerCase();

    const descripcion = (gasto.descripcion || '').toLowerCase();

    const categoria = (gasto.categoria || '').toLowerCase();

    const searchText = nombre + ' ' + descripcion + ' ' + categoria;

    

    // Búsqueda específica para iPhone-1000 o variantes

    const isIPhoneDebt = searchText.includes('iphone-1000') || 

                       searchText.includes('iphone 1000') ||

                       searchText.includes('iphone1000');

    

    // Búsqueda específica para términos de deuda

    const isDebtTerm = searchText.includes('deuda a plazo') ||

                      searchText.includes('cuota iphone') ||

                      searchText.includes('financiamiento iphone') ||

                      (searchText.includes('pago mensual') && searchText.includes('iphone'));

    

    // Solo incluir si es claramente una deuda

    return isIPhoneDebt || isDebtTerm;

  });

  

  console.log('🎯 Registros de deuda encontrados:', debtRecords);

  

  if (debtRecords.length === 0) {

    alert('ℹ️ No se encontraron registros específicos de deuda a plazo (iPhone-1000, etc.)');

    return { added: 0, skipped: 0 };

  }

  

  // Mostrar detalles más precisos

  const detailsList = debtRecords.map(r => {

    const date = new Date(r.fecha).toLocaleDateString();

    const amount = r.cantidad ? `${r.cantidad}€` : 'N/A';

    const name = r.nombre || r.descripcion || 'Sin descripción';

    return `• ${date} - ${name} (${amount})`;

  });

  

  const confirmMessage = `Se encontraron ${debtRecords.length} registros de deuda a plazo:\n\n` +

    detailsList.slice(0, 5).join('\n') +

    (debtRecords.length > 5 ? `\n... y ${debtRecords.length - 5} más` : '') +

    '\n\n¿Deseas eliminar estos registros de deuda?';

  

  if (!confirm(confirmMessage)) {

    return { added: 0, skipped: 0 };

  }

  

  // Eliminar registros de manera segura

  const deletedCount = debtRecords.length;

  const idsToDelete = debtRecords.map(r => r.id);

  

  // Eliminar en orden inverso para evitar problemas de índice

  idsToDelete.reverse().forEach(id => {

    const index = gastos.findIndex(g => g.id === id);

    if (index !== -1) {

      console.log(`🗑️ Eliminando registro ID ${id}:`, gastos[index]);

      gastos.splice(index, 1);

    }

  });

  

  // Guardar y renderizar

  saveData();

  render();

  renderAlmanaque();

  

  alert(`✅ Se eliminaron ${deletedCount} registros de deuda a plazo correctamente`);

  console.log(`🗑️ Eliminados ${deletedCount} registros de deuda:`, debtRecords);

  

  return { added: 0, skipped: deletedCount };

}



/* =========================================================

   🔴 FIX REAL MODAL PROFESIONAL

   ========================================================= */



(function () {

  // 🔴 1. CSS INYECTADO (NO DEPENDE DE TU CSS)

  const style = document.createElement("style");

  style.innerHTML = `

    

    .actions-menu {

      position: fixed !important;

      top: 50% !important;

      left: 50% !important;

      transform: translate(-50%, -50%) !important;



      background: #ffffff !important;

      border-radius: 12px !important;

      padding: 16px !important;

      min-width: 320px !important;



      box-shadow: 0 20px 50px rgba(0,0,0,0.3) !important;

      z-index: 10000 !important;

    }



    .modal-overlay-fix {

      position: fixed;

      top: 0;

      left: 0;

      width: 100%;

      height: 100%;

      background: rgba(0,0,0,0.45);

      z-index: 9999;

    }



  `;

  document.head.appendChild(style);



  // 🔴 2. OBSERVAR CUANDO APARECE EL MENÚ (EL "MODAL" REAL)

  const observer = new MutationObserver(() => {

    const menu = document.querySelector(".actions-menu");



    if (!menu || menu.dataset.fixed) return;



    menu.dataset.fixed = "true";



    console.log("✅ MODAL CORREGIDO");



    // 🔴 3. CREAR OVERLAY

    let overlay = document.querySelector(".modal-overlay-fix");



    if (!overlay) {

      overlay = document.createElement("div");

      overlay.className = "modal-overlay-fix";

      document.body.appendChild(overlay);

    }



    // 🔴 4. FORZAR CENTRADO

    menu.style.top = "50%";

    menu.style.left = "50%";

    menu.style.transform = "translate(-50%, -50%)";



    // 🔴 5. CERRAR AL HACER CLICK FUERA

    overlay.onclick = () => {

      menu.remove();

      overlay.remove();

    };



  });



  observer.observe(document.body, {

    childList: true,

    subtree: true

  });



})();



/* =========================================================

   🔥 MODAL PRO NIVEL BANCO (COMPLETO)

   ========================================================= */



(function () {

  // 🎨 1. ESTILOS PRO (animación + botón cerrar + drag cursor)

  const style = document.createElement("style");

  style.innerHTML = `

    

    .actions-menu {

      position: fixed !important;

      top: 50% !important;

      left: 50% !important;

      transform: translate(-50%, -50%) scale(0.95) !important;



      background: #ffffff !important;

      border-radius: 14px !important;

      padding: 18px !important;

      min-width: 340px !important;



      box-shadow: 0 25px 60px rgba(0,0,0,0.35) !important;

      z-index: 10000 !important;



      animation: modalFadeIn 0.2s ease forwards;

    }



    @keyframes modalFadeIn {

      from {

        opacity: 0;

        transform: translate(-50%, -60%) scale(0.9);

      }

      to {

        opacity: 1;

        transform: translate(-50%, -50%) scale(1);

      }

    }



    .modal-overlay-fix {

      position: fixed;

      top: 0;

      left: 0;

      width: 100%;

      height: 100%;

      background: rgba(0,0,0,0.45);

      backdrop-filter: blur(2px);

      z-index: 9999;

    }



    .modal-close-btn {

      position: absolute;

      top: 10px;

      right: 12px;

      cursor: pointer;

      font-size: 18px;

      color: #666;

      transition: 0.2s;

    }



    .modal-close-btn:hover {

      color: #000;

      transform: scale(1.2);

    }



    .modal-header-drag {

      cursor: move;

      font-weight: bold;

      margin-bottom: 10px;

    }



  `;

  document.head.appendChild(style);



  // 🔍 2. OBSERVER PARA DETECTAR EL MODAL REAL

  const observer = new MutationObserver(() => {

    const modal = document.querySelector(".actions-menu");



    if (!modal || modal.dataset.pro) return;



    modal.dataset.pro = "true";



    console.log("🚀 MODAL PRO ACTIVADO");



    // 🔴 3. OVERLAY

    let overlay = document.querySelector(".modal-overlay-fix");



    if (!overlay) {

      overlay = document.createElement("div");

      overlay.className = "modal-overlay-fix";

      document.body.appendChild(overlay);

    }



    // 🔴 4. BOTÓN CERRAR

    const closeBtn = document.createElement("div");

    closeBtn.innerHTML = "✕";

    closeBtn.className = "modal-close-btn";

    modal.appendChild(closeBtn);



    const closeModal = () => {

      modal.remove();

      overlay.remove();

    };



    closeBtn.onclick = closeModal;

    overlay.onclick = closeModal;



    // 🔴 5. DRAG REAL (tipo ventana Windows)

    let isDragging = false;

    let offsetX = 0;

    let offsetY = 0;



    modal.addEventListener("mousedown", (e) => {

      if (e.offsetY < 40) {

        isDragging = true;



        const rect = modal.getBoundingClientRect();

        offsetX = e.clientX - rect.left;

        offsetY = e.clientY - rect.top;



        modal.style.transform = "none";

      }

    });



    document.addEventListener("mousemove", (e) => {

      if (!isDragging) return;



      modal.style.left = (e.clientX - offsetX) + "px";

      modal.style.top = (e.clientY - offsetY) + "px";

    });



    document.addEventListener("mouseup", () => {

      isDragging = false;

    });



  });



  observer.observe(document.body, {

    childList: true,

    subtree: true

  });



})();



function showMonthlyUntilDialog(values) {

  const modal = document.createElement('div');

  modal.className = 'date-range-modal';

  modal.style.cssText = `

    position: fixed;

    top: 50%;

    left: 50%;

    transform: translate(-50%, -50%);

    background: white;

    border: 1px solid var(--card-border);

    border-radius: 12px;

    box-shadow: 0 10px 30px rgba(0,0,0,0.3);

    z-index: 10000;

    min-width: 400px;

    max-width: 500px;

  `;

  

  const referenceDate = new Date(values.fecha || getNowDateTimeLocal());

  const futureDate = new Date(referenceDate);

  futureDate.setMonth(futureDate.getMonth() + 12); // Por defecto 1 año

  

  modal.innerHTML = `

    <div class="modal-header">

      <h3>${getDialogTitle(values.tipo, 'monthly-until')}</h3>

      <button class="modal-close">&times;</button>

    </div>

    <div class="modal-body">

      <div class="form-group">

        <label>Fecha de inicio:</label>

        <input type="date" id="startDate" class="form-input" value="${referenceDate.toISOString().slice(0, 10)}">

      </div>

      <div class="form-group">

        <label>Fecha de fin:</label>

        <input type="date" id="endDate" class="form-input" value="${getEndDate('monthly-until', referenceDate).toISOString().slice(0, 10)}">

      </div>

      <div class="form-group">

        <label>Día del mes:</label>

        <input type="number" id="dayOfMonth" class="form-input" value="${values.dayOfMonth || 1}" min="1" max="31">

        <small>Se generará un registro cada mes en este día</small>

      </div>

      <div class="form-group">

        <label>Descripción:</label>

        <input type="text" id="recordDescription" class="form-input" value="${values.descripcion || ''}" placeholder="Descripción del registro">

      </div>

      <div class="form-group">

        <label>Nombre:</label>

        <input type="text" id="recordName" class="form-input" value="${values.nombre || ''}" placeholder="Nombre del registro">

      </div>

      <div class="form-group">

        <label>Cantidad:</label>

        <input type="number" id="recordAmount" class="form-input" value="${values.cantidad || 0}" step="0.01" placeholder="0.00">

      </div>

      <div class="form-group">

        <label>Categoría:</label>

        <input type="text" id="recordCategory" class="form-input" value="${values.categoria || ''}" placeholder="Ej: Comida, Transporte">

      </div>

    </div>

    <div class="modal-footer">

      <button class="btn btn-secondary" id="cancelBtn">Cancelar</button>

      <button class="btn btn-primary" id="generateBtn">Generar Registros</button>

    </div>

  `;

  

  // Añadir backdrop

  const backdrop = document.createElement('div');

  backdrop.className = 'modal-backdrop';

  backdrop.style.cssText = `

    position: fixed;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    background: rgba(0,0,0,0.5);

    z-index: 9999;

  `;

  

  // Event listeners

  modal.querySelector('.modal-close').addEventListener('click', () => {

    modal.remove();

    backdrop.remove();

  });

  

  modal.querySelector('#cancelBtn').addEventListener('click', () => {

    modal.remove();

    backdrop.remove();

  });

  

  modal.querySelector('#generateBtn').addEventListener('click', () => {

    console.log("🔥 Botón mensual ejecutado");

    generateMonthlyUntilRecords(modal, values);

  });

  

  backdrop.addEventListener('click', () => {

    modal.remove();

    backdrop.remove();

  });

  

  document.body.appendChild(backdrop);

  document.body.appendChild(modal);

  

  return { added: 0, skipped: 0 };

}



function formatLocalDate(date) {

  const pad = (n) => String(n).padStart(2, '0');



  const year = date.getFullYear();

  const month = pad(date.getMonth() + 1);

  const day = pad(date.getDate());

  const hours = pad(date.getHours());

  const minutes = pad(date.getMinutes());



  return `${year}-${month}-${day}T${hours}:${minutes}`;

}



function generateMonthlyUntilRecords(modal, baseValues) {

  const startDate = new Date(baseValues.fecha);

  const endDate = new Date(modal.querySelector('#endDate').value);



  if (isNaN(startDate) || isNaN(endDate)) {

    console.error("❌ Fechas inválidas");

    return;

  }



  const targetDay = startDate.getDate();



  let year = startDate.getFullYear();

  let month = startDate.getMonth();



  while (true) {

    const daysInMonth = new Date(year, month + 1, 0).getDate();



    // 👉 Mantener el día original SIEMPRE

    const safeDay = targetDay <= daysInMonth ? targetDay : daysInMonth;



    const recordDate = new Date(year, month, safeDay);



    // 👉 condición correcta para incluir último mes

    if (recordDate > endDate) break;



    addRow({

      tipo: baseValues.tipo,

      nombre: baseValues.nombre,

      categoria: baseValues.categoria,

      cantidad: baseValues.cantidad,

      descripcion: baseValues.descripcion,

      fecha: formatLocalDate(recordDate)

    });



    // avanzar mes manualmente (SIN setMonth)

    month++;

    if (month > 11) {

      month = 0;

      year++;

    }

  }



  console.log("✅ Registros mensuales generados correctamente");



  // 🔥 CERRAR MODAL AUTOMÁTICAMENTE

  const backdrop = document.querySelector('.modal-backdrop');

  if (backdrop) backdrop.remove();

  if (modal) modal.remove();

}



function addSingleMonthlyRecord(values) {

  console.log('📅 Agregando un solo registro mensual:', values);

  

  // Usar la fecha exacta que proporcionó el usuario

  const fecha = values.fecha || getNowDateTimeLocal();

  

  // Verificar si ya existe un registro duplicado

  if (hasDuplicateForMode(values, fecha, 'single')) {

    console.log('⚠️ El registro ya existe, no se agrega');

    return { added: 0, skipped: 1 };

  }

  

  // Agregar el registro con modo monthly-single para identificarlo

  addRow({

    ...values,

    fecha: fecha,

    recurrenceMode: 'monthly-single',

    recurrenceGroup: null,

    recurrenceIndex: 0,

  }, { skipSnapshot: true });

  

  saveData();

  render();

  renderAlmanaque();

  

  console.log('✅ Registro mensual individual agregado correctamente');

  

  return { added: 1, skipped: 0 };

}



// Función para generar registros diarios hasta fecha

function generateDailyUntilRecords(modal, baseValues) {

  const startDate = new Date(modal.querySelector('#startDate').value);

  const endDate = new Date(modal.querySelector('#endDate').value);

  const recordName = modal.querySelector('#recordName').value;

  const recordDescription = modal.querySelector('#recordDescription').value;

  const recordAmount = parseFloat(modal.querySelector('#recordAmount').value) || 0;

  const recordCategory = modal.querySelector('#recordCategory').value;

  

  console.log('🔍 Generando registros diarios:', {

    startDate: startDate.toISOString().slice(0, 10),

    endDate: endDate.toISOString().slice(0, 10),

    recordName,

    recordDescription,

    recordAmount,

    recordCategory

  });

  

  if (!startDate || !endDate || startDate >= endDate) {

    alert('Por favor, selecciona un rango de fechas válido');

    return;

  }

  

  if (!recordCategory) {

    alert('Por favor, ingresa una categoría');

    return;

  }

  

  const records = [];

  let currentDate = new Date(startDate);

  

  while (currentDate <= endDate) {

    const record = {

      id: createUniqueId(),

      fecha: formatLocalDate(currentDate),

      tipo: baseValues.tipo || 'Gasto',

      categoria: recordCategory,

      descripcion: recordDescription || `${baseValues.tipo || 'Gasto'} - ${recordCategory}`,

      cantidad: recordAmount,

      nombre: recordName || recordCategory

    };

    

    records.push(record);

    console.log('✅ Registro diario agregado:', record.fecha.slice(0, 10));

    

    // Avanzar al siguiente día

    currentDate.setDate(currentDate.getDate() + 1);

  }

  

  // Agregar registros al array gastos

  gastos.push(...records);

  

  // Guardar y renderizar

  saveData();

  render();

  renderAlmanaque();

  

  // Mostrar confirmación

  alert(`✅ Se generaron ${records.length} registros diarios desde ${startDate.toLocaleDateString()} hasta ${endDate.toLocaleDateString()}`);

  

  console.log(`📊 Generados ${records.length} registros diarios:`, records);

  

  return { added: records.length, skipped: 0 };

}



// Función para generar registros anuales hasta fecha

function generateYearlyUntilRecords(modal, baseValues) {

  const startDate = new Date(modal.querySelector('#startDate').value);

  const endDate = new Date(modal.querySelector('#endDate').value);

  const monthOfYear = parseInt(modal.querySelector('#monthOfYear').value) - 1; // JavaScript usa 0-11 para meses

  const recordName = modal.querySelector('#recordName').value;

  const recordDescription = modal.querySelector('#recordDescription').value;

  const recordAmount = parseFloat(modal.querySelector('#recordAmount').value) || 0;

  const recordCategory = modal.querySelector('#recordCategory').value;

  

  console.log('🔍 Generando registros anuales:', {

    startDate: startDate.toISOString().slice(0, 10),

    endDate: endDate.toISOString().slice(0, 10),

    monthOfYear: monthOfYear + 1,

    recordName,

    recordDescription,

    recordAmount,

    recordCategory

  });

  

  if (!startDate || !endDate || startDate >= endDate) {

    alert('Por favor, selecciona un rango de fechas válido');

    return;

  }

  

  if (!recordCategory) {

    alert('Por favor, ingresa una categoría');

    return;

  }

  

  if (monthOfYear < 0 || monthOfYear > 11) {

    alert('Por favor, ingresa un mes válido (1-12)');

    return;

  }

  

  const records = [];

  let currentYear = startDate.getFullYear();

  

  while (currentYear <= endDate.getFullYear()) {

    const recordDate = new Date(currentYear, monthOfYear, 1);

    

    // Verificar que la fecha esté dentro del rango

    if (recordDate >= startDate && recordDate <= endDate) {

      const record = {

        id: createUniqueId(),

        fecha: formatLocalDate(recordDate),

        tipo: baseValues.tipo || 'Gasto',

        categoria: recordCategory,

        descripcion: recordDescription || `${baseValues.tipo || 'Gasto'} - ${recordCategory}`,

        cantidad: recordAmount,

        nombre: recordName || recordCategory

      };

      

      records.push(record);

      console.log('✅ Registro anual agregado:', record.fecha.slice(0, 10));

    }

    

    // Avanzar al siguiente año

    currentYear++;

  }

  

  // Agregar registros al array gastos

  gastos.push(...records);

  

  // Guardar y renderizar

  saveData();

  render();

  renderAlmanaque();

  

  // Mostrar confirmación

  alert(`✅ Se generaron ${records.length} registros anuales desde ${startDate.toLocaleDateString()} hasta ${endDate.toLocaleDateString()}`);

  

  console.log(`📊 Generados ${records.length} registros anuales:`, records);

  

  return { added: records.length, skipped: 0 };

}



function getVisibleTotalsSummary(rows) {

  const totalIncome = rows.reduce((sum, gasto) => {

    if (String(gasto.tipo).toLowerCase() === "ingreso") {

      return sum + (Number(gasto.cantidad) || 0);

    }

    return sum;

  }, 0);



  const totalExpense = rows.reduce((sum, gasto) => {

    if (String(gasto.tipo).toLowerCase() === "gasto") {

      return sum + (Number(gasto.cantidad) || 0);

    }

    return sum;

  }, 0);



  return {

    totalIncome,

    totalExpense,

    balance: totalIncome - totalExpense,

  };

}



function addEmptyRow() {

  addRow();

  render();

}



function removeColumn(key) {

  const index = columns.findIndex(c => c.key === key);

  if (index === -1) return;

  saveRecoverySnapshot("remove-column");

  columns.splice(index, 1);

  gastos.forEach(g => delete g[key]);

  syncCustomColumnsWithSettings();

  buildFormFields();

  render();

}



function addColumn(label) {

  saveRecoverySnapshot("add-column");

  lastDeleted = null;

  setUndoVisible(false);



  const key = label

    .toLowerCase()

    .replace(/\s+/g, "_")

    .replace(/[^a-z0-9_]/g, "");



  if (!key || columns.some(c => c.key === key)) return;



  columns.push({ key, label, type: "text", custom: true });

  gastos.forEach(g => (g[key] = ""));

  syncCustomColumnsWithSettings();

  buildFormFields();

  render();

}



function setUndoVisible(visible) {

  btnUndo.style.display = visible ? "inline-block" : "none";

}



function render() {

  const table = entriesPanel?.querySelector("table");

  if (!table) return;

  const existingThead = table.querySelector("thead");



  if (existingThead) {

    existingThead.remove();

  }



  table.prepend(buildTableHeader());



  tablaBody.innerHTML = "";

  visibleRows = getFilteredEntries();

  const totalRows = visibleRows.length;

  const totalCols = columns.length;



  if (visibleRows.length === 0) {

    const emptyRow = document.createElement("tr");

    const emptyCell = document.createElement("td");

    emptyCell.colSpan = totalCols + 1;

    emptyCell.className = "table-empty";

    emptyCell.textContent = gastos.length === 0 ? "Todavía no hay registros." : "No hay registros que coincidan con los filtros actuales.";

    emptyRow.appendChild(emptyCell);

    tablaBody.appendChild(emptyRow);

  }



  visibleRows.forEach((gasto, rowIndex) => {

    const tr = document.createElement("tr");

    tr.dataset.id = gasto.id;



    columns.forEach((col, colIndex) => {

      tr.appendChild(createEditableCell(gasto, col, rowIndex, colIndex, totalRows, totalCols));

    });



    tr.appendChild(createRowActionsCell(gasto));



    tablaBody.appendChild(tr);

  });



  const { totalIncome, totalExpense, balance } = getVisibleTotalsSummary(visibleRows);

  const hasOnlyIncomes = visibleRows.length > 0 && visibleRows.every(item => normalizeText(item.tipo) === "ingreso");

  const hasOnlyExpenses = visibleRows.length > 0 && visibleRows.every(item => normalizeText(item.tipo) === "gasto");



  document.getElementById("total-income").textContent = totalIncome.toFixed(2);

  document.getElementById("total-expense").textContent = totalExpense.toFixed(2);

  totalSpan.textContent = balance.toFixed(2);

  const totalsBox = document.querySelector("#entriesPanel .totals");

  if (totalsBox) {

    totalsBox.classList.add("totals-bordered");

    totalsBox.classList.toggle("totals-single", hasOnlyIncomes || hasOnlyExpenses);

    Array.from(totalsBox.children).forEach(child => {

      const text = child.textContent || "";

      if (text.startsWith("Ingresos")) child.hidden = hasOnlyExpenses;

      if (text.startsWith("Gastos")) child.hidden = hasOnlyIncomes;

      if (text.startsWith("Saldo")) child.hidden = hasOnlyExpenses || hasOnlyIncomes;

    });

  }

  if (entriesSummary) {

    entriesSummary.textContent =

      visibleRows.length === gastos.length

        ? `Mostrando todos los registros (${gastos.length}).`

        : `Mostrando ${visibleRows.length} de ${gastos.length} registros.`;

  }



  setUndoVisible(Boolean(lastDeleted));

  setRestoreButtonState();

  saveData();

  refreshDateFilterOptions();

  updateDashboard();

  renderAlmanaque();

  if (focusAfterRender) {

    focusCell(focusAfterRender.row, focusAfterRender.col);

    focusAfterRender = null;

  }

}



function focusCell(rowIndex, colIndex) {

  const row = tablaBody.children[rowIndex];

  if (!row) return;

  const cell = row.children[colIndex];

  if (!cell) return;

  cell.focus();

}



function deleteRowById(rowId) {

  console.log('🗑️ Intentando eliminar registro con ID:', rowId);

  console.log('📊 Total registros antes de eliminar:', gastos.length);

  

  const index = gastos.findIndex(row => row.id === rowId);

  if (index === -1) {

    console.error('❌ No se encontró el registro con ID:', rowId);

    console.log('📋 IDs disponibles:', gastos.map(g => g.id));

    return;

  }



  const recordToDelete = gastos[index];

  console.log('🎯 Registro a eliminar:', recordToDelete);



  saveRecoverySnapshot("delete-row");

  lastDeleted = { row: gastos[index], index };

  gastos.splice(index, 1);



  if (editingRowId === rowId) {

    cancelEditing();

  }



  saveData();

  render();

  renderAlmanaque();

  

  console.log('✅ Registro eliminado correctamente');

  console.log('📊 Total registros después de eliminar:', gastos.length);

}



function createRowActionsCell(gasto) {

  const td = document.createElement("td");

  const wrapper = document.createElement("div");

  wrapper.className = "table-actions";



  const editBtn = document.createElement("button");

  editBtn.type = "button";

  editBtn.textContent = "✏️";

  editBtn.className = "secondary-button";

  editBtn.addEventListener("click", () => startEditingRecord(gasto));



  const deleteBtn = document.createElement("button");

  deleteBtn.type = "button";

  deleteBtn.textContent = "🗑️";

  deleteBtn.className = "danger-button";

  deleteBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    showDeleteActionsMenu(e, gasto);

  });



  wrapper.appendChild(editBtn);

  wrapper.appendChild(deleteBtn);

  td.appendChild(wrapper);

  return td;

}



function showDeleteActionsMenu(event, gasto) {

  // Cerrar menús existentes

  closeAllActionsMenus();

  

  const menu = document.createElement('div');

  menu.className = 'actions-menu';

  menu.style.cssText = `

    position: fixed;

    background: white;

    border: 1px solid var(--card-border);

    border-radius: 8px;

    box-shadow: 0 4px 12px rgba(0,0,0,0.15);

    z-index: 1000;

    min-width: 220px;

    padding: 8px 0;

  `;

  

  // Guardar el ID del gasto en el menú para recuperarlo después

  menu.dataset.gastoId = gasto.id;

  

  menu.innerHTML = `

    <div class="actions-menu-section">

      <div class="actions-menu-title">Opciones de Eliminación</div>

      <button class="actions-menu-item" data-action="eliminar-este">

        <span>🗑️</span> Eliminar este registro

      </button>

      <button class="actions-menu-item" data-action="eliminar-desde-hasta">

        <span>📅</span> Eliminar desde y hasta

      </button>

      <button class="actions-menu-item" data-action="eliminar-todos-siguientes">

        <span>⏭️</span> Eliminar todos los siguientes

      </button>

      <button class="actions-menu-item" data-action="eliminar-todos">

        <span>🧹</span> Eliminar todos los registros

      </button>

    </div>

    <div class="actions-menu-section">

      <div class="actions-menu-title">💸 GASTOS</div>

      <button class="actions-menu-item" data-action="gastos-mensual">

        <span>💰</span> Gastos Mensual

      </button>

      <button class="actions-menu-item" data-action="gastos-anual">

        <span>📆</span> Gastos Anual

      </button>

      <button class="actions-menu-item" data-action="gastos-diario">

        <span>📅</span> Gastos cada día hasta

      </button>

      <button class="actions-menu-item" data-action="gastos-anual-hasta">

        <span>🗓️</span> Gastos cada año hasta

      </button>

    </div>

    <div class="actions-menu-section">

      <div class="actions-menu-title">💰 INGRESOS</div>

      <button class="actions-menu-item" data-action="ingresos-mensual">

        <span>📈</span> Ingresos Mensual

      </button>

      <button class="actions-menu-item" data-action="ingresos-anual">

        <span>📊</span> Ingresos Anual

      </button>

      <button class="actions-menu-item" data-action="ingresos-diario">

        <span>📈</span> Ingresos cada día hasta

      </button>

      <button class="actions-menu-item" data-action="ingresos-anual-hasta">

        <span>📊</span> Ingresos cada año hasta

      </button>

    </div>

    <div class="actions-menu-section">

      <div class="actions-menu-title">Otros</div>

      <button class="actions-menu-item" data-action="editar">

        <span>✏️</span> Editar este registro

      </button>

      <button class="actions-menu-item" data-action="restablecer">

        <span>↻</span>

      </button>

    </div>

  `;

  

  // Posicionar menú más centrado en la pantalla

  const rect = event.target.getBoundingClientRect();

  const menuWidth = 220; // min-width del menú

  const viewportWidth = window.innerWidth;

  const viewportHeight = window.innerHeight;

  

  // Calcular posición horizontal centrada

  let leftPosition = rect.left + (rect.width / 2) - (menuWidth / 2);

  

  // Asegurar que el menú no salga de la pantalla horizontalmente

  if (leftPosition < 10) {

    leftPosition = 10;

  } else if (leftPosition + menuWidth > viewportWidth - 10) {

    leftPosition = viewportWidth - menuWidth - 10;

  }

  

  // Calcular posición vertical

  let topPosition = rect.bottom + 5;

  

  // Si el menú se sale por abajo, mostrarlo arriba del botón

  if (topPosition + 300 > viewportHeight) { // 300px aprox altura del menú

    topPosition = rect.top - 300 - 5;

  }

  

  // Asegurar que no salga por arriba

  if (topPosition < 10) {

    topPosition = 10;

  }

  

  menu.style.left = leftPosition + 'px';

  menu.style.top = topPosition + 'px';

  

  // Añadir event listeners

  menu.querySelectorAll('.actions-menu-item').forEach(item => {

    item.addEventListener('click', (e) => {

      e.stopPropagation();

      const action = item.dataset.action;

      

      // Recuperar el gasto del array usando el ID guardado en el menú

      const gastoId = menu.dataset.gastoId;

      console.log('🔍 Buscando gasto con ID:', gastoId, ' Tipo:', typeof gastoId);

      

      // Mostrar IDs disponibles para depuración

      console.log('📋 IDs disponibles en gastos:', gastos.map(g => ({ id: g.id, tipo: typeof g.id })));

      

      // Comparación flexible de IDs (string vs number)

      const gasto = gastos.find(g => String(g.id) === String(gastoId));

      

      if (gasto) {

        console.log('✅ Gasto encontrado:', {

          id: gasto.id,

          tipo: typeof gasto.id,

          fecha: gasto.fecha,

          descripcion: gasto.descripcion,

          categoria: gasto.categoria

        });

        handleDeleteAction(action, gasto);

      } else {

        console.error('❌ No se encontró el gasto con ID:', gastoId);

        console.log('📊 Estados de comparación:');

        gastos.forEach(g => {

          const gIdStr = String(g.id);

          const gastoIdStr = String(gastoId);

          console.log(`  - g.id: ${g.id} (${typeof g.id}) -> "${gIdStr}" vs "${gastoIdStr}" (${gIdStr === gastoIdStr ? '✅' : '❌'})`);

        });

        alert('Error: No se encontró el registro seleccionado');

      }

      

      menu.remove();

    });

  });

  

  // Cerrar al hacer click fuera

  const closeMenuHandler = function() {

    menu.remove();

    document.removeEventListener('click', closeMenuHandler);

  };

  

  setTimeout(() => {

    document.addEventListener('click', closeMenuHandler);

  }, 100);

  

  document.body.appendChild(menu);

}



function closeAllActionsMenus() {

  document.querySelectorAll('.actions-menu').forEach(menu => menu.remove());

}



function handleDeleteAction(action, gasto) {

  console.log('🎯 handleDeleteAction llamado con:', { action, gasto });

  console.log('📋 Registro seleccionado:', {

    id: gasto.id,

    fecha: gasto.fecha,

    descripcion: gasto.descripcion,

    categoria: gasto.categoria,

    cantidad: gasto.cantidad

  });

  

  switch(action) {

    case 'eliminar-este':

      console.log('🗑️ Eliminando este registro ID:', gasto.id);

      deleteRowById(gasto.id);

      break;

    case 'eliminar-desde-hasta':

      console.log('📅 Abriendo diálogo eliminar desde y hasta para registro:', gasto.id);

      showDeleteRangeDialog(gasto);

      break;

    case 'eliminar-todos-siguientes':

      console.log('⏭️ Abriendo diálogo eliminar todos los siguientes para registro:', gasto.id);

      showDeleteRangeDialog(gasto);

      break;

    case 'eliminar-todos':

      console.log('🧹 Iniciando eliminación de todos los registros');

      console.log('📊 Total registros antes de eliminar:', gastos.length);

      

      const confirmMessage = `⚠️ ¿Estás seguro de que quieres eliminar TODOS los ${gastos.length} registros?\n\n` +

        `Esta acción eliminará permanentemente todos los datos de:\n` +

        `• Ingresos y gastos\n` +

        `• Todas las fechas y categorías\n` +

        `• Todo el historial financiero\n\n` +

        `Esta acción no se puede deshacer.`;

      

      if (confirm(confirmMessage)) {

        console.log('✅ Usuario confirmó eliminación total');

        

        // Guardar snapshot antes de eliminar

        saveRecoverySnapshot("delete-all");

        

        // Eliminar todos los registros

        const deletedCount = gastos.length;

        gastos.length = 0;

        

        console.log('🗑️ Registros eliminados:', deletedCount);

        

        // Guardar y actualizar todos los componentes

        console.log('💾 Guardando datos y actualizando componentes...');

        

        // 1. Guardar en localStorage/Firebase

        saveData();

        console.log('✅ Datos guardados');

        

        // 2. Actualizar tabla principal

        render();

        console.log('✅ Tabla actualizada');

        

        // 3. Actualizar almanaque

        renderAlmanaque();

        console.log('✅ Almanaque actualizado');

        

        // 4. Actualizar dashboard si existe

        if (typeof updateDashboard === 'function') {

          updateDashboard();

          console.log('✅ Dashboard actualizado');

        } else {

          console.log('ℹ️ Dashboard no disponible para actualizar');

        }

        

        // 5. Actualizar totales si existen

        if (typeof updateTotals === 'function') {

          updateTotals();

          console.log('✅ Totales actualizados');

        }

        

        console.log('📊 Total registros después de eliminar:', gastos.length);

        alert(`✅ Todos los ${deletedCount} registros han sido eliminados correctamente`);

      } else {

        console.log('❌ Usuario canceló eliminación total');

      }

      break;

    case 'gastos-mensual':

      showDateRangeDialog('gastos', 'mensual', gasto);

      break;

    case 'gastos-anual':

      showDateRangeDialog('gastos', 'anual', gasto);

      break;

    case 'ingresos-mensual':

      showDateRangeDialog('ingresos', 'mensual', gasto);

      break;

    case 'ingresos-anual':

      showDateRangeDialog('ingresos', 'anual', gasto);

      break;

    case 'gastos-diario':

      showDateRangeDialog('gastos', 'diario-hasta', gasto);

      break;

    case 'ingresos-diario':

      showDateRangeDialog('ingresos', 'diario-hasta', gasto);

      break;

    case 'gastos-anual-hasta':

      showDateRangeDialog('gastos', 'anual-hasta', gasto);

      break;

    case 'ingresos-anual-hasta':

      showDateRangeDialog('ingresos', 'anual-hasta', gasto);

      break;

    case 'editar':

      startEditingRecord(gasto);

      break;

  }

}



/* =========================================================

   🔴 1. AUTOCOMPLETAR MODAL CON LA FILA SELECCIONADA

   ========================================================= */



function showDeleteRangeDialog(referenceGasto = null) {

  const modal = document.createElement("div");

  modal.className = 'date-range-modal';

  modal.style.cssText = `

    position: fixed;

    top: 50%;

    left: 50%;

    transform: translate(-50%, -50%);

    background: white;

    border: 1px solid var(--card-border);

    border-radius: 12px;

    box-shadow: 0 10px 30px rgba(0,0,0,0.3);

    z-index: 10000;

    min-width: 400px;

    max-width: 500px;

    padding: 20px;

  `;



  modal.innerHTML = `

    <div class="modal-header">

      <h2>Eliminar desde y hasta</h2>

      <button class="modal-close">&times;</button>

    </div>

    <div class="modal-body">

      <div class="form-group">

        <label>Fecha y hora de inicio:</label>

        <input type="date" id="startDate" class="form-input" value="${referenceGasto?.fecha ? referenceGasto.fecha.slice(0, 10) : ''}" required>

      </div>

      <div class="form-group">

        <label>Fecha y hora de fin:</label>

        <input type="date" id="endDate" class="form-input" value="" required>

      </div>

      <div class="form-group">

        <label>Tipo:</label>

        <input type="text" id="filterTipo" class="form-input" value="${referenceGasto?.tipo || ''}">

      </div>

      <div class="form-group">

        <label>Nombre:</label>

        <input type="text" id="filterNombre" class="form-input" value="${referenceGasto?.nombre || ''}">

      </div>

      <div class="form-group">

        <label>Categoría:</label>

        <input type="text" id="filterCategory" class="form-input" value="${referenceGasto?.categoria || ''}">

      </div>

      <div class="form-group">

        <label>Descripción:</label>

        <input type="text" id="filterDescription" class="form-input" value="${referenceGasto?.descripcion || ''}">

      </div>

      <div class="form-group">

        <label>Precio/Total:</label>

        <input type="text" id="filterMonto" class="form-input" value="${referenceGasto?.cantidad || ''}">

      </div>

      <div class="alert-warning">

        <strong>⚠️ Advertencia:</strong> Esta acción eliminará permanentemente los registros seleccionados

      </div>

    </div>

    <div class="modal-footer">

      <button class="btn btn-secondary" id="cancelBtn">Cancelar</button>

      <button class="btn btn-danger" id="confirmDelete">Eliminar Registros</button>

    </div>

  `;



  // Añadir backdrop

  const backdrop = document.createElement('div');

  backdrop.className = 'modal-backdrop';

  backdrop.style.cssText = `

    position: fixed;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    background: rgba(0,0,0,0.5);

    z-index: 9999;

  `;



  document.body.appendChild(backdrop);

  document.body.appendChild(modal);



  // Event listeners

  const closeHandler = () => {

    modal.remove();

    backdrop.remove();

  };



  modal.querySelector('.modal-close').addEventListener('click', closeHandler);

  modal.querySelector('#cancelBtn').addEventListener('click', closeHandler);



  modal.querySelector("#confirmDelete").onclick = () => {

    executeDeleteRange(modal, referenceGasto);

  };



  backdrop.addEventListener('click', closeHandler);

  modal.addEventListener('click', (e) => e.stopPropagation());

}



/* =========================================================

   🔴 2. FUNCIÓN toISO (OBLIGATORIA)

   ========================================================= */



function toISO(fechaStr) {

  if (!fechaStr) {

    console.log('❌ toISO: fechaStr está vacío o nulo');

    return null;

  }



  console.log('🔍 toISO procesando:', fechaStr, 'tipo:', typeof fechaStr);



  // Si ya viene en formato YYYY-MM-DD o YYYY-MM-DDTHH:mm

  if (fechaStr.includes("-") && !fechaStr.includes("/")) {

    const iso = fechaStr.slice(0, 10);

    console.log('✅ toISO formato ISO detectado:', iso);

    return iso;

  }



  // Si viene en formato DD/MM/YYYY o DD/MM/YY

  if (fechaStr.includes("/")) {

    const parts = fechaStr.split("/");

    console.log('📋 toISO partes detectadas:', parts);

    

    if (parts.length !== 3) {

      console.log('❌ toISO: formato de fecha inválido (partes != 3)');

      return null;

    }



    let [d, m, y] = parts;

    

    // Convertir año de 2 dígitos a 4 dígitos

    if (y.length === 2) {

      y = "20" + y;

    }

    

    // Validar que sean números

    const dayNum = parseInt(d);

    const monthNum = parseInt(m);

    const yearNum = parseInt(y);

    

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {

      console.log('❌ toISO: valores no numéricos:', {d, m, y});

      return null;

    }

    

    // Validar rangos

    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900 || yearNum > 2100) {

      console.log('❌ toISO: valores fuera de rango:', {dayNum, monthNum, yearNum});

      return null;

    }

    

    const iso = `${yearNum}-${monthNum.toString().padStart(2, "0")}-${dayNum.toString().padStart(2, "0")}`;

    console.log('✅ toISO convertido a ISO:', iso);

    return iso;

  }



  console.log('❌ toISO: formato no reconocido');

  return null;

}



// 🔴 CORRECCIÓN 2: Función para extender rango hasta último día del mes

function extenderRangoHastaFinMes(fechaStr) {

  if (!fechaStr) {

    console.log('❌ extenderRangoHastaFinMes: fechaStr está vacío');

    return null;

  }

  

  console.log('🔍 extenderRangoHastaFinMes procesando:', fechaStr);

  

  const iso = toISO(fechaStr);

  if (!iso) {

    console.log('❌ extenderRangoHastaFinMes: toISO devolvió null');

    return null;

  }

  

  const [year, month] = iso.split('-');

  console.log('📅 Año y mes detectados:', {year, month});

  

  // Validar año y mes

  const yearNum = parseInt(year);

  const monthNum = parseInt(month);

  

  if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {

    console.log('❌ extenderRangoHastaFinMes: año o mes inválido:', {yearNum, monthNum});

    return iso; // Devolver ISO original si hay error

  }

  

  // Obtener último día del mes

  const ultimoDia = new Date(yearNum, monthNum, 0).getDate();

  console.log('📆 Último día del mes:', ultimoDia);

  

  const extendido = `${year}-${month.padStart(2, "0")}-${ultimoDia.toString().padStart(2, "0")}`;

  console.log('✅ Rango extendido hasta:', extendido);

  

  return extendido;

}



/* =========================================================

   🔴 3. ELIMINACIÓN BLINDADA (TIPO BANCO)

   ========================================================= */



function executeDeleteRange(modal, referenceGasto) {

  console.log('🚀 EJECUTANDO ELIMINACIÓN POR RANGO - MASTER AI DEBUG');

  console.log('📋 ReferenceGasto:', referenceGasto);

  

  // Obtener valores del modal

  const startDateInput = modal.querySelector('#startDate');

  const endDateInput = modal.querySelector('#endDate');

  const nombreInput = modal.querySelector('#filterNombre');

  const categoriaInput = modal.querySelector('#filterCategory');

  const montoInput = modal.querySelector('#filterMonto');

  

  console.log('🔍 ELEMENTOS DEL MODAL:');

  console.log('  startDateInput:', startDateInput);

  console.log('  endDateInput:', endDateInput);

  console.log('  nombreInput:', nombreInput);

  console.log('  categoriaInput:', categoriaInput);

  console.log('  montoInput:', montoInput);

  

  // Obtener valores

  const startValue = startDateInput ? startDateInput.value : '';

  const endValue = endDateInput ? endDateInput.value : '';

  const nombreValue = nombreInput ? nombreInput.value.trim() : '';

  const categoriaValue = categoriaInput ? categoriaInput.value.trim() : '';

  const montoValue = montoInput ? montoInput.value.trim() : '';

  

  console.log('📋 VALORES OBTENIDOS:');

  console.log('  startValue:', startValue);

  console.log('  endValue:', endValue);

  console.log('  nombreValue:', nombreValue);

  console.log('  categoriaValue:', categoriaValue);

  console.log('  montoValue:', montoValue);

  

  // Convertir fechas

  const startStr = toISO(startValue);

  const endStr = endValue ? extenderRangoHastaFinMes(endValue) : null;

  

  console.log('🔍 FECHAS CONVERTIDAS:');

  console.log('  startStr:', startStr);

  console.log('  endStr:', endStr);



  if (!startStr) {

    console.log('❌ ERROR: Fecha inicial obligatoria');

    alert("Fecha inicial obligatoria");

    return;

  }



  if (endStr && startStr > endStr) {

    console.log('❌ ERROR: Rango inválido');

    alert("Rango inválido");

    return;

  }



  console.log(`📊 Total registros antes de eliminar: ${gastos.length}`);



  let eliminados = 0;

  let procesados = 0;

  let registrosEnRango = 0;

  let coincidenciasParciales = 0;

  

  // 🔴 MASTER AI: Análisis detallado de cada registro

  gastos = gastos.filter(g => {

    procesados++;

    

    console.log(`\n🔍 PROCESANDO REGISTRO ${procesados}/${gastos.length}:`);

    console.log('  Registro completo:', g);

    

    if (!g.fecha) {

      console.log('❌ SIN FECHA - Manteniendo');

      return true;

    }



    const fecha = g.fecha.slice(0, 10);

    console.log(`  Fecha: ${fecha}`);

    

    // Verificar rango

    const enRango = endStr

      ? (fecha >= startStr && fecha <= endStr)

      : (fecha >= startStr);

      

    console.log(`  En rango [${startStr} - ${endStr || 'sin límite'}]: ${enRango}`);

    

    if (!enRango) {

      console.log('❌ FUERA DE RANGO - Manteniendo');

      return true;

    }

    

    registrosEnRango++;

    console.log(`✅ EN RANGO - Analizando filtros...`);



    // Normalizar valores del registro

    const gTipo = (g.tipo || '').toLowerCase().trim();

    const gNombre = (g.nombre || '').toLowerCase().trim();

    const gCategoria = (g.categoria || '').toLowerCase().trim();

    const gDescripcion = (g.descripcion || '').toLowerCase().trim();

    const gCantidad = String(g.cantidad || '').trim();

    

    // Normalizar valores de filtro

    const fTipo = '';

    const fNombre = nombreValue.toLowerCase();

    const fCategoria = categoriaValue.toLowerCase();

    const fDescripcion = '';

    const fMonto = montoValue.trim();

    

    console.log(`  Comparaciones:`);

    console.log(`    Tipo: "${gTipo}" vs "${fTipo}"`);

    console.log(`    Nombre: "${gNombre}" vs "${fNombre}"`);

    console.log(`    Categoría: "${gCategoria}" vs "${fCategoria}"`);

    console.log(`    Descripción: "${gDescripcion}" vs "${fDescripcion}"`);

    console.log(`    Cantidad: "${gCantidad}" vs "${fMonto}"`);

    

    // 🔴 MASTER AI: Comparaciones ultra-flexibles

    const coincideTipo = !fTipo || gTipo === fTipo;

    const coincideNombre = !fNombre || 

      gNombre === fNombre || 

      gNombre.includes(fNombre) || 

      fNombre.includes(gNombre);

    const coincideCategoria = !fCategoria || 

      gCategoria === fCategoria || 

      gCategoria.includes(fCategoria) || 

      fCategoria.includes(gCategoria);

    const coincideDescripcion = !fDescripcion || 

      gDescripcion.includes(fDescripcion) || 

      fDescripcion.includes(gDescripcion);

    

    // Comparación numérica flexible para montos

    let coincideMonto = !fMonto;

    if (fMonto) {

      const gNum = parseFloat(gCantidad);

      const fNum = parseFloat(fMonto);

      coincideMonto = !isNaN(gNum) && !isNaN(fNum) && Math.abs(gNum - fNum) < 0.01;

    }

    

    console.log(`  Resultados parciales:`);

    console.log(`    coincideTipo: ${coincideTipo}`);

    console.log(`    coincideNombre: ${coincideNombre}`);

    console.log(`    coincideCategoria: ${coincideCategoria}`);

    console.log(`    coincideDescripcion: ${coincideDescripcion}`);

    console.log(`    coincideMonto: ${coincideMonto}`);

    

    const coincide = coincideTipo && coincideNombre && coincideCategoria && coincideDescripcion && coincideMonto;

    

    // Verificar coincidencias parciales para diagnóstico

    if (gNombre.includes('quer') || gCategoria.includes('alq') || gCantidad.includes('250')) {

      coincidenciasParciales++;

      console.log(`🔍 COINCIDENCIA PARCIAL ENCONTRADA (total: ${coincidenciasParciales})`);

    }

    

    console.log(`  RESULTADO FINAL: ${coincide ? '🗑️ ELIMINAR' : '✅ MANTENER'}`);



    if (coincide && enRango) {

      eliminados++;

      console.log(`🗑️ ELIMINANDO registro ${eliminados}:`, {

        id: g.id,

        fecha: g.fecha,

        tipo: g.tipo,

        nombre: g.nombre,

        categoria: g.categoria,

        descripcion: g.descripcion,

        cantidad: g.cantidad

      });

      return false; // Eliminar

    }



    return true; // Mantener

  });



  console.log(`\n📊 RESULTADO FINAL DE ELIMINACIÓN:`);

  console.log(`  Registros procesados: ${procesados}`);

  console.log(`  Registros en rango: ${registrosEnRango}`);

  console.log(`  Coincidencias parciales: ${coincidenciasParciales}`);

  console.log(`  Registros eliminados: ${eliminados}`);

  console.log(`  Registros restantes: ${gastos.length}`);



  // 🔴 MASTER AI: Mensaje ultra-detallado

  if (eliminados === 0) {

    let mensaje = `⚠️ No se encontraron registros para eliminar.\n\n`;

    mensaje += `📊 ESTADÍSTICAS:\n`;

    mensaje += `• Total registros: ${procesados}\n`;

    mensaje += `• Registros en rango: ${registrosEnRango}\n`;

    mensaje += `• Coincidencias parciales: ${coincidenciasParciales}\n\n`;

    mensaje += `📋 PARÁMETROS:\n`;

    mensaje += `• Rango: ${startStr} hasta ${endStr || 'sin límite'}\n`;

    mensaje += `• Nombre: "${nombreValue}"\n`;

    mensaje += `• Categoría: "${categoriaValue}"\n`;

    mensaje += `• Monto: "${montoValue}"\n\n`;

    mensaje += `💡 DIAGNÓSTICO:\n`;

    

    if (registrosEnRango === 0) {

      mensaje += `• No hay registros en el rango de fechas\n`;

      mensaje += `• Revisa las fechas seleccionadas\n`;

    } else if (coincidenciasParciales > 0) {

      mensaje += `• Hay ${coincidenciasParciales} coincidencias parciales\n`;

      mensaje += `• Revisa la ortografía exacta de los filtros\n`;

      mensaje += `• Prueba con filtros más amplios\n`;

    } else {

      mensaje += `• No hay registros que coincidan parcialmente\n`;

      mensaje += `• Revisa que los datos existan realmente\n`;

    }

    

    mensaje += `\n🔍 Abre la consola (F12) para ver el análisis detallado`;

    

    console.log('❌ MOSTRANDO MENSAJE DE ERROR DETALLADO');

    alert(mensaje);

  } else {

    console.log('✅ ELIMINACIÓN EXITOSA');

    alert(`✅ Se eliminaron ${eliminados} registros correctamente.`);

    

    // 🔴 MASTER AI: Cerrar modal automáticamente

    setTimeout(() => {

      const modals = document.querySelectorAll('.date-range-modal');

      const backdrops = document.querySelectorAll('.modal-backdrop');

      modals.forEach(m => m.remove());

      backdrops.forEach(b => b.remove());

      console.log('🔄 Modal cerrado automáticamente');

    }, 100);

  }



  console.log('💾 Guardando datos y actualizando vistas...');

  saveData();

  render();

  renderAlmanaque();

  console.log('✅ Proceso de eliminación completado');

}



// 🔴 4. BLOQUEO TOTAL DE ELIMINACIÓN AL EDITAR (CRÍTICO)

// ========================================================= */



// La función commitChange ya está correctamente implementada sin render()

// Verificada en línea 5414-5426



function getDialogTitle(type, period) {

  const typeText = type === 'gastos' ? 'Gastos' : 'Ingresos';

  

  switch(period) {

    case 'mensual': return `💰 ${typeText} Mensuales`;

    case 'anual': return `📆 ${typeText} Anuales`;

    case 'diario-hasta': return `📅 ${typeText} cada día hasta`;

    case 'anual-hasta': return `🗓️ ${typeText} cada año hasta`;

    default: return `📊 ${typeText}`;

  }

}



function getEndDate(period, referenceDate) {

  const futureDate = new Date(referenceDate);

  

  switch(period) {

    case 'mensual':

      futureDate.setMonth(futureDate.getMonth() + 12); // 1 año

      break;

    case 'anual':

      futureDate.setFullYear(futureDate.getFullYear() + 5); // 5 años

      break;

    case 'diario-hasta':

      futureDate.setDate(futureDate.getDate() + 30); // 30 días

      break;

    case 'anual-hasta':

      futureDate.setFullYear(futureDate.getFullYear() + 10); // 10 años

      break;

    default:

      futureDate.setMonth(futureDate.getMonth() + 12);

  }

  

  return futureDate;

}



function getFrequencyLabel(period) {

  switch(period) {

    case 'mensual': return 'Día del mes';

    case 'anual': return 'Mes del año';

    case 'diario-hasta': return 'Cantidad por día';

    case 'anual-hasta': return 'Cantidad por año';

    default: return 'Cantidad';

  }

}



function getFrequencyField(period, referenceDate) {

  const nameField = `

    <div class="form-group">

      <label>Nombre:</label>

      <input type="text" id="recordName" class="form-input" value="${referenceDate.nombre || ''}" placeholder="Nombre del registro">

    </div>

  `;

  

  switch(period) {

    case 'mensual':

      return `

        ${nameField}

        <div class="form-group">

          <label>Día del mes:</label>

          <input type="number" id="dayOfMonth" class="form-input" value="${referenceDate.getDate()}" min="1" max="31">

          <small>Se generará un registro cada mes en este día</small>

        </div>

      `;

    case 'anual':

      return `

        ${nameField}

        <div class="form-group">

          <label>Mes del año:</label>

          <input type="number" id="monthOfYear" class="form-input" value="${referenceDate.getMonth() + 1}" min="1" max="12">

          <small>Se generará un registro cada año en este mes</small>

        </div>

      `;

    case 'diario-hasta':

      return `

        ${nameField}

        <div class="form-group">

          <label>Cantidad por día:</label>

          <input type="number" id="recordAmount" class="form-input" value="${referenceDate.cantidad || 0}" step="0.01" placeholder="0.00">

          <small>Se generará un registro cada día con esta cantidad</small>

        </div>

      `;

    case 'anual-hasta':

      return `

        ${nameField}

        <div class="form-group">

          <label>Cantidad por año:</label>

          <input type="number" id="recordAmount" class="form-input" value="${referenceDate.cantidad || 0}" step="0.01" placeholder="0.00">

          <small>Se generará un registro cada año con esta cantidad</small>

        </div>

      `;

    default:

      return `

        ${nameField}

        <div class="form-group">

          <label>Cantidad:</label>

          <input type="number" id="recordAmount" class="form-input" value="${referenceDate.cantidad || 0}" step="0.01" placeholder="0.00">

        </div>

      `;

  }

}



function showDateRangeDialog(type, period, referenceGasto) {

  const modal = document.createElement('div');

  modal.className = 'date-range-modal';

  modal.style.cssText = `

    position: fixed;

    top: 50%;

    left: 50%;

    transform: translate(-50%, -50%);

    background: white;

    border: 1px solid var(--card-border);

    border-radius: 12px;

    box-shadow: 0 10px 30px rgba(0,0,0,0.3);

    z-index: 10000;

    min-width: 400px;

    max-width: 500px;

  `;

  

  const referenceDate = new Date(referenceGasto.fecha);

  const today = new Date();

  

  modal.innerHTML = `

    <div class="modal-header">

      <h3>${getDialogTitle(type, period)}</h3>

      <button class="modal-close">&times;</button>

    </div>

    <div class="modal-body">

      <div class="form-group">

        <label>Fecha de inicio:</label>

        <input type="date" id="startDate" class="form-input" value="${referenceDate.toISOString().slice(0, 10)}" required>

      </div>

      <div class="form-group">

        <label>Fecha de fin:</label>

        <input type="date" id="endDate" class="form-input" value="${getEndDate(period, referenceDate).toISOString().slice(0, 10)}" required>

      </div>

      <div class="form-group">

        <label>Tipo:</label>

        <select id="recordType" class="form-input">

          <option value="${type === 'gastos' ? 'Gasto' : 'Ingreso'}">${type === 'gastos' ? 'Gasto' : 'Ingreso'}</option>

          <option value="${type === 'gastos' ? 'Ingreso' : 'Gasto'}">${type === 'gastos' ? 'Ingreso' : 'Gasto'}</option>

        </select>

      </div>

      <div class="form-group">

        <label>Categoría:</label>

        <input type="text" id="recordCategory" class="form-input" value="${referenceGasto.categoria || ''}" placeholder="Ej: Comida, Transporte">

      </div>

      <div class="form-group">

        <label>Descripción:</label>

        <input type="text" id="recordDescription" class="form-input" value="${referenceGasto.descripcion || ''}" placeholder="Descripción del registro">

      </div>

      <div class="form-group">

        <label>Cantidad:</label>

        <input type="number" id="recordAmount" class="form-input" value="${referenceGasto.cantidad || 0}" step="0.01" placeholder="0.00">

      </div>

      <div class="form-group">

        <label>Frecuencia (${period === 'mensual' ? 'días' : 'meses'}):</label>

        <input type="number" id="recordFrequency" class="form-input" value="${period === 'mensual' ? 30 : 12}" min="1" max="${period === 'mensual' ? 365 : 12}">

      </div>

    </div>

    <div class="modal-footer">

      <button class="btn btn-secondary" id="cancelBtn">Cancelar</button>

      <button class="btn btn-primary" id="generateBtn">Generar Registros</button>

    </div>

  `;

  

  // Añadir backdrop

  const backdrop = document.createElement('div');

  backdrop.className = 'modal-backdrop';

  backdrop.style.cssText = `

    position: fixed;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    background: rgba(0,0,0,0.5);

    z-index: 9999;

  `;

  

  // Event listeners

  modal.querySelector('.modal-close').addEventListener('click', () => {

    modal.remove();

    backdrop.remove();

  });

  

  modal.querySelector('#cancelBtn').addEventListener('click', () => {

    modal.remove();

    backdrop.remove();

  });

  

  modal.querySelector('#generateBtn').addEventListener('click', () => {

    const baseValues = {

      tipo: type === 'gastos' ? 'Gasto' : 'Ingreso',

      nombre: referenceGasto.nombre,

      descripcion: referenceGasto.descripcion,

      categoria: referenceGasto.categoria,

      cantidad: referenceGasto.cantidad,

      fecha: referenceGasto.fecha // 🔴 CORRECCIÓN: Agregar fecha para ingresos

    };

    

    console.log('🎯 Generando registros con:', { type, period, baseValues });

    

    switch(period) {

      case 'mensual':

        generateMonthlyUntilRecords(modal, baseValues);

        break;

      case 'anual':

        generateDateRangeRecords(modal);

        break;

      case 'diario-hasta':

        generateDailyUntilRecords(modal, baseValues);

        break;

      case 'anual-hasta':

        generateYearlyUntilRecords(modal, baseValues);

        break;

      default:

        console.warn('Período no reconocido:', period);

        generateDateRangeRecords(modal);

    }

    

    // 🔴 CORRECCIÓN 1: Cierre automático del modal y actualización inmediata

    saveData();

    render();

    renderAlmanaque();

    

    // Cerrar modal automáticamente

    setTimeout(() => {

      modal.remove();

      backdrop.remove();

    }, 200);

  });

  

  backdrop.addEventListener('click', () => {

    modal.remove();

    backdrop.remove();

  });

  

  document.body.appendChild(backdrop);

  document.body.appendChild(modal);

}



function generateDateRangeRecords(modal) {

  const startDate = new Date(modal.querySelector('#startDate').value);

  const endDate = new Date(modal.querySelector('#endDate').value);

  const recordType = modal.querySelector('#recordType').value;

  const recordCategory = modal.querySelector('#recordCategory').value;

  const recordDescription = modal.querySelector('#recordDescription').value;

  const recordAmount = parseFloat(modal.querySelector('#recordAmount').value) || 0;

  const recordFrequency = parseInt(modal.querySelector('#recordFrequency').value) || 30;

  

  if (!startDate || !endDate || startDate >= endDate) {

    alert('Por favor, selecciona un rango de fechas válido');

    return;

  }

  

  if (!recordCategory) {

    alert('Por favor, ingresa una categoría');

    return;

  }

  

  const records = [];

  let currentDate = new Date(startDate);

  

  while (currentDate <= endDate) {

    const record = {

      id: createUniqueId(),

      fecha: formatLocalDate(currentDate),

      tipo: recordType,

      categoria: recordCategory,

      descripcion: recordDescription || `${recordType} - ${recordCategory}`,

      cantidad: recordAmount

    };

    

    records.push(record);

    

    // Avanzar a la siguiente fecha según la frecuencia

    currentDate = new Date(currentDate);

    currentDate.setDate(currentDate.getDate() + recordFrequency);

  }

  

  // Agregar registros al array gastos

  gastos.push(...records);

  

  // Guardar y renderizar

  saveData();

  render();

  renderAlmanaque();

  

  // Cerrar modal

  document.querySelector('.modal-backdrop').remove();

  modal.remove();

  

  // Mostrar confirmación

  alert(`✅ Se generaron ${records.length} registros de ${recordType} desde ${startDate.toLocaleDateString()} hasta ${endDate.toLocaleDateString()}`);

  

  console.log(`📊 Generados ${records.length} registros:`, records);

}



/* =========================================================

   🔧 FORMATO SEGURO PARA MOSTRAR FECHA - MASTER AI

   ========================================================= */



function formatFechaSegura(value) {

  if (!value) return "";



  if (!value.includes("T")) return value;



  const [datePart, timePart] = value.split("T");

  const [y, m, d] = datePart.split("-");



  if (!y || !m || !d) return value;



  return `${d}/${m}/${y}${timePart && timePart !== "00:00" ? ", " + timePart : ""}`;

}



/* =========================================================

   🔧 PARSEO SEGURO (SOLO CUANDO CONFIRMA EDICIÓN) - MASTER AI

   ========================================================= */



function parseFechaSegura(raw) {

  if (!raw) return "";



  if (!raw.includes("/")) return raw;



  const [fechaPart, horaPart] = raw.split(",");



  if (!fechaPart) return raw;



  const partes = fechaPart.trim().split("/");



  if (partes.length !== 3) return raw;



  let [d, m, y] = partes;



  if (!d || !m || !y) return raw;



  const day = d.padStart(2, "0");

  const month = m.padStart(2, "0");

  const year = y.trim();



  const time = horaPart ? horaPart.trim() : "00:00";



  return `${year}-${month}-${day}T${time}`;

}



function createEditableCell(gasto, col, rowIndex, colIndex, totalRows, totalCols) {

  const td = document.createElement("td");

  

  // 🔴 COLUMNA "N" NO ES EDITABLE (control automático)

  if (col.key === "numero") {

    td.contentEditable = false;

    td.classList.add("non-editable");

    td.style.backgroundColor = "#f8f9fa";

    td.style.fontWeight = "bold";

    td.style.textAlign = "center";

    td.style.color = "#2c3e50";

  } else {

    td.contentEditable = true;

    td.classList.add("editable");

    if (col.type === "datetime") {

      td.classList.add("datetime-cell");

    }

  }

  

  td.tabIndex = 0;



  // 🔴 COLUMNA "N" - MOSTRAR ÍNDICE CORRELATIVO VISUAL

  if (col.key === "numero") {

    td.textContent = rowIndex + 1;

  } else {

    td.textContent = formatValue(gasto[col.key], col.type, col.key);

    

    // 🔴 RESALTADO DE BÚSQUEDA - resaltar coincidencias

    if (gasto.searchTerms && (col.key === 'nombre' || col.key === 'descripcion')) {

      const searchTerm = gasto.searchTerms[col.key] || '';

      if (searchTerm && String(gasto[col.key] || '').toLowerCase().includes(searchTerm.toLowerCase())) {

        td.classList.add('search-highlight');

      } else {

        td.classList.remove('search-highlight');

      }

    }

  }



  const isLastRow = rowIndex === totalRows - 1;

  const isLastCol = colIndex === totalCols - 1;



  // Función para aplicar feedback visual de celda editada

  const applyEditFeedback = () => {

    // Aplicar clase de feedback visual

    td.classList.add('cell-edited');

    

    // Remover feedback después de 1.5 segundos

    setTimeout(() => {

      td.classList.add('removing-feedback');

      setTimeout(() => {

        td.classList.remove('cell-edited', 'removing-feedback');

      }, 500);

    }, 1500);

  };



  // Función para mostrar indicador de guardado

  const showSaveIndicator = (isDatetime = false) => {

    // Eliminar indicadores existentes

    const existingIndicators = document.querySelectorAll('.save-indicator');

    existingIndicators.forEach(ind => ind.remove());



    // Crear nuevo indicador

    const indicator = document.createElement('div');

    indicator.className = `save-indicator ${isDatetime ? 'datetime' : 'success'}`;

    indicator.innerHTML = `<span class="icon">¡</span><span>Guardado</span>`;



    // Calcular posición relativa a la celda

    const rect = td.getBoundingClientRect();

    const tableRect = tablaBody.getBoundingClientRect();

    

    // Posicionar arriba de la celda

    const left = rect.left - tableRect.left + (rect.width / 2) - 30; // Centrar horizontalmente

    const top = rect.top - tableRect.top - 35; // Arriba de la celda



    indicator.style.left = `${left}px`;

    indicator.style.top = `${top}px`;



    // Añadir al contenedor de la tabla

    tablaBody.appendChild(indicator);



    // Animar entrada

    requestAnimationFrame(() => {

      indicator.classList.add('show');

    });



    // Remover después de 2 segundos

    setTimeout(() => {

      indicator.classList.add('hiding');

      setTimeout(() => {

        if (indicator.parentNode) {

          indicator.remove();

        }

      }, 200);

    }, 2000);

  };



  const commitChange = () => {

    // NO PERMITIR EDICIÓN EN COLUMNA "N"

    if (col.key === "numero") {

      return;

    }

    

    const raw = td.textContent.trim();

    let parsedValue;



    // SOLO INTERCEPTAR CAMPO FECHA - PARCHE QUIRÚRGICO

    if (col.key === "fecha") {

      parsedValue = parseFechaSegura(raw);



      // VALIDACIÓN SEGURA

      if (!parsedValue || !parsedValue.includes("-")) {

        console.warn("Fecha inválida, no se guarda");

        return;

      }



      if (gasto[col.key] === parsedValue) return;



      saveRecoverySnapshot("edit-cell");

      gasto[col.key] = parsedValue;

      saveData();



      // MOSTRAR FORMATO CORRECTO

      td.textContent = formatFechaSegura(parsedValue);

      

      // Aplicar feedback visual

      applyEditFeedback();

      

      // Mostrar indicador de guardado

      showSaveIndicator(true);

      return;

    }



    // RESTO DE CAMPOS NORMAL - SIN MODIFICACIONES

    parsedValue = parseValue(raw, col.type);



    if (gasto[col.key] === parsedValue) return;



    saveRecoverySnapshot("edit-cell");

    gasto[col.key] = parsedValue;

    saveData();



    // Aplicar feedback visual

    applyEditFeedback();

    

    // Mostrar indicador de guardado

    showSaveIndicator(false);



    // NO render()

  };



  td.addEventListener("blur", () => {

    commitChange();

  });



  td.addEventListener("keydown", e => {

    if (e.key === "Enter") {

      e.preventDefault();

      commitChange();

      if (isLastRow && isLastCol) {

        addEmptyRow();

      }

      return;

    }



    if (e.key === "Tab" && !e.shiftKey && isLastRow && isLastCol) {

      addEmptyRow();

      return;

    }



    // Permitir eliminar columnas cuando se está en el encabezado

    if (e.key === "Delete") {

      const th = td.closest("th");

      if (th && th.dataset.colKey) {

        const key = th.dataset.colKey;

        if (!columns.find(c => c.key === key)?.fixed) {

          removeColumn(key);

        }

      }

    }

  });



  return td;

}



form.addEventListener("submit", event => {

  event.preventDefault();



  const values = getFormValues();

  const requiredName = values["nombre"];

  const amount = Number(values["cantidad"]);



  if (!requiredName || isNaN(amount) || amount <= 0) {

    showFormFeedback("Completa al menos el nombre y una cantidad mayor que 0.", "warning");

    pendingAddMode = "single";

    updateAddActionOptions();

    return;

  }



  if (editingRowId != null) {

    const existingRow = gastos.find(row => row.id === editingRowId);

    if (existingRow) {

      saveRecoverySnapshot("edit-row");

      Object.assign(existingRow, normalizeRecord({

        ...existingRow,

        ...values,

        attachments: existingRow.attachments || [],

      }));

    }

    editingRowId = null;

    buildFormFields();

  } else {

    const result = addRowsFromMode(values, pendingAddMode || "single");

    if (!result.added) {

      showFormFeedback("Ese movimiento ya existe en ese periodo y no se volvió a agregar.", "warning");

      pendingAddMode = "single";

      updateAddActionOptions();

      return;

    }

  }



  render();

  clearForm();

});



btnAddColumn.addEventListener("click", () => {

  const label = newColumnInput.value.trim();

  if (!label) return;



  addColumn(label);

  newColumnInput.value = "";

  newColumnInput.focus();

});



newColumnInput.addEventListener("keydown", event => {

  if (event.key === "Enter") {

    event.preventDefault();

    btnAddColumn.click();

  }

});



btnAddRow.addEventListener("click", () => {

  addEmptyRow();

});



btnUndo.addEventListener("click", () => {

  if (!lastDeleted) return;



  const { row, index } = lastDeleted;

  const insertAt = Math.min(Math.max(index, 0), gastos.length);

  gastos.splice(insertAt, 0, row);

  lastDeleted = null;

  render();

  setUndoVisible(false);

});



if (btnRestore) {

  btnRestore.addEventListener("click", restoreLastSnapshot);

}



// Función para cargar datos desde Firebase al iniciar la app

async function cargarDatosDesdeFirebase() {

  try {

    // Verificar si Firebase está disponible

    if (typeof window.obtenerGastosDesdeFirebase !== 'function') {

      console.log("🔥 Firebase no disponible, usando localStorage");

      return false;

    }



    console.log("🔥 Verificando datos en Firebase...");

    

    // Obtener gastos desde Firebase

    const gastosFirebase = await window.obtenerGastosDesdeFirebase();

    

    if (gastosFirebase && gastosFirebase.length > 0) {

      console.log(`✅ Se encontraron ${gastosFirebase.length} gastos en Firebase`);

      

      // Solo usar datos de Firebase si hay más que los locales

      if (gastosFirebase.length > gastos.length) {

        console.log("🔄 Usando datos de Firebase (más recientes/complete)");

        

        // Convertir datos de Firebase al formato de la app

        const gastosConvertidos = gastosFirebase.map(gasto => {

          // Eliminar campos específicos de Firebase

          const { id, firebaseTimestamp, userId, sincronizado, ...gastoLimpio } = gasto;

          

          // Asegurar que tenga todos los campos necesarios

          return {

            ...gastoLimpio,

            id: gastoLimpio.id || id, // Usar el ID de Firebase si no tiene ID local

            firebaseId: id // Guardar referencia al ID de Firebase

          };

        });

        

        // Reemplazar datos locales

        gastos.length = 0; // Limpiar array actual

        gastos.push(...gastosConvertidos); // Cargar datos de Firebase

        

        // Guardar en localStorage como respaldo

        try {

          localStorage.setItem(STORAGE_KEY, JSON.stringify(gastos));

          console.log("💾 Datos de Firebase respaldados en localStorage");

        } catch (error) {

          console.warn("⚠️ No se pudo respaldar en localStorage:", error);

        }

        return true; // Indicar que se usaron datos de Firebase

      } else {

        console.log("📂 Manteniendo datos locales (más recientes/complete)");

        return false; // Indicar que se mantienen datos locales

      }

    } else {

      console.log("📂 No hay datos en Firebase, usando localStorage");

      return false;

    }

  } catch (error) {

    console.error("❌ Error cargando datos desde Firebase:", error);

    console.log("📂 Continuando con datos locales");

    return false;

  }

}



// FUNCIONES DEL SIDEBAR

function initializeSidebar() {

  // Configurar event listeners para los botones del sidebar

  if (sidebarBtnRegistro) {

    sidebarBtnRegistro.addEventListener("click", () => showPanel("entriesPanel"));

  }

  

  if (sidebarBtnAlmanaque) {

    sidebarBtnAlmanaque.addEventListener("click", () => showPanel("almanaquePanelSection"));

  }

  

  if (sidebarBtnDashboard) {

    sidebarBtnDashboard.addEventListener("click", () => showPanel("dashboardPanel"));

  }

  

  // Actualizar tema actual en el sidebar

  updateSidebarTheme();

}



function showPanel(panelId) {

  // Ocultar todos los paneles

  const panels = ["entriesPanel", "almanaquePanelSection", "dashboardPanel"];

  panels.forEach(id => {

    const panel = document.getElementById(id);

    if (panel) {

      panel.style.display = "none";

    }

  });

  

  // Mostrar solo el panel seleccionado

  const selectedPanel = document.getElementById(panelId);

  if (selectedPanel) {

    selectedPanel.style.display = "block";

  }

  

  // Actualizar estado de los botones del sidebar

  updateSidebarButtons(panelId);

  

  // Actualizar panel activo

  currentActivePanel = panelId;

  

  console.log(`🔄 Panel cambiado a: ${panelId}`);

}



function updateSidebarButtons(activePanelId) {

  const buttons = [

    { id: "sidebarBtnRegistro", panel: "entriesPanel" },

    { id: "sidebarBtnAlmanaque", panel: "almanaquePanelSection" },

    { id: "sidebarBtnDashboard", panel: "dashboardPanel" }

  ];

  

  buttons.forEach(({ id, panel }) => {

    const button = document.getElementById(id);

    if (button) {

      if (panel === activePanelId) {

        button.classList.add("active");

      } else {

        button.classList.remove("active");

      }

    }

  });

}



function updateSidebarTheme() {

  if (sidebarCurrentTheme) {

    sidebarCurrentTheme.textContent = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);

  }

}



// Función para inicializar el sidebar al cargar la app

function setupSidebarNavigation() {

  // Mostrar solo el panel inicial (Registro)

  showPanel("entriesPanel");

  

  // Inicializar los event listeners

  initializeSidebar();

}



async function initializeApp() {

  await initializePersistence();



  // TEMPORALMENTE DESACTIVADO - Firebase está vacío y borra datos locales

  // await cargarDatosDesdeFirebase();

  console.log("📂 Carga desde Firebase desactivada (usando solo localStorage)");



  if (!recoverySnapshot) {

    saveRecoverySnapshot("initial-load");

  }

  syncCustomColumnsWithSettings();



  buildFormFields();

  refreshDateFilterOptions();



  if (dashboardTheme) {

    dashboardTheme.value = settings.theme || "natural";

  }

  applyTheme(settings.theme);



  if (dashboardDate) {

    dashboardDate.value = new Date().toISOString().slice(0, 10);

  }



  applyTheme(currentTheme);

  populateAlmanaqueSelectors();

  renderAlmanaque();

  render();

  initializeDesktopShell();

  

  // Inicializar navegación del sidebar

  setupSidebarNavigation();

}



if (dashboardPeriod) {

  dashboardPeriod.addEventListener("change", updateDashboard);

}



if (dashboardDate) {

  dashboardDate.addEventListener("change", updateDashboard);

}



if (dashboardMetric) {

  dashboardMetric.addEventListener("change", updateDashboard);

}



if (dashboardTheme) {

  dashboardTheme.addEventListener("change", () => {

    settings.theme = dashboardTheme.value;

    saveSettings();

    applyTheme(settings.theme);

  });

}



if (headerThemeSelect) {

  headerThemeSelect.addEventListener("change", () => {

    settings.theme = headerThemeSelect.value;

    saveSettings();

    applyTheme(settings.theme);

  });

}



if (resetThemeBtn) {

  resetThemeBtn.addEventListener("click", () => {

    const defaultTheme = "natural";

    settings.theme = defaultTheme;

    saveSettings();

    applyTheme(defaultTheme);

    if (dashboardTheme) dashboardTheme.value = defaultTheme;

  });

}



if (headerResetTheme) {

  headerResetTheme.addEventListener("click", () => {

    const defaultTheme = "natural";

    settings.theme = defaultTheme;

    saveSettings();

    applyTheme(defaultTheme);

  });

}



if (dashboardPrev) {

  dashboardPrev.addEventListener("click", () => shiftDashboardDate(-1));

}



if (dashboardNext) {

  dashboardNext.addEventListener("click", () => shiftDashboardDate(1));

}



if (toggleDashboard) {

  toggleDashboard.addEventListener("click", () => togglePanel(dashboardBody, toggleDashboard));

}



if (btnExportDashboard) {

  btnExportDashboard.addEventListener("click", exportDashboardSummary);

}



// Función para obtener datos del período anterior

function getPreviousPeriodData(currentPeriod, currentDateInput) {

  if (!currentDateInput || !currentDateInput.value) return null;

  

  const currentDate = new Date(currentDateInput.value);

  let previousDate = new Date(currentDate);

  

  switch (currentPeriod) {

    case "day":

      previousDate.setDate(previousDate.getDate() - 1);

      break;

    case "month":

      previousDate.setMonth(previousDate.getMonth() - 1);

      break;

    case "year":

      previousDate.setFullYear(previousDate.getFullYear() - 1);

      break;

  }

  

  // Filtrar datos del período anterior

  const previousFiltered = getFilteredEntriesForPeriod(previousDate, currentPeriod);

  

  const prevIncome = previousFiltered.reduce((sum, g) => {

    return sum + (String(g.tipo).toLowerCase() === "ingreso" ? Number(g.cantidad) || 0 : 0);

  }, 0);

  

  const prevExpense = previousFiltered.reduce((sum, g) => {

    return sum + (String(g.tipo).toLowerCase() === "gasto" ? Number(g.cantidad) || 0 : 0);

  }, 0);

  

  return {

    income: prevIncome,

    expense: prevExpense,

    balance: prevIncome - prevExpense

  };

}



// Función para actualizar las tendencias

function updateTrends(currentIncome, currentExpense, currentBalance, previousData) {

  if (!previousData) {

    // Si no hay datos anteriores, mostrar tendencia neutra

    updateTrendElement(incomeTrend, 0);

    updateTrendElement(expenseTrend, 0);

    updateTrendElement(balanceTrend, 0);

    updateTrendElement(projectionTrend, 0);

    updateTrendElement(metricTrend, 0);

    return;

  }

  

  // Calcular porcentajes de cambio

  const incomeChange = previousData.income > 0 ? ((currentIncome - previousData.income) / previousData.income) * 100 : 0;

  const expenseChange = previousData.expense > 0 ? ((currentExpense - previousData.expense) / previousData.expense) * 100 : 0;

  const balanceChange = previousData.balance !== 0 ? ((currentBalance - previousData.balance) / Math.abs(previousData.balance)) * 100 : 0;

  

  // Actualizar elementos de tendencia

  updateTrendElement(incomeTrend, incomeChange);

  updateTrendElement(expenseTrend, expenseChange);

  updateTrendElement(balanceTrend, balanceChange);

  updateTrendElement(projectionTrend, balanceChange); // La proyección sigue la tendencia del balance

  updateTrendElement(metricTrend, balanceChange); // La métrica también sigue la tendencia del balance

}



// Función para actualizar un elemento de tendencia

function updateTrendElement(element, change) {

  if (!element) return;

  

  const sign = change >= 0 ? '+' : '';

  const text = `${sign}${change.toFixed(1)}%`;

  

  element.textContent = text;

  

  // Eliminar clases de tendencia existentes

  element.classList.remove('trend-positive', 'trend-negative', 'trend-neutral');

  

  // Agregar clase según el cambio

  if (Math.abs(change) < 0.1) {

    element.classList.add('trend-neutral');

  } else if (change >= 0) {

    element.classList.add('trend-positive');

  } else {

    element.classList.add('trend-negative');

  }

}



// Función para obtener entradas filtradas para un período específico

function getFilteredEntriesForPeriod(date, period) {

  let startDate = new Date(date);

  let endDate = new Date(date);

  

  switch (period) {

    case "day":

      startDate.setHours(0, 0, 0, 0);

      endDate.setHours(23, 59, 59, 999);

      break;

    case "month":

      startDate.setDate(1);

      endDate.setMonth(endDate.getMonth() + 1);

      endDate.setDate(0);

      break;

    case "year":

      startDate.setMonth(0, 1);

      endDate.setMonth(11, 31);

      break;

  }

  

  return gastos.filter(g => {

    const gastoDate = new Date(g.fecha);

    return gastoDate >= startDate && gastoDate <= endDate;

  });

}



// Función de notificación simple

function showNotification(message, type = "info") {

  const notification = document.createElement('div');

  notification.style.cssText = `

    position: fixed;

    top: 20px;

    right: 20px;

    padding: 12px 20px;

    border-radius: 8px;

    color: white;

    font-weight: 500;

    z-index: 10000;

    opacity: 0;

    transform: translateX(100%);

    transition: all 0.3s ease;

    max-width: 300px;

  `;

  

  // Colores según tipo

  const colors = {

    success: '#4caf50',

    error: '#f44336',

    warning: '#ff9800',

    info: '#2196f3'

  };

  

  notification.style.background = colors[type] || colors.info;

  notification.textContent = message;

  

  document.body.appendChild(notification);

  

  // Animación de entrada

  setTimeout(() => {

    notification.style.opacity = '1';

    notification.style.transform = 'translateX(0)';

  }, 100);

  

  // Remover después de 3 segundos

  setTimeout(() => {

    notification.style.opacity = '0';

    notification.style.transform = 'translateX(100%)';

    setTimeout(() => {

      if (notification.parentNode) {

        notification.parentNode.removeChild(notification);

      }

    }, 300);

  }, 3000);

}



if (btnRefreshDashboard) {

  btnRefreshDashboard.addEventListener("click", () => {

    // Refrescar datos del dashboard

    updateDashboard();

    // Mostrar notificación de actualización

    showNotification("Dashboard actualizado", "success");

  });

}



if (btnFullscreenDashboard) {

  btnFullscreenDashboard.addEventListener("click", () => {

    const dashboardPanel = document.getElementById("dashboardPanel");

    if (!dashboardPanel) return;

    

    if (!document.fullscreenElement) {

      // Entrar en pantalla completa

      dashboardPanel.requestFullscreen().then(() => {

        // Estilos para pantalla completa

        dashboardPanel.style.cssText = `

          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

          padding: 20px;

          border-radius: 0;

          width: 100vw;

          height: 100vh;

          display: flex;

          flex-direction: column;

          box-sizing: border-box;

        `;

        

        // Ajustar el layout para pantalla completa

        const dashboardLayout = dashboardPanel.querySelector('.dashboard-layout');

        if (dashboardLayout) {

          dashboardLayout.style.cssText = `

            height: calc(100vh - 180px);

            gap: 24px;

            padding: 0 24px;

          `;

        }

        

        // Ajustar el panel de controles

        const dashboardBody = dashboardPanel.querySelector('.panel-body');

        if (dashboardBody) {

          dashboardBody.style.cssText = `

            flex: 1;

            overflow: hidden;

          `;

        }

        

        btnFullscreenDashboard.textContent = "🗕 Salir pantalla completa";

        btnFullscreenDashboard.title = "Salir de pantalla completa";

        showNotification("Modo pantalla completa activado", "success");

        

        // Forzar redibujado del gráfico

        setTimeout(() => {

          if (typeof updateDashboard === 'function') {

            updateDashboard();

          }

        }, 100);

        

      }).catch(err => {

        console.error("Error al entrar en pantalla completa:", err);

        showNotification("No se pudo activar pantalla completa", "error");

      });

    } else {

      // Salir de pantalla completa

      document.exitFullscreen().then(() => {

        // Restaurar estilos originales

        dashboardPanel.style.cssText = '';

        

        // Restaurar layout original

        const dashboardLayout = dashboardPanel.querySelector('.dashboard-layout');

        if (dashboardLayout) {

          dashboardLayout.style.cssText = '';

        }

        

        // Restaurar panel de controles

        const dashboardBody = dashboardPanel.querySelector('.panel-body');

        if (dashboardBody) {

          dashboardBody.style.cssText = '';

        }

        

        btnFullscreenDashboard.textContent = "⛶ Pantalla completa";

        btnFullscreenDashboard.title = "Pantalla completa";

        showNotification("Modo pantalla completa desactivado", "info");

        

        // Forzar redibujado del gráfico

        setTimeout(() => {

          if (typeof updateDashboard === 'function') {

            updateDashboard();

          }

        }, 100);

        

      }).catch(err => {

        console.error("Error al salir de pantalla completa:", err);

      });

    }

  });

}



// Atajos de teclado globales

document.addEventListener("keydown", (e) => {

  // Control + Z: Deshacer

  if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {

    e.preventDefault();

    if (typeof undo === "function") {

      undo();

    }

  }

  

  // Control + Y o Control + Shift + Z: Rehacer

  if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {

    e.preventDefault();

    if (typeof redo === "function") {

      redo();

    }

  }

  

  // Control + S: Guardar

  if ((e.ctrlKey || e.metaKey) && e.key === "s") {

    e.preventDefault();

    if (typeof saveToStorage === "function") {

      saveToStorage();

    }

  }

  

  // Control + F: Buscar

  if ((e.ctrlKey || e.metaKey) && e.key === "f") {

    e.preventDefault();

    if (searchInput) {

      searchInput.focus();

      searchInput.select();

    }

  }

  

  // Control + N: Nuevo registro

  if ((e.ctrlKey || e.metaKey) && e.key === "n") {

    e.preventDefault();

    if (typeof addEntry === "function") {

      addEntry();

    }

  }

  

  // Control + Plus: Aumentar tamaño de letra

  if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "=" || e.key === "Add")) {

    e.preventDefault();

    changeFontSize(1);

  }

  

  // Control + Minus: Disminuir tamaño de letra

  if ((e.ctrlKey || e.metaKey) && (e.key === "-" || e.key === "Subtract")) {

    e.preventDefault();

    changeFontSize(-1);

  }

  

  // Control + 0: Restablecer tamaño de letra

  if ((e.ctrlKey || e.metaKey) && (e.key === "0" || e.key === "Numpad0")) {

    e.preventDefault();

    resetFontSize();

  }

  

  // Control + Rueda del mouse: Alternativa para zoom

  if (e.ctrlKey || e.metaKey) {

    if (e.deltaY !== undefined) {

      if (e.deltaY < 0) {

        e.preventDefault();

        changeFontSize(1);

      } else if (e.deltaY > 0) {

        e.preventDefault();

        changeFontSize(-1);

      }

    }

  }

  

  // Escape: Cerrar modales o cancelar

  if (e.key === "Escape") {

    e.preventDefault();

    // Cerrar cualquier modal o panel abierto

    const panels = document.querySelectorAll('.panel.active');

    panels.forEach(panel => {

      if (typeof panel.classList !== 'undefined') {

        panel.classList.remove('active');

      }

    });

  }

});



// Cargar tamaño de fuente guardado al iniciar

document.addEventListener('DOMContentLoaded', () => {

  const savedFontSize = localStorage.getItem('fontSize');

  if (savedFontSize) {

    document.documentElement.style.setProperty('font-size', savedFontSize + 'px', 'important');

    document.body.style.fontSize = savedFontSize + 'px';

  }

  

  // Detectar si estamos en Electron y configurar zoom adicional

  if (window.desktopApp) {

    // Escuchar eventos de zoom desde el main process

    window.desktopApp.onZoomChanged((zoomFactor) => {

      // Ajustar el font-size basado en el factor de zoom

      const baseSize = 16;

      const newSize = Math.round(baseSize * zoomFactor);

      const clampedSize = Math.max(12, Math.min(24, newSize));

      

      document.documentElement.style.setProperty('font-size', clampedSize + 'px', 'important');

      document.body.style.fontSize = clampedSize + 'px';

      

      // Guardar el tamaño preferido

      localStorage.setItem('fontSize', clampedSize);

      

      // Mostrar notificación

      showNotification(`🔍 Zoom: ${clampedSize}px (${Math.round(zoomFactor * 100)}%)`, 'success');

    });

  }

});



// Event listener específico para la rueda del mouse

document.addEventListener('wheel', (e) => {

  if (e.ctrlKey || e.metaKey) {

    e.preventDefault();

    if (e.deltaY < 0) {

      changeFontSize(1);

    } else if (e.deltaY > 0) {

      changeFontSize(-1);

    }

  }

}, { passive: false });



// Función para cambiar el tamaño de fuente

function changeFontSize(delta) {

  const root = document.documentElement;

  const currentSize = parseFloat(getComputedStyle(root).fontSize) || 16;

  const newSize = Math.max(12, Math.min(24, currentSize + delta));

  

  // Aplicar a todo el documento con mayor fuerza

  root.style.fontSize = newSize + 'px';

  root.style.setProperty('font-size', newSize + 'px', 'important');

  

  // Aplicar al body

  document.body.style.fontSize = newSize + 'px';

  document.body.style.setProperty('font-size', newSize + 'px', 'important');

  

  // Si estamos en Electron, también ajustar el zoom de la ventana

  if (window.desktopApp) {

    const zoomFactor = newSize / 16;

    window.desktopApp.setZoomFactor(zoomFactor).catch(() => {

      // Si falla, continuar con el zoom de fuente normal

    });

  }

  

  // Aplicar a todos los elementos principales

  const elementsToUpdate = [

    '.panel-header', '.panel-body', '.sidebar', '.main-content', 

    'table', 'button', 'input', 'select', 'textarea', '.card', 

    '.dashboard-card', '.btn', '.form-control', 'th', 'td',

    '.sidebar-title', '.sidebar-subtitle', '.card-title', '.card-value'

  ];

  

  elementsToUpdate.forEach(selector => {

    const elements = document.querySelectorAll(selector);

    elements.forEach(el => {

      el.style.fontSize = '';

      el.style.setProperty('font-size', 'inherit', 'important');

    });

  });

  

  // Guardar preferencia

  localStorage.setItem('fontSize', newSize);

  

  // Mostrar notificación más visible

  showNotification(`🔍 Zoom: ${Math.round(newSize)}px`, 'success');

  

  // Forzar reflow

  void document.body.offsetHeight;

}



// Función para restablecer el tamaño de fuente

function resetFontSize() {

  const root = document.documentElement;

  const defaultSize = 16;

  

  root.style.fontSize = defaultSize + 'px';

  root.style.setProperty('font-size', defaultSize + 'px', 'important');

  

  document.body.style.fontSize = defaultSize + 'px';

  document.body.style.setProperty('font-size', defaultSize + 'px', 'important');

  

  // Limpiar todos los elementos

  const allElements = document.querySelectorAll('*');

  allElements.forEach(el => {

    if (el.style.fontSize && el.style.fontSize !== '') {

      el.style.fontSize = '';

    }

  });

  

  localStorage.removeItem('fontSize');

  showNotification('🔍 Zoom restablecido a 16px', 'info');

  

  // Forzar reflow

  void document.body.offsetHeight;

}



// Atajos específicos para la tabla

document.addEventListener("keydown", (e) => {

  // Solo si estamos en la tabla

  if (!e.target.closest('#tabla-body')) return;

  

  // Control + D: Duplicar fila actual

  if ((e.ctrlKey || e.metaKey) && e.key === "d") {

    e.preventDefault();

    const row = e.target.closest('tr');

    if (row && typeof duplicateEntry === "function") {

      const index = Array.from(row.parentNode.children).indexOf(row);

      duplicateEntry(index);

    }

  }

  

  // Supr: Eliminar fila actual

  if (e.key === "Delete" && e.target.closest('tr')) {

    const row = e.target.closest('tr');

    if (row && typeof deleteEntry === "function") {

      const index = Array.from(row.parentNode.children).indexOf(row);

      deleteEntry(index);

    }

  }

});



if (toggleEntries) {

  toggleEntries.addEventListener("click", () => togglePanel(entriesBody, toggleEntries));

}



if (searchInput) {

  // Variables para control de debounce y foco

  let searchTimeout;

  let isUserTyping = false;

  let lastSearchValue = "";



  const runSearch = (immediate = false) => {

    const currentValue = searchInput.value.trim();

    

    // Solo ejecutar búsqueda si el valor cambió o es búsqueda inmediata

    if (immediate || currentValue !== lastSearchValue) {

      // Aplicar toLowerCase() internamente sin modificar el input

      tableFilters.search = normalizeText(currentValue);

      lastSearchValue = currentValue;

      

      // Evitar pérdida de foco durante la escritura

      if (!isUserTyping || immediate) {

        render();

      }

    }

  };



  // Manejo de teclas - Enter para búsqueda inmediata

  searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

      event.preventDefault();

      clearTimeout(searchTimeout);

      isUserTyping = false;

      runSearch(true); // Búsqueda inmediata

    }

  });



  // Evento input con debounce mejorado a 800ms

  searchInput.addEventListener("input", event => {

    const currentValue = event.target.value;

    isUserTyping = true;

    

    // Cancelar debounce anterior

    clearTimeout(searchTimeout);

    

    // Iniciar nuevo debounce

    searchTimeout = setTimeout(() => {

      isUserTyping = false;

      runSearch();

    }, 800); // Aumentado a 800ms para experiencia más fluida

  });



  // Evento blur como fallback

  searchInput.addEventListener("blur", event => {

    if (!isUserTyping) {

      clearTimeout(searchTimeout);

      runSearch();

    }

  });



  // Mantener compatibilidad con evento 'search' (clear button)

  searchInput.addEventListener("search", () => {

    clearTimeout(searchTimeout);

    isUserTyping = false;

    runSearch(true);

  });

}



if (searchButton) {

  searchButton.addEventListener("click", () => {

    const searchValue = searchInput ? searchInput.value.trim() : "";

    tableFilters.search = normalizeText(searchValue);

    render();

  });

}



if (filterDateModeButtons.length) {

  filterDateModeButtons.forEach(button => {

    button.addEventListener("click", () => {

      tableFilters.dateMode = button.dataset.mode || "all";

      if (["day", "month", "year"].includes(tableFilters.dateMode)) {

        if (!tableFilters.year) {

          tableFilters.year = filterYear?.value || "2026";

          if (filterYear) filterYear.value = tableFilters.year;

        }

      }

      if (tableFilters.dateMode === "all") {

        tableFilters.day = "";

        tableFilters.month = "";

        tableFilters.year = "";

        if (filterDay) filterDay.value = "";

        if (filterMonth) filterMonth.value = "";

        if (filterYear) filterYear.value = "";

      }

      if (tableFilters.dateMode === "day" && !tableFilters.month) {

        tableFilters.month = filterMonth?.value || "01";

        if (filterMonth) filterMonth.value = tableFilters.month;

      }

      refreshDateFilterOptions();

      updateDateFilterVisibility();

      render();

    });

  });

}



if (filterDay) {

  filterDay.addEventListener("change", () => {

    tableFilters.day = filterDay.value;

    render();

  });

}



if (filterMonth) {

  filterMonth.addEventListener("change", () => {

    tableFilters.month = filterMonth.value;

    if (!tableFilters.year && filterYear) {

      tableFilters.year = filterYear.value;

    }

    refreshDateFilterOptions();

    render();

  });

}



if (filterYear) {

  filterYear.addEventListener("change", () => {

    tableFilters.year = filterYear.value;

    refreshDateFilterOptions();

    render();

  });

}



if (clearFiltersBtn) {

  clearFiltersBtn.addEventListener("click", () => {

    tableFilters = { search: "", dateMode: "all", day: "", month: "", year: "", tipo: "", categoria: "" };

    if (searchInput) searchInput.value = "";

    if (filterDay) filterDay.value = "";

    if (filterMonth) filterMonth.value = "";

    if (filterYear) filterYear.value = "";

    refreshDateFilterOptions();

    updateDateFilterVisibility();

    render();

  });

}



if (almanaqueTypeFilter) {

  almanaqueTypeFilter.addEventListener("change", renderAlmanaque);

}



if (btnExport) {

  btnExport.addEventListener("click", exportData);

}



if (btnImport && importFile) {

  btnImport.addEventListener("click", () => showImportMenu());

  importFile.addEventListener("change", async event => {

    const files = Array.from(event.target.files || []);

    if (files.length) await importData(files);

    event.target.value = "";

  });

}



if (btnClear) {

  btnClear.addEventListener("click", () => {

    if (confirm("¿Borrar todos los registros almacenados? Esta acción no se puede deshacer.")) {

      saveRecoverySnapshot("clear-all");

      gastos = [];

      cancelEditing();

      render();

    }

  });

}



if (toggleAlmanaque) {

  toggleAlmanaque.addEventListener("click", () => togglePanel(almanaquePanel, toggleAlmanaque));

}



if (btnExportAlmanaque) {

  btnExportAlmanaque.addEventListener("click", showAlmanaqueExportMenu);

}



if (btnImportAlmanaque && importAlmanaqueFile) {

  btnImportAlmanaque.addEventListener("click", () => showAlmanaqueImportMenu());

  importAlmanaqueFile.addEventListener("change", async event => {

    const files = Array.from(event.target.files || []);

    if (files.length) await importData(files);

    event.target.value = "";

  });

}



if (clearDayViewBtn) {

  clearDayViewBtn.addEventListener("click", resetDayView);

}



// 🔴 MASTER AI: Botón Vaciar del Almanaque sincronizado con Registro de Contabilidad

if (btnClearAlmanaque) {

  btnClearAlmanaque.addEventListener("click", () => {

    if (confirm("¿Borrar todos los registros almacenados? Esta acción no se puede deshacer.")) {

      saveRecoverySnapshot("clear-all");

      gastos = [];

      cancelEditing();

      render();

      renderAlmanaque();

    }

  });

}



if (applySelectedDayBtn) {

  applySelectedDayBtn.addEventListener("click", applySelectedDay);

}



if (exportDayAttachmentsBtn) {

  exportDayAttachmentsBtn.addEventListener("click", exportDayAttachments);

}



if (selectedDayList) {

  selectedDayList.addEventListener("dragover", event => {

    event.preventDefault();

    selectedDayList.classList.add("almanaque-drop-active");

  });



  selectedDayList.addEventListener("dragleave", () => {

    selectedDayList.classList.remove("almanaque-drop-active");

  });



  selectedDayList.addEventListener("drop", event => {

    selectedDayList.classList.remove("almanaque-drop-active");

    handleAlmanaqueDrop(event);

  });

}



if (almanaqueViewDayBtn) {

  almanaqueViewDayBtn.addEventListener("click", () => {

    currentAlmanaqueSelectedDate = getSelectedAlmanaqueDate();

    if (selectedDayInput) selectedDayInput.value = currentAlmanaqueSelectedDate;

    renderAlmanaque();

  });

}



if (almanaqueAttachmentType && almanaqueAttachmentFile) {

  almanaqueAttachmentType.addEventListener("change", () => {

    const selectedDate = getSelectedAlmanaqueDate();

    if (!selectedDate) {

      alert("Selecciona primero una fecha en el almanaque.");

      return;

    }

    currentAlmanaqueSelectedDate = selectedDate;

    almanaqueAttachmentFile.click();

  });



  almanaqueAttachmentFile.addEventListener("change", async event => {

    const files = Array.from(event.target.files || []);

    if (!files.length) return;



    const attachmentType = almanaqueAttachmentType ? almanaqueAttachmentType.value : "Documento";

    const selectedDate = getSelectedAlmanaqueDate();

    if (!selectedDate) return;

    currentAlmanaqueSelectedDate = selectedDate;

    const [year, month, day] = selectedDate.split("-");

    const selectedDateTime = `${year}-${month}-${day}T12:00`;

    saveRecoverySnapshot("almanaque-import");



    for (const file of files) {

      const parsed = await parseRecordsFromFile(file, selectedDateTime);

      const records = (parsed.records || []).map(record => normalizeRecord({

        ...record,

        categoria: record.categoria || attachmentType,

        fecha: record.fecha || selectedDateTime,

      }));

      records.forEach(record => {

        gastos.push(record);

        

        // Sincronizar cada registro importado con Firebase

        if (typeof window.guardarGastoEnFirebase === 'function') {

          window.guardarGastoEnFirebase(record);

        }

      });

    }



    saveData();

    render();

    showDayMovements(Number(year), Number(month) - 1, Number(day));



    event.target.value = "";

  });

}



if (sortAmount) {

  sortAmount.addEventListener("change", () => {

    tableSort.amount = sortAmount.value;

    render();

  });

}



if (sortDate) {

  sortDate.addEventListener("change", () => {

    tableSort.date = sortDate.value;

    render();

  });

}



if (dashboardBackToTop) {

  dashboardBackToTop.addEventListener("click", () => {

    window.scrollTo({ top: 0, behavior: "smooth" });

  });

}



if (checkUpdatesBtn && window.desktopApp) {

  checkUpdatesBtn.addEventListener("click", async () => {

    setDesktopUpdateState("Buscando actualizaciones...", "checking");

    const result = await window.desktopApp.checkForUpdates();

    if (!result?.ok && result?.message) {

      setDesktopUpdateState(result.message, "error");

    }

  });

}



if (createShortcutBtn && window.desktopApp) {

  createShortcutBtn.addEventListener("click", async () => {

    const result = await window.desktopApp.createDesktopShortcut();

    if (result?.ok) {

      setDesktopUpdateState(result.message || "Acceso directo creado en el escritorio.", "idle");

      return;

    }



    setDesktopUpdateState(result?.message || "No se pudo crear el acceso directo.", "error");

  });

}



if (downloadUpdateBtn && window.desktopApp) {

  downloadUpdateBtn.addEventListener("click", async () => {

    setDesktopUpdateState("Descargando actualizacion...", "downloading");

    const result = await window.desktopApp.downloadUpdate();

    if (!result?.ok && result?.message) {

      setDesktopUpdateState(result.message, "error");

    }

  });

}



if (installUpdateBtn && window.desktopApp) {

  installUpdateBtn.addEventListener("click", async () => {

    setDesktopUpdateState("Cerrando la app para instalar la actualizacion...", "installing");

    const result = await window.desktopApp.installUpdate();

    if (!result?.ok && result?.message) {

      setDesktopUpdateState(result.message, "error");

    }

  });

}



if (almanaqueYear) {

  almanaqueYear.addEventListener("change", () => {

    refreshAlmanaqueDayOptions();

    renderAlmanaque();

  });

}



if (almanaqueMonth) {

  almanaqueMonth.addEventListener("change", () => {

    refreshAlmanaqueDayOptions();

    renderAlmanaque();

  });

}



if (almanaqueDay) {

  almanaqueDay.addEventListener("change", renderAlmanaque);

}



if (almanaqueViewMode) {

  almanaqueViewMode.addEventListener("change", renderAlmanaque);

}



initializeApp().catch(error => {

  console.error("No se pudo iniciar la app correctamente.", error);

  persistenceBlocked = true;

  buildFormFields();

  refreshDateFilterOptions();

  applyTheme(currentTheme);

  populateAlmanaqueSelectors();

  renderAlmanaque();

  render();

  initializeDesktopShell();

});



// LIMPIEZA DE DATOS EXISTENTES (EJECUTAR UNA VEZ)

gastos.forEach(g => {

  if (g.fecha && g.fecha.length === 10) {

    g.fecha = g.fecha + "T00:00";

  }

});



console.log("🔧 Sistema de eliminación por identidad activado");

console.log("📋 Ahora puedes eliminar registros específicos por categoría o descripción dentro de un rango");



// 🔴 FUNCIÓN DE DIAGNÓSTICO PARA VERIFICAR ORDEN CRONOLÓGICO

function diagnosticarOrdenCronologico() {

  console.log("🔍 === DIAGNÓSTICO DE ORDEN CRONOLÓGICO ===");

  

  // 1. Verificar orden cronológico

  let ordenCronologicoCorrecto = true;

  for (let i = 1; i < gastos.length; i++) {

    const fechaActual = new Date(gastos[i].fecha);

    const fechaAnterior = new Date(gastos[i-1].fecha);

    if (fechaActual < fechaAnterior) {

      ordenCronologicoCorrecto = false;

      console.log(`❌ Error cronológico en posición ${i}: ${gastos[i-1].fecha} → ${gastos[i].fecha}`);

      break;

    }

  }

  

  if (ordenCronologicoCorrecto) {

    console.log("✅ Orden cronológico correcto");

  }

  

  // 2. Verificar numeración correlativa

  let numeracionCorrelativa = true;

  for (let i = 0; i < gastos.length; i++) {

    if (gastos[i].numero !== i + 1) {

      numeracionCorrelativa = false;

      console.log(`❌ Error de numeración en posición ${i}: esperado ${i + 1}, encontrado ${gastos[i].numero}`);

      break;

    }

  }

  

  if (numeracionCorrelativa) {

    console.log("✅ Numeración correlativa correcta");

  }

  

  // 3. Mostrar primeros y últimos registros

  console.log("📋 Primeros 5 registros (orden cronológico):");

  gastos.slice(0, 5).forEach((gasto, index) => {

    console.log(`  ${gasto.numero}. ${gasto.fecha} - ${gasto.nombre} (${gasto.tipo})`);

  });

  

  if (gastos.length > 5) {

    console.log("📋 Últimos 5 registros (orden cronológico):");

    gastos.slice(-5).forEach((gasto, index) => {

      console.log(`  ${gasto.numero}. ${gasto.fecha} - ${gasto.nombre} (${gasto.tipo})`);

    });

  }

  

  // 4. Verificar consistencia entre orden cronológico y numeración

  let consistenciaPerfecta = true;

  for (let i = 0; i < gastos.length; i++) {

    if (gastos[i].numero !== i + 1) {

      consistenciaPerfecta = false;

      break;

    }

  }

  

  console.log(consistenciaPerfecta ? "✅ CONSISTENCIA PERFECTA: Orden cronológico = Numeración correlativa" : "❌ INCONSISTENCIA detectada");

  

  console.log("🔍 === FIN DEL DIAGNÓSTICO ===");

}



// Ejecutar diagnóstico después de cargar datos

setTimeout(() => {

  if (typeof gastos !== 'undefined' && gastos.length > 0) {

    diagnosticarOrdenCronologico();

  }

}, 2000);

