const path = require("path")
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseConfigFn = require('./webpack.base.js')

const port = 3000

module.exports = function (env) {
  const baseConfig = baseConfigFn(env)
  // return
  baseConfig.devServer = {
    // 设置目录结构
    contentBase: path.resolve(__dirname, '../dist'),
    // 服务器访问，可通过ip或localhost
    host: 'localhost',
    // 服务器压缩是否开启
    compress:true,
    // 配置服务器端口
    port: 3000
  }
  return baseConfig
}