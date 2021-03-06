
import './wallet.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'

import { RouteConfig } from 'vue-router/types/index.d'

import BaseComponent from './components/Base.vue'
import GcoinComponent from './pages/Gcoin.vue'
import PointComponent from './pages/Point.vue'

Vue.use(VueRouter)

// 定路路由组件
const Bar = { template: '<router-view></router-view>' }

// 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes: RouteConfig[] = [
  { path: '/',
    component: BaseComponent,
    children: [
      { path: '/point', component: PointComponent },
      { path: '/gcoin', component: GcoinComponent },
      { path: '/', component: GcoinComponent }
    ]
  }
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

router.afterEach(to => {
  // UA-46078286-1 需要和外面的统计代码里面的id保持一致
  gtag('config', 'UA-46078286-1', {'page_path': window.location.pathname + to.fullPath})
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  el: '#app',
  router,
  render: h => h(Bar)
})
