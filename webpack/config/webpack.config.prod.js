const helpers = require('./helpers')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const envonlinefn = require('../../environment/online.env')
const baseConfigFn = require('./webpack.config.base')
const utils = require('./utils')
const MoveFolder = require('../plugin/move-folder')
const ModifyFile = require('../plugin/modify-file-path')
const SplitThemeToFile = require('../plugin/split-theme-to-file')
const MultipleVersion = require('../plugin/multipleVersion')

const PATH = '/test/pnc/'

module.exports = function (env) {
  const config = utils.getConfig(env)
  const webpackConfig = baseConfigFn(config)
  const envpro = envonlinefn(config)
  webpackConfig.module.rules = [ ...webpackConfig.module.rules ]

  webpackConfig.mode = 'production'
  webpackConfig.plugins = [...webpackConfig.plugins,
    new DefinePlugin(envpro),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ModifyFile([ // 更改打包后的文件
      // 替换掉html里面的public路径
      {
        fileList: config.pathList.map(p => path.join(config.distFolder, p.fileName + '.html')),
        replaceFn: (html) => {
          return html.replace(/<(link|script).*?(src|href)\s*?=\s*?("|').*?("|')/g, (a) => { 
            let r = a.replace(/\s*?=\s*?"\/public\//, `="${PATH}public/`)

            if (config.nodeEnv == 'online') r = r.replace('="./', '="' + PATH + config.outFolder + '/') 
            return r
          })
        }
      }
    ]),
    new MoveFolder([{ // 移动语言文件夹
      from: path.join(config.srcFolder, 'json'),
      to: path.join(config.distFolder, 'json')
    },{
      from: path.join(config.srcFolder, 'lang'),
      to: path.join(config.distFolder, 'lang')
    },{
      from: path.join(config.srcFolderTop, 'sw'),
      to: path.join(config.distFolderTop)
    }].concat(config.pathList.map(p => ({
      from: path.join(config.srcFolder, p.fileName, 'statics'),
      to: path.join(config.distFolder, 'statics')
    }))))
  ]
  if (config.userConfig.theme) { // 如果有多主题，需要打包后分离主题文件
    webpackConfig.plugins.push(
      new SplitThemeToFile({
        theme: config.userConfig.theme
      })
    )
  }
  if (config.userConfig.onlineVersion) { // 如果有多版本共存，需要多做一次处理
    webpackConfig.plugins.push(
      new MultipleVersion({
        onlineVersion: config.userConfig.onlineVersion
      })
    )
  }

  return webpackConfig
}