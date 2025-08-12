const { merge } = require("webpack-merge");
const { baseConfig } = require("./webpack.base.conf");

module.exports = merge(baseConfig, {
  devtool: "cheap-source-map",
  mode: "development",
  devServer: {
    host: "127.0.0.1",
    hot: true,
    port: 8010,
    open: true,
    historyApiFallback: true,
  },
});
