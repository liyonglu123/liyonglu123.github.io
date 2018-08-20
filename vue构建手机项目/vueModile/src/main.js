// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入animate.css 动画
import animate from 'animate.css'
Vue.use(animate)
// 引入hover.css样式
import hover from 'hover.css'
Vue.use(hover)
// 引入bounce.js动画
// import bounce from 'bounce.js'
// Vue.use(bounce)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
