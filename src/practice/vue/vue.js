import './vue.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Base from './components/Base.vue'

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo1111111111</div>' }
const Bar = { template: '<div>bar2222222</div>' }
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const ErrorDom = { template: '<div>404</div>' }
const Home = { template: '<div>home</div>' }


const One = { template: '<div>one</div>' }
const Two = { template: '<div>Two</div>' }
const Three = { template: '<div>Three</div>' }

const sidebar = { 
  template: '<router-view class="view one">one</router-view>' +
            '<router-view class="view two" name="a">aaaa</router-view>' +
            '<router-view class="view three" name="b">bbbb</router-view>'
}

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/base', component: Base },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '/user/:id', component: User },
  { path: '/home', component: Home },
  { path: '/sidebar/', components: { default: One, a: Two, b: Three } },
  { path: '*', component: ErrorDom }
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

// 现在，应用已经启动了！