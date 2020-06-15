import Axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource, CancelToken, AxiosPromise } from 'axios'
import { param } from './param'
import { isNone } from './is'

interface RequestConfig extends AxiosRequestConfig {
  cacheTime?: number | null | undefined
}

const ajax = {
  ...Axios,
  get,
  post,
  postUrlSearch,
  jsonp,
  jsonpPro
}

let lifeCircle = {
  onBeforeSendHeader: (commonHeader: any, method: string, url: string) => commonHeader
}

function setLifecircle (obj: {
onBeforeSendHeader: (commonHeader: any, method: string, url: string) => any
}) {
  lifeCircle = {
    ...lifeCircle,
    ...obj
  }
}

let getCommonConfig = (method: string, url: string) => ({
  withCredentials: true,
  headers: lifeCircle.onBeforeSendHeader({}, method, url)
})

function setCancelToken (source?: CancelTokenSource, config: RequestConfig & ProOptions = {}) {
  if (source) {
    config = {
      ...config,
      cancelToken: source.token
    }
  }
  return config
}

// 设置缓存
let cache = {}
let cacheDueList = {}
function setCache (post: () => Promise<any>, key: string, cacheTime: number | null | undefined) {
  if (isNone(cacheTime)) return post()

  // 循环缓存截至的日期
  Object.keys(cacheDueList).forEach(endTime => {
    if (new Date().getTime() > +endTime) { // 如果有的key已经到期
      cache[ cacheDueList[endTime] ] = null // 置空
      delete cache[ cacheDueList[endTime] ] // 删除缓存的列表
      cacheDueList[endTime] = null // 置空
      delete cacheDueList[endTime] // 删除缓存的列表
    }
  })

  if (cacheTime === -1) { // 如果传来-1 则清空该缓存
    cache[key] = null
  }

  if (!cache[key]) { // 如果缓存里不存在key
    if ((cacheTime as number) > 0) { // 如果设置了缓存时间
      cacheDueList[(cacheTime as number) * 1000 + new Date().getTime()] = key
    }

    cache[key] = post().catch(error => {
      cache[key] = null
      throw error
    })
  }
  return cache[key]
}

function deleteEmptyData (data: any) {
  for (const key in data) if (!data[key]) delete data[key]
}

function get (url: string, config: RequestConfig = {}, source?: CancelTokenSource): Promise<AxiosResponse> {
  return setCache(
    () => Axios.get(url, { ...getCommonConfig('GET', url), ...config } as AxiosRequestConfig),
    url + JSON.stringify(config.params),
    config.cacheTime
  )
}

function post (url: string, data: any = {}, config: RequestConfig = {}, source?: CancelTokenSource): Promise<AxiosResponse> {
  // deleteEmptyData(data)

  return setCache(
    () => Axios.post(url, data, { ...getCommonConfig('POST', url), ...config } as AxiosRequestConfig),
    url + JSON.stringify(data) + JSON.stringify(config.params),
    config.cacheTime
  )
}

function postUrlSearch (url: string, data: any = {}, config: RequestConfig = {}, source?: CancelTokenSource) {
  // deleteEmptyData(data)

  const reqData = new URLSearchParams(param(data))
  return setCache(
    () => Axios.post(url, reqData, { ...getCommonConfig('POST_URL', url), ...config } as AxiosRequestConfig),
    url + JSON.stringify(data) + JSON.stringify(config.params),
    config.cacheTime
  )
}

// 取消请求的逻辑
function sourceWrapper (source: CancelTokenSource, method: string, args: any[]) {
  if (method === 'get' || method === 'jsonpPro') {
    let [url, config = {}] = args
    // @ts-ignore
    return ajax[method](url, setCancelToken(source, config))
  } else {
    let [url, data, config = {}] = args
    return ajax[method](url, data, setCancelToken(source, config))
  }
}

interface Options {
  url: string // url
  options?: any
  cacheTime?: number
  data?: any // data
  callbackName?: string // 回调参数名
  fnName?: string // 回调函数名
}

interface ProOptions {
  cacheTime?: number
  params?: any
  callbackName?: string // 回调参数名
  fnName?: string // 回调函数名
  cancelToken?: CancelToken
}

let jsonpId = 0
let container = document.getElementsByTagName('head')[0]
let global = window as any

// 升级版的jsonp
function jsonpPro (url: string, {params, callbackName, fnName, cacheTime, cancelToken}: ProOptions = {}): Promise<any> {
  let isCanceled = false
  cancelToken && cancelToken.promise.then(res => {
    isCanceled = true
  })
  const promise = new Promise((resolve, reject) => {
    jsonp({url, data: params, callbackName, fnName, cacheTime}).then(res => {
      if (isCanceled) {
        reject(new Error('canceled'))
      } else {
        resolve(res)
      }
    })
  })

  return promise
}

function jsonp ({url, data = {}, callbackName = 'callback', fnName = 'jsonp' + jsonpId++, cacheTime}: Options): Promise<any> {
  const scriptNode = document.createElement('script')

  // 添加回调函数
  console.log(url, data)
  data[callbackName] = fnName

  // if (isNone(cacheTime)) data['timestamp'] = new Date().getTime()
  data['timestamp'] = new Date().getTime()

  // 拼接url
  const params = []
  for (var key in data) {
    params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
  }
  url = url.indexOf('?') > 0 ? (url + '&') : (url + '?')
  url += params.join('&')
  scriptNode.src = url

  const pro = () => new Promise((resolve, reject) => {
    // 传递的是一个匿名的回调函数，要执行的话，暴露为一个全局方法
    global[fnName] = function (res: any) {
      resolve(res)
      container.removeChild(scriptNode)
      delete global[fnName]
    }

    // 出错处理
    scriptNode.onerror = function () {
      reject(new Error('error'))
      container.removeChild(scriptNode)
      global[fnName] && delete global[fnName]
    }

    scriptNode.type = 'text/javascript'
    container.appendChild(scriptNode)
  })

  return setCache(
    pro,
    url.replace(/timestamp=\d+/, '') + fnName,
    cacheTime
  )
}

export default ajax
export {
  Options,
  RequestConfig,
  sourceWrapper,
  setLifecircle,
  jsonpPro,
  ProOptions
}
