const path = require("path");

module.exports = {
  mode: "development",
  entry: "./test.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  node: {
    fs: false
  },
  target: "node"
};
