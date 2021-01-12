const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 載入 html-webpack-plugin (第一步)
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/[name].[hash].js",
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
