// 这里是首页的  router
import Vue from 'vue'
import Router from 'vue-router'
import MoreIndex from 'src/module/more/view/index'
Vue.use(Router)
export default new Router({
    //   mode:"history",
    routes: [{
        path: '/',
        name: 'moreIndex',
        component: MoreIndex
    }]
})