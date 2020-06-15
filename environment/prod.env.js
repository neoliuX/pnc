/**
 * 配置文件
 */

module.exports = function (config) {
  return {
    ...require('./dev.env')(config),
    ENV: '"production"',
    NODE_ENV: '"production"',
    staticPath: `"./"`
  }
}