import Vue from 'vue'
import Router from 'vue-router'
// import store from './store'
// import Home from './views/Home.vue'
import Form from './views/form.vue'
import List from './views/keep-alive/list.vue'
import Detail from './views/keep-alive/detail.vue'
import ScrollList from './views/list/list.vue'
import Star from './views/star/star.vue'
import StickFooter from "./views/stickFooter/stickFooter"




Vue.use(Router)

var router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ './views/login/index.vue')
    },
    {
        path: '/',
        name: 'stickFooter',
        component: StickFooter
    },
    {
        path: '/Form',
        name: 'Form',
        component: Form
    },
    {
        path: '/star',
        name: 'star',
        component: Star
    },
    {
        path: '/scrollList',
        name: 'scrollList',
        component: ScrollList
    },
    {
        path: '/list',
        name: 'list',
        component: List,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/detail',
        name: 'detail',
        component: Detail,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }]
})
//回调方法，在跳转前执行
router.beforeEach((to, from, next) => {
    // to 及将要进入的目标的路由对象
    // from 当前导航即将离开的路由对象
    // next 调用该方法后，才能进入下一个钩子
    // 是从详情进入的时候   首次进来的时候还没有进行保存第二次才可以实现
    // if(from.fullPath.indexOf('detail') > -1 || to.fullPath.indexOf('list') > -1) {
    //     if (!store.state.includes.includes(to.name)) {
    //         store.dispatch('setIncludes', to.name);
    //         next();
    //     }
    //     next();
    // }
    next();
})
export default router;