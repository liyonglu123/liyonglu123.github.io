import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from 'src/router'
import store from 'src/store/index'
import 'utils/rem'
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

/* eslint-disable no-new */