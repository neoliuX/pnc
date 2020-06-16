import '@src/assets/scss/base.scss'
import './vue-demo.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'

import { RouteConfig } from 'vue-router/types'

import BaseCom from './components/Base.vue'
import Form from '@src/ipad/components/form/demo/FormDemo.vue'
import Dialog from '@src/ipad/components/dialog/demo/DialogDemo.vue'
import Head from '@src/ipad/components/head/demo/HeadDemo.vue'
import Foot from '@src/ipad/components/foot/demo/FootDemo.vue'
import Table from '@src/ipad/components/table/demo/TableDemo.vue'

import vueAjax from '@common/vue-plugin/ajax/Ajax'
import Validator from '@common/vue-plugin/validator/Validator'

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
        { path: '/form', component: Form },
        { path: '/dialog', component: Dialog },
        { path: '/head', component: Head },
        { path: '/foot', component: Foot },
        { path: '/table', component: Table },
        { path: '/', component: Form }
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
    render: h => h(Bar)
  })
})
