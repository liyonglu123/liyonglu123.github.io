import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
// 新模块
// import i18n from './i18n';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
//   i18n, // 新模块
  render: (h) => h(App),
}).$mount('#app');
