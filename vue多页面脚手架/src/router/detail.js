// 这里是首页的  router
import Vue from 'vue'
import Router from 'vue-router'
import Detail from 'src/module/detail/view/index'
Vue.use(Router)
export default new Router({
    //   mode:"history",
    routes: [{
        path: '/',
        name: 'Detail',
        component: Detail
    }]
})