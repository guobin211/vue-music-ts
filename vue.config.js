module.exports = {
  chainWebpack: config => {
    config.plugin("fork-ts-checker").tap(([options]) => {
      return [
        {
          //一下几项都是推荐配置，async false使其可以在 页面上显示
          async: false,
          tslint: true,
          vue: true
        }
      ];
    });
    console.log(config)
  },
  devServer: {
    open: process.platform === "darwin",
    port: 4202,
    https: false,
    hotOnly: false
  }
};
