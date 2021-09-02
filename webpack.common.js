const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//注意引入写法
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    main:'./index.js'
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'js练习',
      template: './template/index.html'
    })
  ],
  output:{
    filename:'[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
};