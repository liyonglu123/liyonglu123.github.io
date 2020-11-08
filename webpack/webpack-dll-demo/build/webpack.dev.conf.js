const path = require("path");
const webpack = require("webpack");
const { smart } = require("webpack-merge");
const webpackCommonConf = require("./webpack.base.conf.js");
const { srcPath, distPath } = require("./paths");
// const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

// 第一，引入 DllReferencePlugin
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin");

module.exports = smart(webpackCommonConf, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ["babel-loader"],
        include: srcPath,
        exclude: /node_modules/, // 第二，不要转换 node_modules 的代码
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify("development"),
    }),
    // 第三，告诉 Webpack 使用了哪些动态链接库
    new DllReferencePlugin({
      // 描述  动态链接库的文件内容
      manifest: require(path.join(distPath, "lodash.manifest.json")),
    }),
    // 自动注入到html中
    // new AddAssetHtmlPlugin({
    //   // dll 文件位置
    //   filepath: path.resolve(__dirname, "./dist/lodash/*.js"),
    //   // dll 引用路径
    //   publicPath: "/",
    //   // dll最终输出的目录
    //   // outputPath: "vendor",
    // }),
  ],
  devServer: {
    port: 8080,
    progress: true, // 显示打包的进度条
    contentBase: distPath, // 根目录
    open: true, // 自动打开浏览器
    compress: true, // 启动 gzip 压缩

    // 设置代理
    proxy: {
      // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
      "/api": "http://localhost:3000",

      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      "/api2": {
        target: "http://localhost:3000",
        pathRewrite: {
          "/api2": "",
        },
      },
    },
  },
});
