import Vue from 'vue'
import Axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios'
import { Options, ProOptions } from '../../ts/ajax'
import { RequestConfig } from '../../ts/ajax'


interface Ajax {
  request<T = any>(config: RequestConfig): Promise<T>;
  get<T = any>(url: string, config?: RequestConfig): Promise<T>;
  delete(url: string, config?: RequestConfig): Promise<any>;
  head(url: string, config?: RequestConfig): Promise<any>;
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  postUrlSearch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  jsonp<T = any>(option: Options): Promise<T>;
  jsonpPro<T = any>(url: string, option?: ProOptions): Promise<T>;
  downloadXls<T = any>(url: string, filename: string, config?: RequestConfig): Promise<T>;
}

declare module 'vue/types/vue' {
  interface Vue {
    $ajax: Ajax
    $ajaxSpinner: Ajax
    $actionSpinner: (fun: Function) => Function
    $ajaxSourceList: any[]
    $ajaxCancleAll: () => void
  }
}
