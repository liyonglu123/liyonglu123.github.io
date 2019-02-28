import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from 'src/router/more'
import store from 'src/store/index'
import 'utils/rem'
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})