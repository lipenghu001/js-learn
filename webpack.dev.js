const {merge} = require('webpack-merge'); //1.加载工具
const common = require('./webpack.common.js'); //2.获取通用配置
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',//报错提醒
  devServer: { //自动编译
    // contentBase: './dist',
    port: 8080,
    open: true,
  }
})