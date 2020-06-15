const statisticsUrl = `//statistics.gtarcade.com/client/tag`// play now 统计
const boldseas = HOST['API']
const ReqApi = {
  'login': {
    url: () => boldseas + `/api/v2/iam/password/_login`
  }
}

export {
  ReqApi
}
