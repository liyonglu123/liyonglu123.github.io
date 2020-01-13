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
import Pulldown from './views/list/pulldown.vue'
import Pullup from './views/list/pullup.vue'
import DownUpList from './views/list/downup.vue'

import animation from './views/animation/animation.vue'
import transition from './views/animation/transition.vue'
import js from './views/animation/js.vue'
import framework from './views/animation/framework.vue'

import transitionList from './views/animation/list.vue'
import shudu from './views/animation/shudu.vue'
// 状态过渡
import num from './views/stateTransition/num.vue'
import tween from './views/stateTransition/tween.vue'
import circle from './views/stateTransition/circle.vue'


// import svg from './views/stateTransition/svg.vue'




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
        path: '/stickFooter',
        name: 'stickFooter',
        component: StickFooter
    },
    {
        path: '/Form',
        name: 'Form',
        component: Form
    },
    // {
    //     path: '/svg',
    //     name: 'svg',
    //     component: svg
    // },
    {
        path: '/circle',
        name: 'circle',
        component: circle
    },
    {
        path: '/num',
        name: 'num',
        component: num
    },
    {
        path: '/tween',
        name: 'tween',
        component: tween
    },
    {
        path: '/transitionList',
        name: 'transitionList',
        component: transitionList
    },
    {
        path: '/shudu',
        name: 'shudu',
        component: shudu
    },
    {
        path: '/animation',
        name: 'animation',
        component: animation
    },
    {
        path: '/transition',
        name: 'transition',
        component: transition
    },
    {
        path: '/js',
        name: 'js',
        component: js
    },
    {
        path: '/framework',
        name: 'framework',
        component: framework
    },
    {
        path: '/',
        name: 'downUpList',
        component: DownUpList
    },
    {
        path: '/pullup',
        name: 'pullup',
        component: Pullup
    },
    {
        path: '/pulldown',
        name: 'pulldown',
        component: Pulldown
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
        // meta: {
        //     keepAlive: true
        // }
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