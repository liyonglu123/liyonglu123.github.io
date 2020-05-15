import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store' // 引入store实例
import Cookies from 'js-cookie'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "TMain" */ '@/components/TMain/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index')
  }
]

const router = new VueRouter({
  routes
})

// 路由拦截
const turn = (to, from, next) => {
  if (to.path === '/login') {
    // 如果登录了然后访问login页，不做跳转，从哪来回哪去
    next(false)
  } else {
    // 否则顺利跳转
    next()
  }
}
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  console.log(token)
  if (token) {
    // 如果token不为空字符串或者undefined，说明登录了
    if (!store.state.user_name) {
      // 判断store.state.user_name是否为空，为空则需要获取
      store.dispatch('getInfoActions').then(() => {
        turn(to, from, next) // 获取之后再跳转页面
      })
    } else {
      turn(to, from, next) // 如果store.state.user_name不为空，直接跳转
    }
  } else {
    // 否则是没登录
    if (to.path === '/login') {
      // 如果没登录而且乖乖的到登录页去，轻松放行
      next()
    } else {
      // 如果没登录还想去登录后的页面，打回登录页
      next('/login')
    }
  }
})

export default router
