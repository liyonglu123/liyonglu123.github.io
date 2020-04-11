const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack")
module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",
    filename: 'js/app.js'
  },
  devServer: {
    //  contentBase: './dist'
    port: 9000
  },
  module: {
    rules: [
     // react
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // css
      {
        test: /\.css$/,
        // use: [
        //         'style-loader',
        //         'css-loader'
        //     ]
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
        })
      },
      // sass
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      // 图片资源
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      // 字体图标
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: 'resource/[name].[ext]'
              }
          }
        ]
      }
    ]
  },
  plugins: [
      // 处理html文件
      new HtmlWebpackPlugin({
          template: "./src/index.html"
      }),
      // 独立css文件
      new ExtractTextPlugin("css/[name].css"),
      //  提取公共模块
      new webpack.optimize.CommonsChunkPlugin({
          name: "common",
          filename: 'js/base.js',
      })

  ]
};