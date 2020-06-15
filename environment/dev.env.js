/**
 * 配置文件
 */
module.exports = function (config) {
  return {
    ENV: '"development"',
    NODE_ENV: '"development"',
    DEBUG_MODE: false,
    HOST: {
      API: '"//l2l-test.boldseas.com"',
    },
    cacheHost: '"//micro.gtarcade.com/"',
    staticPath: `"../"`,
    staticRoot: `"/"`,
  }
}