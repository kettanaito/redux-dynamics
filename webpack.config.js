const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const package = JSON.parse(fs.readFileSync('./package.json'));

module.exports = {
  entry: path.resolve(__dirname, package.module),
  output: {
    path: __dirname,
    filename: package.main,
    library: package.name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
      comments: false,
      screw_ie8: true,
      compress: {
        drop_console: true,
        screw_ie8: true,
        warnings: false
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: ['babel-loader']
      },
    ]
  },
  externals: {
    immutable: "immutable"
  }
};
