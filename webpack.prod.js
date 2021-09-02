const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool:'source-map', //使用source-map
  plugins:[
    new UglifyJSPlugin({sourceMap:true}), //打开source-map
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
})