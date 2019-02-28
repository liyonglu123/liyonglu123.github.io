var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack');
var glob = require('glob');
var env = process.env.NODE_ENV
    // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
    // various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env !== 'development' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd
const vuxLoader = require('vux-loader')
var entries = utils.getEntry(['./src/module/**/*.js']); // 获得入口js文件
var chunks = Object.keys(entries);
console.log(chunks);

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
const webpackConfig = {
        entry: entries,
        output: {
            path: config.build.assetsRoot,
            filename: '[name].js',
            publicPath: process.env.NODE_ENV !== 'development' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                'src': path.resolve(__dirname, '../src'),
                'assets': path.resolve(__dirname, '../src/assets'),
                'components': path.resolve(__dirname, '../src/components'),
                'views': path.resolve(__dirname, '../src/views'),
                'styles': path.resolve(__dirname, '../src/styles'),
                'api': path.resolve(__dirname, '../src/api'),
                'utils': path.resolve(__dirname, '../src/utils'),
                'store': path.resolve(__dirname, '../src/store'),
                'router': path.resolve(__dirname, '../src/router'),
                'mock': path.resolve(__dirname, '../src/mock'),
                'vendor': path.resolve(__dirname, '../src/vendor'),
                'static': path.resolve(__dirname, '../static'),
                'module': path.resolve(__dirname, '../src/module'),
                'config': path.resolve(__dirname, '../config')
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                jquery: "jquery",
                "window.jQuery": "jquery"
            })
        ],
        module: {
            rules: [
                //{
                //  test: /\.(js|vue)$/,
                //  loader: 'eslint-loader',
                //  enforce: 'pre',
                //  include: [resolve('src'), resolve('test')],
                //  options: {
                //    formatter: require('eslint-friendly-formatter')
                //  }
                //},
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: vueLoaderConfig
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: [resolve('src'), resolve('test')]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('img/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('media/[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                    }
                }
            ]
        },
        //   vue: {
        //     loaders: utils.cssLoaders({
        //       sourceMap: useCssSourceMap
        //     }),
        //     postcss: [
        //       require('autoprefixer')({
        //         browsers: ['last 2 versions']
        //       })
        //     ]
        //   }
    } // 原来的 module.exports 代码赋值给变量 webpackConfig
module.exports = vuxLoader.merge(webpackConfig, {
    plugins: ['vux-ui']
})