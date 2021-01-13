const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 載入 html-webpack-plugin (第一步)
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/[name].[hash].js",
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
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
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
              publicPath: "images/",
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
    // 創建實例 (第二步)
    new HtmlWebpackPlugin({
      // 配置 HTML 模板路徑與生成名稱 (第三步)
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};
