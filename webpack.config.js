const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 載入 html-webpack-plugin (第一步)
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const generateHtmlPlugin = (title) => {
  return new HtmlWebpackPlugin({
    title,
    filename: `${title}.html`,
    template: `./src/pages/${title}.html`,
  });
};

const populateHtmlPlugins = (pagesArray) => {
  res = [];
  pagesArray.forEach((page) => {
    res.push(generateHtmlPlugin(page));
  });
  return res;
};

const pages = populateHtmlPlugins(["login", "main"]);

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "static/js/[name].[contenthash].js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/"),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpe?g|svg)$/,
        use: [
          {
            // 直接配置 url-loader 就好，超過上限的資源會自動 fallback 給 file-loader
            loader: "url-loader",
            options: {
              name: "images/[name].[ext]",
              limit: 10000,
              esModule: false,
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[hash].css",
    }),
    new CopyPlugin({
      patterns: [{ from: "images", to: "static/images" }],
    }),
    // 創建實例 (第二步)
    ...pages,
  ],
};
