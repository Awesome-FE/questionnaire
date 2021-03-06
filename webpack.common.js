const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const vuxLoader = require('vux-loader')

const config = {
  entry: {
    main: "./src/main"
  },
  externals: {
    BMap: "BMap"
  },
  output: {
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new CleanWebpackPlugin(["dist"])
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.sass$/,
        use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: ["vue-style-loader", "css-loader", "sass-loader"],
            sass: [
              "vue-style-loader",
              "css-loader",
              "sass-loader?indentedSyntax"
            ]
          },
          // other vue-loader options go here
	  cssModules: {
	  	localIdentName: '[path][name]---[local]---[hash:base64:5]',
		camelCase: true
	  }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  }
};

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

config.plugins.push(new BundleAnalyzerPlugin({ analyzerHost: '0.0.0.0' }));

module.exports = vuxLoader.merge(config, {
	  options: {},
	  plugins: [{
		      name: 'vux-ui'
	  }]
})
