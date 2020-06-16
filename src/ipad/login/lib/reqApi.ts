const boldseas = HOST['API']
const ReqApi = {
  'login': {
    url: () => boldseas + `/api/v2/iam/password/_login`
  }
}

export {
  ReqApi
}
