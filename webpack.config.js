const path = require("path");
var nodeExternals = require("webpack-node-externals");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
}
module.exports = {
  mode: "development",
  target: "node", // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/
      })
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      locators: srcPath("/config/locators"),
      classes: srcPath("/classes/"),
      config: srcPath("/config/"),
      pages: srcPath("/classes/pages/"),
      services: srcPath("/classes/services/"),
      interfaces: srcPath("interfaces/"),
      test: srcPath("/test/")
    }
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
