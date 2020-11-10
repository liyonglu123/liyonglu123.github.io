const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.md",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        exclude: /node_modules/,
        loader: path.resolve("./loader/index.js"), // 使用本地的 ./loader/index.js 作为 loader
      },
    ],
  },
};
