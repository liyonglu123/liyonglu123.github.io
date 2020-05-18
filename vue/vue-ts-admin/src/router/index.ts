import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
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
      },
      {
        path: '/chart',
        name: 'Chart',
        component: () =>
          import(/* webpackChunkName: "chart" */ '@/views/chart/index.vue')
      },
      {
        path: '/editor',
        name: 'Editor',
        component: () =>
          import(
            /* webpackChunkName: "editor" */ '@/views/richEditor/index.vue'
          )
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

export default router
