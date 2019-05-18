// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const isProd = process.env.NODE_ENV === 'production';
const path = require('path');

module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  devServer: {

    port: 4204,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:4000/',
        ws: true
      }
    }
  },
  chainWebpack: () => {
  },
  configureWebpack: config => {
    if (isProd) {
      // 为生产环境修改配置...
      config.mode = 'production';
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';
    }

    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
        alias: {
          vue$: 'vue/dist/vue.js',
          '@': path.resolve(__dirname, './src')
        }
      }
    });
  },
  productionSourceMap: false,

  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  }

  // configureWebpack: config => {
  //     if (isProd) {
  //         const plugins = [];
  //         plugins.push(
  //             new UglifyJsPlugin({
  //                 uglifyOptions: {
  //                     compress: {
  //                         warnings: false,
  //                         drop_console: true,
  //                         drop_debugger: false,
  //                         pure_funcs: ['console.log']//移除console
  //                     }
  //                 },
  //                 sourceMap: false,
  //                 parallel: true
  //             })
  //         );
  //         plugins.push(
  //             new CompressionWebpackPlugin({
  //                 filename: '[path].gz[query]',
  //                 algorithm: 'gzip',
  //                 test: productionGzipExtensions,
  //                 threshold: 10240,
  //                 minRatio: 0.8
  //             })
  //         );
  //         config.plugins = [
  //             ...config.plugins,
  //             ...plugins
  //         ];
  //     }
  // }
};
