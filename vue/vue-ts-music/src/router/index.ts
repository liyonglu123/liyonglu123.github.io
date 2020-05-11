import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Cookies from 'js-cookie'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      console.log('beforeenter')
      next()
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/login/index')
  }
]

const router = new VueRouter({
  routes
})
// 路由拦截
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  console.log(token, from)
  if (token) {
    // 如果token不为空字符串或者undefined，说明登录了
    if (to.path === '/login') {
      // 如果登录了然后访问login页，不做跳转，从哪来回哪去
      next(false)
    } else {
      // 否则顺利跳转
      next()
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
