const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  // режим розробки
  mode: "development",
  // вхідний файл, що вказує з якого місця webpack має почати
  entry: {
    main: "./index.js",
    analytics: "./analytics.js",
  },
  // після збирання всі скрипти будуть зібрані і поміщені в даний файл(-и) за даною адресою
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name][ext]",
  },
  // плагіни
  plugins: [
    new HTMLWebpackPlugin({
      // шлях до відповідного файлу html з контентом
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    // масив об'єктів-лоадерів
    rules: [
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
        // file-loader using with webpack version earlier then 5
        // use: [
        //   {
        //     loader: "file-loader",
        //     options: {
        //       name: "[name].[ext]",
        //       outputPath: "images",
        //     },
        //   },
        // ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
};
