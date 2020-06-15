import '@src/assets/scss/base.scss'
import './home.scss'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import { RouteConfig } from 'vue-router/types'

import BaseCom from './components/Base.vue'
import SearchPhoneBase from './pages/search-user/Base.vue'
import SearchPhone from './pages/search-user/SearchPhone.vue'
import SearchResult from './pages/search-user/SearchResult.vue'

import vueAjax from '@common/vue-plugin/ajax/Ajax'
import Validator from '@common/vue-plugin/validator/Validator'
import store from './store/index'

Vue.use(VueRouter)
Vue.use(vueAjax)
Vue.use(Validator)

// 定路路由组件
const Bar = { template: '<router-view></router-view>' }
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
// 获取多语言
Promise.resolve().then(res => {
  let routes: RouteConfig[] = [
    {
      path: '/',
      component: BaseCom,
      children: [
        {
          path: '/search',
          component: SearchPhoneBase,
          children: [
            {
              path: '/search/phone', component: SearchPhone
            },
            {
              path: '/search/result', component: SearchResult
            },
            {
              path: '/search/', component: SearchPhone
            }
          ]
        }
      ]
    }
  ]
  return routes
}).then(routes => {
  const router = new VueRouter({
    routes
  })
  return router
}).then(router => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Bar)
  })
})
