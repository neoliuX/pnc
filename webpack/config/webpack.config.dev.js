const helpers = require('./helpers')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const envdevfn = require('../../environment/dev.env')
const baseConfigFn = require('./webpack.config.base')
const utils = require('./utils')
const path = require('path')

module.exports = function (env) {
  const config = utils.getConfig(env)
  const webpackConfig = baseConfigFn(config)
  const envdev = envdevfn(config)
  webpackConfig.module.rules = [ ...webpackConfig.module.rules ]
  webpackConfig.devtool = 'source-map',
  
  webpackConfig.mode = 'development'
  webpackConfig.plugins = [...webpackConfig.plugins,
    new DefinePlugin(envdev)
  ]
  webpackConfig.devServer = {
    proxy: {
        "/api/*": {
            target: "http://l2l-test.boldseas.com",
            changeOrigin: true,
        },
        "/services/porsche/api/*": {
            target: "http://l2l-test.boldseas.com",
            changeOrigin: true,
        }
    },
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    // 静态目录配置， src，当前目录，sw目录，src/lib目录, 当前执行的目录
    contentBase: [
      'src', 'src/' + config.folder, 'src/' + config.folder.split('/')[0] + '/sw','src/lib', 'src/miniclient'
    ].concat(config.pathList.map(path => 'src/' + config.folder + '/' +path.fileName)),
    open: false,
    before: function(app) {
      app.get(/home\/login\.html/, function (req, res) {
        res.sendFile(path.join(__dirname, '../server/view/login.html'));
      })
      // 处理线上的html入口 跳转到本地html入口
      app.get(/(\w|-)+\/.+?\.html/, function(req, res) {
        res.sendFile(path.join(__dirname, '../server/view/jump.html'));
      });
    },
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      }
    }
  }

  return webpackConfig
}