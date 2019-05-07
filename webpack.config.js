const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./front/index.js",
  mode: "development",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin()
  ]
};
