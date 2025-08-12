const { merge } = require("webpack-merge");
const {
  baseConfig,
  getStyleTypeLoader,
  resolvePath,
} = require("./webpack.base.conf");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      //压缩css
      new CssMinimizerPlugin({
        test: /\.css$/i,
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
});
