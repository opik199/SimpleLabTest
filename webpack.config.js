const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   entry: path.join(__dirname, "src", "index.js"),//'./main.js',
   output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js'
   },
   // devServer: {
      // inline: true,
      // port: 8001
   // },
   module: {
      rules: [
         {
            test: /.(js|jsx)$/,
            exclude: /node_modules/,//|bower_components)/,
            use: {
			  loader: "babel-loader"
            }
            // query: {
               // //presets: ['es2015', 'react']
			  // presets: ['@babel/preset-env']
            // }
         },
         {
            test: /\.(png|jpe?g|gif)$/i,
            use: {
			  loader: 'file-loader',
            }
         }
		 ,
         {
            test: /.(css|scss)$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         filename: "index.html",
         template: path.join(__dirname, "src", "index.html")
         //template: './index.html'
      }),
      new MiniCssExtractPlugin({
         filename: "[name].css",
         chunkFilename: "[id].css"
      })
   ]
}