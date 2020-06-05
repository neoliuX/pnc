const path = require("path")
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseConfigFn = require('./webpack.base.js')

const port = 8080

module.exports = function (env) {
  const baseConfig = baseConfigFn(env)
  return baseConfig
}