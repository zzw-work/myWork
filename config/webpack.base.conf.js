const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isEnvProduction = process.env.NODE_ENV === "production";
const isEnvDevelopment = !isEnvProduction;
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    MiniCssExtractPlugin.loader, // 始终使用提取插件
    { loader: "css-loader", options: cssOptions },
    "postcss-loader",
  ];
  if (preProcessor) loaders.push(preProcessor);
  return loaders;
};
const resolvePath = (_path) => path.resolve(__dirname, _path);

const getStyleTypeLoader = (_pre) => {
  return [MiniCssExtractPlugin.loader, ..._pre];
};

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const baseConfig = {
  entry: resolvePath("../src/index.jsx"),
  output: {
    path: resolvePath("../dist"),
    filename: "static/js/[name].bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      src: resolvePath("../src"),
      DPUtils: resolvePath("../src/utils"),
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: "css-loader",
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]", // 自定义类名格式
              },
            },
          },
        ],
      },
      // {
      //   test: /.module.css$/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: {
      //           localIdentName: "[name]__[local]___[hash:base64:5]",
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.less$/,
        exclude: /node_modules/, // 排除node_modules目录
        use: [
          MiniCssExtractPlugin.loader, // 将css提取为独立的文件
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]", // 自定义类名格式
              }, // 如果需要使用CSS Modules，可以取消注释
            },
          },
          {
            loader: "less-loader",
            options: {
              additionalData: `@import "${"src/styles/glabel.less"}";`, // 全局引入
            },
          },
        ],
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: {
      //           localIdentName: "[name]__[local]--[hash:base64:5]", // 自定义类名格式
      //         },
      //         // additionalData: `@import "${"src/styles/glabel.less"}";`, // 全局引入
      //       },
      //     },
      //     "less-loader", // 需先安装less和less-loader
      //   ],
      // },
      // {
      //   test: lessRegex,
      //   exclude: lessModuleRegex,
      //   use: getStyleLoaders(
      //     {
      //       importLoaders: 3,
      //       sourceMap: isEnvProduction && shouldUseSourceMap,
      //     },
      //     "less-loader"
      //   ),
      //   sideEffects: true,
      // },
      // {
      //   test: lessModuleRegex,
      //   use: getStyleLoaders(
      //     {
      //       importLoaders: 3,
      //       sourceMap: isEnvProduction && shouldUseSourceMap,
      //       modules: { getLocalIdent: getCSSModuleLocalIdent },
      //     },
      //     "less-loader"
      //   ),
      // },
      {
        test: /\.(jsx|tsx)?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(jsx|tsx)?$/,
      //   use: [resolvePath("./loader/utils-loader.js")],
      //   exclude: /node_modules/,
      // },
      // {
      //   test: /\.tsx?$/, // 匹配TSX和TS文件
      //   use: [
      //     {
      //       loader: "ts-loader", // 使用ts-loader处理TSX和TS文件
      //     },
      //   ],
      //   exclude: /node_modules/,
      // },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      DPUtils: [resolvePath("../src/utils")],
    }),
    new HtmlWebpackPlugin({
      template: resolvePath("../public/index.html"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
  ],
};

module.exports = {
  baseConfig,
  getStyleTypeLoader,
  resolvePath,
};
