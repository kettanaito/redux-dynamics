const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const package = JSON.parse(fs.readFileSync('./package.json'));

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: __dirname,
    filename: package.main,
    library: package.name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new BabelMinifyPlugin({
      removeDebugger: true,
      mangle: {
        topLevel: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: ['babel-loader', 'awesome-typescript-loader']
      },
    ]
  },
  externals: {
    immutable: "immutable"
  },
  resolve: {
    extensions: ['.ts']
  }
};
