# App Gastos Pro: desktop + auto-update

## Desarrollo

```powershell
npm install
npm run dev
```

## Instalador Windows con acceso directo

```powershell
npm run dist
```

El instalador `NSIS` crea el acceso directo de escritorio y el del menu Inicio automaticamente.

## Auto-update con GitHub Releases

Esta implementacion usa `electron-updater` con proveedor `github`.

Antes de publicar una version, define:

```powershell
$env:GH_OWNER="GRV80"
$env:GH_REPO="Finanzas"
```

Para construir la release local:

```powershell
npm run dist
```

Para construir y publicar en GitHub Releases:

```powershell
npm run dist:publish
```

Electron Builder sube automaticamente:

- el instalador `.exe`
- `latest.yml`
- el archivo `.blockmap`

Cada vez que aumentes la version en `package.json` y publiques una nueva release, la app instalada podra:

- buscar actualizaciones
- descargar la nueva version
- reiniciarse e instalarla

## Flujo recomendado

1. Cambia `version` en `package.json`.
2. Define `GH_OWNER` y `GH_REPO`.
3. Ejecuta `npm run dist:publish`.
4. Instala la primera version con el `.exe`.
5. Las siguientes versiones llegaran mediante auto-update.
