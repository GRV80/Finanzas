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

const backgroundColorInput = document.getElementById("backgroundColor");
const backgroundUrlInput = document.getElementById("backgroundUrl");
const backgroundUrlApply = document.getElementById("backgroundUrlApply");
const backgroundFileBtn = document.getElementById("backgroundFileBtn");
const backgroundFileInput = document.getElementById("backgroundFile");
const backgroundClear = document.getElementById("backgroundClear");
const backgroundPreview = document.getElementById("backgroundPreview");

const entriesPanel = document.getElementById("entriesPanel");
const entriesBody = document.getElementById("entriesBody");
const toggleEntries = document.getElementById("toggleEntries");
const btnExport = document.getElementById("btnExport");
const btnImport = document.getElementById("btnImport");
const btnRestore = document.getElementById("btnRestore");
const btnClear = document.getElementById("btnClear");
const importFile = document.getElementById("importFile");

const almanaqueYear = document.getElementById("almanaqueYear");
const almanaqueMonth = document.getElementById("almanaqueMonth");
const almanaqueDay = document.getElementById("almanaqueDay");
const almanaqueViewMode = document.getElementById("almanaqueViewMode");
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

let dashboardChart = null;
let currentTheme = "blue";

const categories = [
  "General",
  "Ropa",
  "Zapatos",
  "Comida",
  "Ocio",
  "Teléfono",
  "Alquiler",
  "Deuda",
  "Transporte",
  "Salud",
  "Educación",
  "Hogar",
  "Trabajo",
  "Ingreso pagos",
  "Ganancias",
  "Intereses",
  "Otros ingresos",
];

const types = ["Gasto", "Ingreso"];

const baseColumns = [
  { key: "tipo", label: "Tipo", type: "select", fixed: true },
  { key: "nombre", label: "Nombre", type: "text", fixed: true },
  { key: "categoria", label: "Categoría", type: "select" },
  { key: "cantidad", label: "Cantidad", type: "number", fixed: true },
  { key: "descripcion", label: "Descripción", type: "text" },
  { key: "fecha", label: "Fecha / Hora", type: "datetime" },
];

const columns = baseColumns.map(col => ({ ...col }));
const almanaqueColumnKeys = ["tipo", "nombre", "categoria", "cantidad", "descripcion", "fecha"];

const STORAGE_KEY = "app_gastos_records";
const SETTINGS_KEY = "app_gastos_settings";
const RECOVERY_KEY = "app_gastos_recovery";

let gastos = [];
let focusAfterRender = null;
let lastDeleted = null;

let settings = {
  theme: "blue",
  backgroundColor: "",
  backgroundImage: "",
  customColumns: [],
};

let currentAlmanaqueSelectedDate = null;
let editingRowId = null;
let visibleRows = [];
let recoverySnapshot = null;
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
    updateStatus.textContent = mode === "idle" ? "" : message;
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
    meta.updatesEnabled ? "" : "Actualizaciones no configuradas.",
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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gastos));
  } catch {
    // ignore storage errors
  }
}

function normalizeRecord(record = {}) {
  const normalized = { ...record };

  if (!normalized.id) {
    normalized.id = Date.now() + Math.floor(Math.random() * 1000);
  }

  if (!Array.isArray(normalized.attachments)) {
    normalized.attachments = [];
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
  const reserved = new Set(["id", "attachments"]);

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
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      mergeCustomColumnsFromRecords(parsed);
      gastos = parsed.map(normalizeRecord);
    }
  } catch {
    // ignore parse errors
  }
}

function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore storage errors
  }
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
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      settings = { ...settings, ...parsed };
      restoreColumns(settings.customColumns);
    }
  } catch {
    // ignore parse errors
  }
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

function splitDateTimeLocal(dateTime) {
  if (!dateTime || typeof dateTime !== "string") return { date: "", time: "" };
  const [date = "", time = ""] = dateTime.split("T");
  return { date, time };
}

const themePalette = {
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
  dark: {
    background: "#04070a",
    primary: "#2f4454",
    primaryDark: "#19222a",
    cardBg: "#0f1317",
    panelBg: "#0c0f13",
    panelBorder: "#1c2229",
    tableBg: "#0b0f13",
    tableHeader: "#11171f",
    tableBorder: "#18212b",
    tableRowAlt: "rgba(255, 255, 255, 0.04)",
    text: "#eef2f5",
    muted: "#a6b2c0",
    chartBg: "rgba(255, 193, 7, 0.65)",
    chartBorder: "rgba(255, 193, 7, 1)",
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
    background: "#eef8ff",
    primary: "#1565c0",
    primaryDark: "#0d47a1",
    cardBg: "#e3f2fd",
    cardBorder: "#b8d6f0",
    text: "#0b2740",
    muted: "#45627f",
    chartBg: "rgba(21, 101, 192, 0.7)",
    chartBorder: "rgba(21, 101, 192, 1)",
  },
};

function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "";
}

function applyBackground() {
  if (settings.backgroundImage) {
    const safeUrl = String(settings.backgroundImage).replace(/"/g, "%22");
    document.body.style.backgroundColor = settings.backgroundColor || getCssVar("--background") || "#ffffff";
    document.body.style.backgroundImage = `url("${safeUrl}")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundAttachment = "fixed";
  } else if (settings.backgroundColor) {
    document.body.style.backgroundImage = "";
    document.body.style.backgroundSize = "";
    document.body.style.backgroundRepeat = "";
    document.body.style.backgroundPosition = "";
    document.body.style.backgroundAttachment = "";
    document.body.style.backgroundColor = settings.backgroundColor;
  } else {
    document.body.style.backgroundImage = "";
    document.body.style.backgroundSize = "";
    document.body.style.backgroundRepeat = "";
    document.body.style.backgroundPosition = "";
    document.body.style.backgroundAttachment = "";
    document.body.style.backgroundColor = getCssVar("--background") || "";
  }
}

function applyTheme(theme) {
  currentTheme = theme in themePalette ? theme : "blue";
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

  if (dashboardTheme && dashboardTheme.value !== currentTheme) {
    dashboardTheme.value = currentTheme;
  }
  if (headerThemeSelect && headerThemeSelect.value !== currentTheme) {
    headerThemeSelect.value = currentTheme;
  }

  applyBackground();

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
}

function togglePanel(panelBody, toggleButton) {
  if (!panelBody || !toggleButton) return;

  const isHidden = panelBody.classList.toggle("hidden");
  toggleButton.textContent = isHidden ? "Mostrar" : "Ocultar";
}

function exportData() {
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

  if (lines.length < 2) return [];

  const delimiter = lines[0].includes(";") ? ";" : lines[0].includes("\t") ? "\t" : ",";
  const headers = splitDelimitedLine(lines[0], delimiter).map(mapImportedKey);

  return lines.slice(1).map(line => {
    const values = splitDelimitedLine(line, delimiter);
    const record = {};
    headers.forEach((header, index) => {
      record[header] = values[index] ?? "";
    });
    if (!record.fecha) record.fecha = fallbackDate;
    return record;
  });
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`No se pudo leer ${file.name}`));
    reader.readAsDataURL(file);
  });
}

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
      gastos = replacePayload.records.map(normalizeRecord);
      if (appendedRecords.length) {
        appendedRecords.forEach(record => gastos.push(normalizeRecord(record)));
      }
    } else if (appendedRecords.length) {
      mergeCustomColumnsFromRecords(appendedRecords);
      appendedRecords.forEach(record => gastos.push(normalizeRecord(record)));
    } else {
      alert("No se pudieron importar registros desde los archivos seleccionados.");
      return;
    }

    syncCustomColumnsWithSettings();
    buildFormFields();
    saveData();
    render();
  } catch (error) {
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
  const filtered = gastos.filter(g => {
    const date = new Date(g.fecha);
    if (isNaN(date.getTime()) || date.getFullYear() !== year) return false;
    if (viewMode === "year") return true;
    if (date.getMonth() !== monthIndex) return false;
    if (viewMode === "month") return true;
    return String(date.getDate()).padStart(2, "0") === dayValue;
  });

  const totalIncome = filtered.reduce((sum, g) => sum + (String(g.tipo).toLowerCase() === "ingreso" ? Number(g.cantidad) || 0 : 0), 0);
  const totalExpense = filtered.reduce((sum, g) => sum + (String(g.tipo).toLowerCase() === "gasto" ? Number(g.cantidad) || 0 : 0), 0);

  return {
    year,
    monthIndex,
    dayValue,
    viewMode,
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

  const header = ["Tipo", "Nombre", "Categoria", "Cantidad", "Descripcion", "Fecha Hora"];
  const rows = summary.filtered
    .sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)))
    .map(record => [
      record.tipo || "",
      record.nombre || "",
      record.categoria || "",
      Number(record.cantidad || 0).toFixed(2),
      String(record.descripcion || "").replace(/\r?\n/g, " "),
      formatValue(record.fecha, "datetime"),
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
  for (let y = currentYear; y >= currentYear - 5; y--) {
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

  const filtered = [...summary.filtered].sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)));
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
        let value = formatValue(record[col.key], col.type);
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
    const label =
      summary.viewMode === "year"
        ? `Mostrando ${summary.filtered.length} movimientos del año ${summary.year}.`
        : summary.viewMode === "month"
          ? `Mostrando ${summary.filtered.length} movimientos de ${summary.monthName} ${summary.year}.`
          : `Mostrando ${summary.filtered.length} movimientos del día ${summary.dayValue}/${String(summary.monthIndex + 1).padStart(2, "0")}/${summary.year}.`;
    almanaqueSummary.textContent = label;
  }
  if (almanaqueIncome) almanaqueIncome.textContent = summary.totalIncome.toFixed(2);
  if (almanaqueExpense) almanaqueExpense.textContent = summary.totalExpense.toFixed(2);
  if (almanaqueTotal) almanaqueTotal.textContent = summary.balance.toFixed(2);
}

function buildFormFields() {
  form.innerHTML = "";
  renderEntryFormLabels();

  columns.forEach(col => {
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
    }

    form.appendChild(input);
  });

  const actionGroup = document.createElement("div");
  actionGroup.className = "entry-form-actions";

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.id = "btnAgregar";
  submitBtn.className = "entry-form-action entry-form-action-primary";
  submitBtn.textContent = editingRowId ? "Guardar cambios" : "Agregar";
  actionGroup.appendChild(submitBtn);

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.id = "btnCancelEdit";
  cancelBtn.textContent = "Cancelar edición";
  cancelBtn.className = "secondary-button entry-form-action";
  cancelBtn.hidden = editingRowId == null;
  cancelBtn.addEventListener("click", cancelEditing);
  actionGroup.appendChild(cancelBtn);

  form.appendChild(actionGroup);
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
}

function startEditingRecord(record) {
  if (!record) return;
  editingRowId = record.id;
  buildFormFields();
  fillForm(record);
  form.scrollIntoView({ behavior: "smooth", block: "center" });
  document.getElementById("nombre")?.focus();
}

function formatValue(value, type) {
  if (value == null || value === "" || Number.isNaN(value)) return "";

  if (type === "number") {
    return Number(value).toFixed(2);
  }

  if (type === "datetime") {
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

    const local = new Date(parsed.getTime() - parsed.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
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

    return matchesSearch && matchesDate && matchesType && matchesCategory;
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
      if (tableSort.date === "oldest" && aDate !== bDate) return aDate - bDate;
      if (tableSort.date === "newest" && aDate !== bDate) return bDate - aDate;
      if (tableSort.date === "current") {
        const now = Date.now();
        const aDiff = Math.abs(aDate - now);
        const bDiff = Math.abs(bDate - now);
        if (aDiff !== bDiff) return aDiff - bDiff;
      }
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
    for (let year = 2020; year <= 2027; year++) {
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

  dashboardIncome.textContent = totalIncome.toFixed(2);
  dashboardExpense.textContent = totalExpense.toFixed(2);
  dashboardBalance.textContent = balance.toFixed(2);

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
  }

  if (dashboardMetricTitle) dashboardMetricTitle.textContent = getMetricLabel(metric);
  if (dashboardMetricValue) {
    const metricText =
      metric === "count"
        ? String(metricTotal)
        : metric === "savings_rate"
          ? `${metricTotal.toFixed(2)} %`
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
  const palette = themePalette[currentTheme] || themePalette.blue;

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
  resetButton.type = "button";
  resetButton.className = "header-sort";
  resetButton.textContent = "Restablecer";
  resetButton.addEventListener("click", () => {
    tableFilters.tipo = "";
    tableFilters.categoria = "";
    tableSort.amount = "default";
    tableSort.date = "default";
    render();
  });
  actionsWrapper.appendChild(actionsLabel);
  actionsWrapper.appendChild(resetButton);
  actionsTh.appendChild(actionsWrapper);
  tr.appendChild(actionsTh);

  thead.appendChild(tr);
  return thead;
}

function addRow(values = {}) {
  saveRecoverySnapshot("add-row");
  lastDeleted = null;
  setUndoVisible(false);
  const row = { id: Date.now() };
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
  focusAfterRender = { row: gastos.length - 1, col: 0 };
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

  const totalIncome = gastos.reduce((sum, gasto) => {
    if (String(gasto.tipo).toLowerCase() === "ingreso") {
      return sum + (Number(gasto.cantidad) || 0);
    }
    return sum;
  }, 0);

  const totalExpense = gastos.reduce((sum, gasto) => {
    if (String(gasto.tipo).toLowerCase() === "gasto") {
      return sum + (Number(gasto.cantidad) || 0);
    }
    return sum;
  }, 0);

  const balance = totalIncome - totalExpense;

  document.getElementById("total-income").textContent = totalIncome.toFixed(2);
  document.getElementById("total-expense").textContent = totalExpense.toFixed(2);
  totalSpan.textContent = balance.toFixed(2);
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
  const index = gastos.findIndex(row => row.id === rowId);
  if (index === -1) return;

  saveRecoverySnapshot("delete-row");
  lastDeleted = { row: gastos[index], index };
  gastos.splice(index, 1);

  if (editingRowId === rowId) {
    cancelEditing();
  }

  render();
}

function createRowActionsCell(gasto) {
  const td = document.createElement("td");
  const wrapper = document.createElement("div");
  wrapper.className = "table-actions";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.textContent = "Editar";
  editBtn.className = "secondary-button";
  editBtn.addEventListener("click", () => startEditingRecord(gasto));

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "Eliminar";
  deleteBtn.className = "danger-button";
  deleteBtn.addEventListener("click", () => deleteRowById(gasto.id));

  wrapper.appendChild(editBtn);
  wrapper.appendChild(deleteBtn);
  td.appendChild(wrapper);
  return td;
}

function createEditableCell(gasto, col, rowIndex, colIndex, totalRows, totalCols) {
  const td = document.createElement("td");
  td.contentEditable = true;
  td.classList.add("editable");
  if (col.type === "datetime") {
    td.classList.add("datetime-cell");
  }
  td.tabIndex = 0;

  td.textContent = formatValue(gasto[col.key], col.type);

  const isLastRow = rowIndex === totalRows - 1;
  const isLastCol = colIndex === totalCols - 1;

  const commitChange = () => {
    const raw = td.textContent.trim();
    const parsedValue = parseValue(raw, col.type);
    if (gasto[col.key] === parsedValue) return;
    saveRecoverySnapshot("edit-cell");
    gasto[col.key] = parseValue(raw, col.type);
    render();
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
    addRow(values);
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


loadSettings();
loadData();
loadRecoverySnapshot();
if (!recoverySnapshot) {
  saveRecoverySnapshot("initial-load");
}
syncCustomColumnsWithSettings();

buildFormFields();
refreshDateFilterOptions();

// Apply stored theme/background settings
if (dashboardTheme) {
  dashboardTheme.value = settings.theme || "blue";
}
applyTheme(settings.theme);
if (backgroundColorInput) {
  backgroundColorInput.value = settings.backgroundColor || "";
}
if (backgroundUrlInput && settings.backgroundImage) {
  if (settings.backgroundImage.startsWith("http") || settings.backgroundImage.startsWith("data:")) {
    backgroundUrlInput.value = settings.backgroundImage;
  }
}

if (dashboardDate) {
  dashboardDate.value = new Date().toISOString().slice(0, 10);
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
    const defaultTheme = "blue";
    settings.theme = defaultTheme;
    saveSettings();
    applyTheme(defaultTheme);
    if (dashboardTheme) dashboardTheme.value = defaultTheme;
  });
}

if (headerResetTheme) {
  headerResetTheme.addEventListener("click", () => {
    const defaultTheme = "blue";
    settings.theme = defaultTheme;
    saveSettings();
    applyTheme(defaultTheme);
  });
}

if (backgroundColorInput) {
  backgroundColorInput.addEventListener("input", () => {
    settings.backgroundColor = backgroundColorInput.value;
    settings.backgroundImage = "";
    saveSettings();
    applyBackground();
  });
}

if (backgroundUrlApply && backgroundUrlInput) {
  const applyBackgroundUrl = () => {
    const url = backgroundUrlInput.value.trim();
    if (!url) return;
    settings.backgroundImage = url;
    settings.backgroundColor = "";
    saveSettings();
    applyBackground();
  };

  backgroundUrlApply.addEventListener("click", applyBackgroundUrl);

  backgroundUrlInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      applyBackgroundUrl();
    }
  });

  backgroundUrlInput.addEventListener("input", () => {
    // No preview: only update URL field, actual background applies on click "Aplicar".
  });
}

if (backgroundFileBtn && backgroundFileInput) {
  backgroundFileBtn.addEventListener("click", () => backgroundFileInput.click());
  backgroundFileInput.addEventListener("change", event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      settings.backgroundImage = dataUrl;
      settings.backgroundColor = "";
      saveSettings();
      applyBackground();
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  });
}

if (backgroundClear) {
  backgroundClear.addEventListener("click", () => {
    settings.backgroundColor = "";
    settings.backgroundImage = "";
    saveSettings();
    applyBackground();
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

if (toggleEntries) {
  toggleEntries.addEventListener("click", () => togglePanel(entriesBody, toggleEntries));
}

if (searchInput) {
  const runSearch = () => {
    tableFilters.search = normalizeText(searchInput.value.trim());
    render();
  };

  searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      runSearch();
    }
  });

  searchInput.addEventListener("search", runSearch);
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

if (btnExport) {
  btnExport.addEventListener("click", exportData);
}

if (btnImport && importFile) {
  btnImport.addEventListener("click", () => importFile.click());
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
  btnExportAlmanaque.addEventListener("click", exportAlmanaqueSummary);
}

if (clearDayViewBtn) {
  clearDayViewBtn.addEventListener("click", resetDayView);
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
      records.forEach(record => gastos.push(record));
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

applyTheme(currentTheme);
populateAlmanaqueSelectors();
renderAlmanaque();

render();
initializeDesktopShell();
