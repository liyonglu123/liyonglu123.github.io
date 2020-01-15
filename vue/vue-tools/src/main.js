import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
// ????
import directives from '@/directives'
// ??velocity.js??
// import axios from "axios"
Vue.use(iView);
Vue.use(directives);
// Vue.use(axios);
// Vue.use(axios);
// ????????????????
// import Navigation from 'vue-navigation'
// Vue.use(Navigation, {router, store})
Vue.config.productionTip = false;
// Vue.$axios = axios;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
