module.exports = {
  configureWebpack: config => {
    config.devtool = "source-map";
  },
  transpileDependencies: ["vuetify"]
};
