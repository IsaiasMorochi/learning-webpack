const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    // Entry nos permite decir el punto de entrada de nuestra aplicación
    entry: './src/index.js',
    // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
    output: {
        // path es donde estará la carpeta donde se guardará los archivos
        // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
        path: path.resolve(__dirname, 'dist'),
        // filename le pone el nombre al archivo final
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
        extensions: ['.js', '.mjs']
    },
    module: {
        rules: [
          {
            // Test declara que extensión de archivos aplicara el loader
            test: /\.m?js$/,
            // Use es un arreglo u objeto donde dices que loader aplicaras
            use: {
              loader: "babel-loader"
            },
            // Exclude permite omitir archivos o carpetas especificas
            exclude: /node_modules/
          },
          {
            test: /\.css|styl$/i,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "stylus-loader"
            ],
          },
          {
            test: /\.png/,
            type: "asset/resource",
          },
          {
            test: /\.(woff|woff2)$/,
            use: {
              loader: "url-loader",
              options: {
                // limit => limite de tamaño
                limit: 10000,
                // Mimetype => tipo de dato
                mimetype: "application/font-woff",
                // name => nombre de salida
                name: "[name].[contenthash].[ext]",
                // outputPath => donde se va a guardar en la carpeta final
                outputPath: "./assets/fonts/",
                publicPath: "./assets/fonts/",
                esModule: false,
              }
            }
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
          filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
          patterns: [
            {
              from : path.resolve(__dirname, 'src', 'assets/images'),
              to: "assets/images"
            }
          ]
        }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin(),
      ]
    }
}