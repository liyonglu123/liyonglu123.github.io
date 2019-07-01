const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    // 入口
    entry: {
        app: [path.join(__dirname, '../src/index.js')],
        // 提取公共代码
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    mode: 'development', // WARNING in configuration The 'mode' option has not been set. Set 'mode' option to 'development' or 'production' to enable defaults for this environment.
    // 输出 
    output: {
        path: path.join(__dirname, '../dist'),
        // filename: "bundle.js"
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, '../src')
        },
        // {
        //     test: /\.css$/,
        //     use: [require.resolve('style-loader'),
        //     {
        //         loader:  require.resolve('css-loader'),
        //         options: {
        //             modules: true,
        //             importLoaders: 1,
        //             minimize: true,
        //             localIdentName: '[local]--[hash:base64:5]'
        //         }
        //     },
        //     {
        //         loader: require.resolve('postcss-loader')
        //     }],
        // },
        {
            test: /\.css$/,
            use: [{loader: MiniCssExtractPlugin.loader}, {
                loader:'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[local]--[hash:base64:5]'
                }
            }, 'postcss-loader']
         },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({ // 压缩css
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        })
    ],
    resolve: {
        alias: {
            pages: path.join(__dirname, '../src/pages'),
            components: path.join(__dirname, '../src/components'),
            router: path.join(__dirname, '../src/router'),
            actions: path.join(__dirname, '../src/redux/actions'),
            reducers: path.join(__dirname, '../src/redux/reducers'),
            images: path.join(__dirname, '../src/images'),
        }
    },
    devtool: 'inline-source-map',
    // webpack-dev-server  解决跨域的问题
    devServer: {
        // contentBase: path.join(__dirname, '../dist'),
        compress: true, // gzip压缩
        host: '0.0.0.0', // 允许ip访问 
        hot: true, // 热更新
        historyApiFallback: true, // 解决启动后刷新404
        port: 8000 // 端口
    },
}