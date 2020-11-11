const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/user.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  optimization: {
    // 分割的更细
    splitChunks: {
      minSize: {
        javascript: 30000,
        style: 50000,
      },
    },
  },
};
