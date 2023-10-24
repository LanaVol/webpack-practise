const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  // режим розробки
  mode: "development",
  // вхідний файл, що вказує з якого місця webpack має почати
  entry: {
    main: "./index.js",
    analytics: "./analytics.js",
  },

  devServer: {
    static: "./dist",
    port: 4200,
  },
  // після збирання всі скрипти будуть зібрані і поміщені в даний файл(-и) за даною адресою
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name][ext]",
    clean: true,
  },
  resolve: {
    // формати файлів, які вказуються тут можна не конкретизувати в відповідних імпортах в файлах; якщо ж вказати путстий масив то для webpack формати файлів які він розуміє по замовчуванню "анулються"
    extensions: [".js", ".json", ".png"],
    // скорочення-шаблони для шляхів до файлів, що можуть спростити синтаксис імпортів файлів
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  // плагіни
  plugins: [
    new HTMLWebpackPlugin({
      // шлях до відповідного файлу html з контентом
      template: "./index.html",
    }),
    new MiniCssExtractPlugin(),

    // копіювання файлів з одного місця в інше
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
  ],

  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    // оптимізація (фінальної збірки) рішення підключення додаткових бібліотек і відсутність дублювання при імпортах (спільну частину коду бібліотеки буде поміщено в файл vendors в dist)
    splitChunks: {
      chunks: "all",
    },

    runtimeChunk: "single",
  },

  module: {
    // масив об'єктів-лоадерів
    rules: [
      {
        test: /\.s[ac]ss$/i,
        // use: ["style-loader", "css-loader"],
        use: [
          {
            // loader: "style-loader",
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
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
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              "...",
              {
                tag: "img",
                attribute: "data-src",
                type: "src",
              },
            ],
          },
        },
      },
    ],
  },
};
