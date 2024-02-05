const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
   mode: "production",
   entry: {
      init: path.resolve(__dirname, "..", "src", "init.ts"),
      index: path.resolve(__dirname, "..", "src", "index.tsx"),
      popup: path.resolve(__dirname, "..", "src/components", "Popup.tsx"),
   },
   output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".ts", ".tsx", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      new CopyPlugin({
         patterns: [{from: ".", to: ".", context: "public", globOptions: { ignore: ['**/readme.png', '**/palette_9.png'] }}],
      }),
   ],
};