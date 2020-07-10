module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      preload: { ipcRenderer: "src/ipcRenderer.js" }
    }
  }
};
