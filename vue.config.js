module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: { preload: "src/preload.js" }
    }
  }
};
