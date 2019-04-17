// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const isProd = process.env.NODE_ENV === "production";

module.exports = {
    productionSourceMap: false,
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
