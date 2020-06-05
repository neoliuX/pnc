const path = require("path")

function getConfig (env) {
  const srcFolder = path.resolve(__dirname, '../src')
  const distFolder = path.resolve(__dirname, '../dist')
  const [folder, list] = env.path.split('/')
  const pageList = list.split(',').map(fileName => {
    return {
      fileName
    }
  })

  return {
    folder,
    pageList,
    srcFolder,
    distFolder
  }
}

module.exports = {
  getConfig
}