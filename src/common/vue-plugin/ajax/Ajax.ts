/*
 *
 * vue ajax插件
 */
import Vue from 'vue'
import ajax, { sourceWrapper, setLifecircle } from '../../ts/ajax'
import Axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios'
import { isNone } from '../../ts/is'
import cookie from '@common/ts/cookie'

// 添加公共头
let jsHash = ''
// try {
//   jsHash = ((document.styleSheets[0].href as string).match(/\.css\?(.{8})/) || [])[1]
// } catch(e) {}
// setLifecircle({
//   onBeforeSendHeader: (commonHeader: any, method: string, url: string) => {
//     // s s-qa s-prv prfile(加下划线暂时取消) 域名下面需要发送公共头
//     if (/\/\/(s(-qa|-prv)?|profile_)\.gtarcade\.com/.test(url)) {
//       commonHeader = {
//         ...commonHeader,
//         c_version: cookie.getItem('version'),
//         j_version: jsHash,
//         os: cookie.getItem('os'),
//         lang: cookie.getItem('lang'),
//         client_id: cookie.getItem('client_id')
//       }
//     }
//     return commonHeader
//   }
// })

const vueAjax = {
  install: function (Vue: any, options: any) {
    Vue.mixin({
      created: function () {
        // 把common的ajax 赋值到this.$ajax里
        this.$ajax = warpAjax(ajax, this)
        this.$ajaxSourceList = []

        if (!this.$spinner) {
          return false
        }
        // 把common的ajax 赋值到this.$ajaxSpinner里
        this.$ajaxSpinner = {
          get: warpASpinner(this.$ajax.get, this),
          post: warpASpinner(this.$ajax.post, this),
          postUrlSearch: warpASpinner(this.$ajax.postUrlSearch, this),
          downloadXls: warpASpinner(this.$ajax.downloadXls, this),
          jsonp: warpASpinner(this.$ajax.jsonp, this),
          jsonpPro: warpASpinner(this.$ajax.jsonpPro, this)
        }
      },

      beforeDestroy: function () {
        // 公共的离开的时候的生命周期，取消掉所有的请求
        this.$ajaxCancleAll()
      }
    })

    Vue.prototype.$actionSpinner = function (fun: Function) {
      return warpASpinner(fun, this)
    }
    Vue.prototype.$ajaxCancleAll = function () {
      this.$ajaxSourceList && this.$ajaxSourceList.forEach((source: CancelTokenSource) => {
        source.cancel('canceled')
      })
      this.$ajaxSourceList = []
    }
    // Vue.prototype.$ajax = ajax
  }
}

/**
 * 这个是包裹所有的vue请求
 */
function warpAjax (ajax: any, context: Vue) {
  let newAjax = {}
  for (let key in ajax) {
    // jsonp 和 jsonpPro的不进行包裹
    if (['jsonp'].indexOf(key) > -1) {
      newAjax[key] = ajax[key]
      continue
    }

    newAjax[key] = async function (...arg: any[]) {
      // 这一块是取消请求的逻辑
      const CancelToken = Axios.CancelToken
      let source = CancelToken.source()
      context.$ajaxSourceList.push(source)

      let data: any
      try {
        data = await sourceWrapper(source, key, arg).then((res: any) => {
          return res
        })
      } catch (e) {
        throw e
      }
      return data
    }
  }
  return newAjax
}

function warpASpinner (fun: Function, context: Vue): Function {
  return async function (...arg: any[]) {
    context.$spinner.show()
    let data: any
    try {
      data = await fun.apply(context, arg)
    } catch (e) {
      context.$spinner.hide()
      throw e
    }
    context.$spinner.hide()
    return data
  }
}

export default vueAjax
