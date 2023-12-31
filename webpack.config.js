const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

// process.env.NODE_ENV - це системна змінна, тепер isDev дозволяє визначити в якому режимі збірки ми знаходимось в конкретний момент
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };
  if (isProd) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};

const babelOptions = (preset) => {
  const options = {
    presets: ["@babel/preset-env"],
    plugins: [],
  };

  if (preset) {
    options.presets.push(preset);
  }

  return options;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  // режим розробки
  mode: "development",
  // вхідний файл, що вказує з якого місця webpack має почати
  entry: {
    main: "./index.jsx",
    analytics: "./analytics.ts",
  },

  devServer: {
    static: "./dist",
    port: 4200,
    hot: isDev,
  },

  // після збирання всі скрипти будуть зібрані і поміщені в даний файл(-и) за даною адресою
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name][ext]",
    clean: true,
  },

  resolve: {
    // формати файлів, які вебпак має розуміти по замовчуванню
    // формати файлів, які вказуються тут можна не конкретизувати в відповідних імпортах в файлах; якщо ж вказати пустий масив то для webpack формати файлів які він розуміє по замовчуванню "анулюються"
    extensions: [".js", ".json", ".png"],
    // скорочення-шаблони для шляхів до файлів, що можуть спростити синтаксис імпортів файлів
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },

  // ПЛАГІНИ
  plugins: [
    new HTMLWebpackPlugin({
      // шлях до відповідного файлу html з контентом
      template: "./index.html",
      // мініфікує html якщо режим збірки production
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),

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

  optimization: optimization(),

  devtool: "source-map",

  // ЛОАДЕРИ
  module: {
    // масив об'єктів-лоадерів
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
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

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions(),
        },
      },

      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-typescript"),
        },
      },

      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-react"),
        },
      },
    ],
  },
};
