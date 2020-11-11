const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/user.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
};
