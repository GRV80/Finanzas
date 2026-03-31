const fs = require("fs");
const path = require("path");

const APP_NAME = "app-gastos-desktop";
const LEVELDB_DIR = path.join(process.env.APPDATA || "", APP_NAME, "Local Storage", "leveldb");
const OUTPUT_DIR = path.join(process.cwd(), "recovery");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "leveldb-snippets.txt");
const TARGET_KEYS = ["app_gastos_records", "app_gastos_recovery", "app_gastos_settings"];

function normalizeSnippet(value) {
  return value
    .replace(/[^\x20-\x7E\u00A0-\u017F]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function collectCandidates(text) {
  const candidates = new Set();
  const regex =
    /"nombre":"([^"]{1,80})".{0,220}?"cantidad":"?([0-9]+(?:\.[0-9]+)?)"?/g;

  let match = regex.exec(text);
  while (match) {
    candidates.add(`- ${match[1]} | ${match[2]}`);
    match = regex.exec(text);
  }

  return [...candidates];
}

function main() {
  if (!fs.existsSync(LEVELDB_DIR)) {
    console.error(`No existe el directorio: ${LEVELDB_DIR}`);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = fs
    .readdirSync(LEVELDB_DIR)
    .filter(name => name.endsWith(".ldb") || name.endsWith(".log"))
    .sort();

  const sections = [];
  const candidateSummary = new Set();

  files.forEach(file => {
    const fullPath = path.join(LEVELDB_DIR, file);
    const raw = fs.readFileSync(fullPath, "latin1");

    TARGET_KEYS.forEach(key => {
      let index = raw.indexOf(key);

      while (index >= 0) {
        const snippet = raw.slice(Math.max(0, index - 120), index + 2500);
        const normalized = normalizeSnippet(snippet);

        collectCandidates(normalized).forEach(item => candidateSummary.add(item));

        sections.push([
          `FILE: ${file}`,
          `KEY: ${key}`,
          `INDEX: ${index}`,
          normalized,
        ].join("\n"));

        index = raw.indexOf(key, index + key.length);
      }
    });
  });

  const output = [
    "CANDIDATOS RECUPERABLES",
    ...(candidateSummary.size ? [...candidateSummary] : ["- No se pudieron extraer candidatos limpios"]),
    "",
    "FRAGMENTOS",
    ...sections,
    "",
  ].join("\n");

  fs.writeFileSync(OUTPUT_FILE, output, "utf8");
  console.log(OUTPUT_FILE);
}

main();
