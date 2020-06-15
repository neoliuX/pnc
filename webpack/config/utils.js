const path = require('path');
const merge = require('merge-deep');

function getCustomConfig (folder, preConfig = {}) {
  const configPath = folder.replace(/((?:\w|_|-)*)\/?$/, '')
  if (!configPath) return preConfig

  let config = {}
  try {
    config = require(path.join(process.cwd(), 'webpack/custom', configPath, 'index.js'))
  } catch (e) {}

  return getCustomConfig(configPath, merge(config, preConfig))
}


function getUserConfig (configList, isProd, folder, pageList) {
  const customConfig = getCustomConfig(folder + (isProd ? `/${pageList}` : '') + '/any')
  const customEnvConfig = isProd ? (customConfig.production || {}) : (customConfig.develoption || {})

  configList.forEach(config => {
    customEnvConfig[config] = true
  })

  customEnvConfig.outFileName = customEnvConfig['HASH'] ? '[name].[chunkhash:8]' : '[name]'
  customEnvConfig.isAutoFix = true
  customEnvConfig.isOnlyJs = customEnvConfig['CSS_IN_JS']
  // customEnvConfig.isAutoFix = customEnvConfig['AUTO_FIX']
  customEnvConfig.isInFloder = !customEnvConfig['FLODER_OFF'] && isProd
  customEnvConfig.currentDate = Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24)
  customEnvConfig.floderStr = customEnvConfig.isInFloder ? `${customEnvConfig.currentDate}/` : ''
  customEnvConfig.isUserCssModules = customEnvConfig.type === 'react'

  return customEnvConfig
}

function getConfig (env) {
	const nodeEnv = process.env.NODE_ENV
  const isProd = nodeEnv === 'pro' || nodeEnv === 'online' || nodeEnv === 'release'

  const [,folder, pageList] = env.path.match(/^(.*)\/((?:\w|_|-|,)*)$/)
  const folderTop = folder.split('/')[0]
  const userConfig = getUserConfig((env.config ? env.config.split("|") : []), isProd, folder, pageList)

  const outFolder = userConfig.target ? folder.replace(/.*?\//, userConfig.target + '/') : folder
  const outFolderTop = outFolder.split('/')[0]

	const srcFolderTop = path.join(process.cwd(), "src", folderTop)
	const distFolderTop = path.join(process.cwd(), "dist", outFolderTop)
	const srcFolder = path.join(process.cwd(), "src", folder)
	const distFolder = path.join(process.cwd(), "dist", outFolder)
  const pathList = pageList.split(',').map(fileName => {
		const devPath = path.join(srcFolder, fileName)
		const devName = path.join(folder, fileName)

		return {
			fileName,
			devPath,
			devName
		}
  })

  return {
    nodeEnv, // 当前环境
    folderTop, // 当前的顶级目录
    outFolderTop, // 输出的顶级目录
    srcFolderTop,
    distFolderTop,
    folder, // 当前目录
    outFolder,
    isProd, // 是否是生产环境
    userConfig, // 用户配置
    srcFolder, // 打包项目目录
    distFolder, // 输出到项目的目录
    pathList // 目录列表
  }
}

module.exports = {
  getConfig
}