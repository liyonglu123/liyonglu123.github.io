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
  resolve: {
    alias: {
      pages: path.resolve(__dirname, 'src/pages'),
      components: path.resolve(__dirname, 'src/components'),
      utils: path.resolve(__dirname, 'src/utils'),
      service: path.resolve(__dirname, 'src/service'),
    }
  },
  devServer: {
    //  contentBase: './dist'
    port: 9000,
    inline: true,
    historyApiFallback: {
      index: "/dist/index.html"
    },
    // http://admintest.happymmall.com
    // 处理跨域请求的问题
    proxy: {
      "/manage" : {
        target: "http://admintest.happymmall.com",
        changeOrigin: true
      }
    }
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
          template: "./src/index.html",
          favicon: "./favicon.ico"
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