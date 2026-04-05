const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktopApp", {
  getMeta: () => ipcRenderer.invoke("desktop:get-meta"),
  loadStore: () => ipcRenderer.invoke("storage:load"),
  saveStore: payload => ipcRenderer.invoke("storage:save", payload),
  createDesktopShortcut: () => ipcRenderer.invoke("desktop:create-shortcut"),
  checkForUpdates: () => ipcRenderer.invoke("updater:check"),
  downloadUpdate: () => ipcRenderer.invoke("updater:download"),
  installUpdate: () => ipcRenderer.invoke("updater:install"),
  onUpdaterEvent: callback => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on("updater:event", listener);
    return () => ipcRenderer.removeListener("updater:event", listener);
  },
  // Soporte para eventos de zoom
  onZoomChanged: callback => {
    const listener = (_event, zoomFactor) => callback(zoomFactor);
    ipcRenderer.on("zoom-changed", listener);
    return () => ipcRenderer.removeListener("zoom-changed", listener);
  },
  setZoomFactor: (factor) => ipcRenderer.invoke("zoom:set", factor),
  getZoomFactor: () => ipcRenderer.invoke("zoom:get"),
});
