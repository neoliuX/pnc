const path = require('path')

function getCustomConfig (folder, preConfig = {}) {
  const configPath = folder.replace(/((?:\w|_|-)*)\/?$/, '')
  if (!configPath) return preConfig

  let config = {}
  try {
    config = require(path.join(process.cwd(), 'webpack/custom', configPath, 'index.js'))
  } catch (e) {}

  return getCustomConfig(configPath, {
    ...config,
    ...preConfig
  })
}

console.log(getCustomConfig('miniclient/live/room'))