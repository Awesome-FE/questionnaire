const path = require("path");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    devtool: "inline-source-map",
    output: {
        publicPath: '/dist/',
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css",
            allChunks: true
        })
    ],
    devServer: {
	disableHostCheck: true,
        proxy: {
            "/question": {
                // target: "http://119.23.217.88:8080",
                target: "http://192.168.0.113:80",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
});

