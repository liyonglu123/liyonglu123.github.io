// 这里是首页的  router
import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'src/module/home/view/index'
Vue.use(Router)
export default new Router({
    //   mode:"history",
    routes: [{
        path: '/',
        name: 'layout',
        component: Layout
    }]
})