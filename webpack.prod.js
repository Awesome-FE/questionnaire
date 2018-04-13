const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, './dist/dist'),
    publicPath: "./dist/",
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].chunk.js"
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].[hash].css",
      allChunks: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      title: "中电友普云",
      favicon: "./src/favicon.ico",
      filename: "../index.html",
      template: "./src/template/index.html",
      inject: false
    })
  ]
});
