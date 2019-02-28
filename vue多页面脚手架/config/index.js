// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var sit_config = require('./sit.env')
var demo_config = require('./demo.env')
var prod_config = require('./prod.env')
var file_name = process.env.NODE_ENV === 'testing' ? 'sit' : process.env.NODE_ENV;
var loginPath = process.env.NODE_ENV === 'testing' ? sit_config.loginPath :
    process.env.NODE_ENV === 'demo' ? demo_config.loginPath :
    prod_config.loginPath
module.exports = {
    build: {
        sitEnv: sit_config,
        env: prod_config,
        demo: demo_config,
        loginPath: loginPath,
        index: path.resolve(__dirname, '../dist/' + file_name + '/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist/' + file_name),
        assetsSubDirectory: 'static',
        //这里是绝对路径，防止静态文件引用出错 
        assetsPublicPath: '/', //请根据自己路径配置更改
        staticPath: './static/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        staticPath: './static/',
        proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}