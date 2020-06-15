module.exports = function (config) {
  return {
    ENV: '"online"',
    NODE_ENV: '"online"',
    DEBUG_MODE: false,
    HOST: {
      PRE: '""',
      MINICLIENT: '"//micro-api.gtarcade.com/"',
    },
    // cacheHost: '"//static.gtarcade.com/gtarcade/micro/"',
    // staticPath: `"//static.gtarcade.com/gtarcade/gamerepository/clientweb/${config.outFolder}/"`,
    // staticRoot: `"//static.gtarcade.com/gtarcade/gamerepository/clientweb/client/"`,
    API_KEY: '"XXXX-XXXXX-XXXX-XXXX"'
  }
}