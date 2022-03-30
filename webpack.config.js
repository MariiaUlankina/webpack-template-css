const {resolve, join} = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output:{
       path: resolve(__dirname, 'build'), 
       filename: '[name].[fullhash].js',
        clean:true,
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[fullhash].css'
      })
    
    ],
      devServer:{
          port: 8080,
          static: {
              directory: join(__dirname, 'src')
          }
      },
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env'],
                plugins: ["@babel/plugin-transform-runtime"]
              }
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader",
            ],
          },
        ]
      }
}
