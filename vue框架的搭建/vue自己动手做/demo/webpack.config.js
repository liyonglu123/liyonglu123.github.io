var path = require('path');
var webpack = require('webpack');
//  css 单独提取出来
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = {
    entry: {
        main: './main'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=1024'
        },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            }
        ]
    },
    // 热加载
    // devServer: {
    //     historyApiFallback: true,
    //     hot: true,
    //     inline: true,
    //     progress: true, //报错无法识别，删除后也能正常刷新
    // },
    plugins: [
        new ExtractTextPlugin("main.css")
        // new webpack.DefinePlugin({
        //     'process.env.NODE.ENV': "development"
        // }),
        // new webpack.HotModuleReplacementPlugin()
    ]
}
module.exports = config;