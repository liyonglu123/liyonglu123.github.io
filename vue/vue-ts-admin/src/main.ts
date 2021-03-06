// mock 数据
if (process.env.NODE_ENV === 'development') {
  require('../mock')
}
// import '../demo/class-component-hooks'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import '@/iconfont/iconfont.css'
// 引入ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// 修改字体
// import '@/styles/font.scss'
// 加载全局注册的指令
import './directives'
import './permission'
Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // 触发renderAfterDocumentEvent 预渲染
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
