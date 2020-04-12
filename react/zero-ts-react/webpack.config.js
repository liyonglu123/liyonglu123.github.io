const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
        // publicPath: "/dist/"
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'json' ],
        alias: {
            "src": path.resolve(__dirname, "src"),
            "components": path.resolve(__dirname, "src/components"),
        }
    },
    mode: 'development', // 设置mode 
    module: {
        rules:[
            // 处理js, jsx
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }
            },
            // 处理tsx
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // 处理css
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            // publicPath: './'
                        }
                    },
                    "css-loader"
                ]
            },
            // 处理scss文件
            {
                test: /\.scss$/,
                use: [
                    {
                        // fallback to style-loader in development
                    // process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        // publicPath: '../'
                        },
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
            // 图片资源
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                      name: 'images/[name].[ext]',
                      publicPath:'../'
                    }
                  }
                ]
            },
            // 图标字体
           {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                          limit: 8192,
                          name: 'fonts/[name].[ext]',
                          publicPath:'../'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "my react",
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        })
    ],
    devServer: {
        contentBase: "./dist",
        port: 8888
    },
    // 公共模块
    optimization: {
        splitChunks: {
            chunks: "all",// all async initial
            // minSize: 30000,
            // maxSize: 0,
            // minChunks: 1,
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // automaticNameDelimiter: "~",
            // name: true,
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    filename: 'commons/[name].bundle.js',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: -10 // 优先级
                },
                // commons: {
                //     name: "commons",
                //     filename: "commons[name].css",
                //     test: /[\\/]src[\\/]/,
                //     minSize: 1024,
                //     chunks: "all",
                //     priority: 5
                // }
            }
        }
    },
}

module.exports = config