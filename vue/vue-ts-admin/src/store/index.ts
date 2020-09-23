import Vue from 'vue'
import Vuex from 'vuex'
import { loginReq, getInfoReq } from '@/api/user'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_name: '',
    email: '',
    isEdit: false,
    currentIndex: -1
  },
  mutations: {
    // 设置存储在store里的用户信息
    setUserInfoMutations(state, info) {
      const { user_name, email } = info
      state.user_name = user_name
      state.email = email
    },
    // 更新富文本的编辑状态
    updateElementStatus(state, flag) {
      state.isEdit = flag
    },

    // 虚拟列表中----监听当前点击的是那个元素
    setCurrentIndex(state, index) {
      state.currentIndex = index
    }
  },
  actions: {
    loginActions({ commit, dispatch }, { user_name, password }) {
      return new Promise((resolve, reject) => {
        loginReq({ user_name, password }).then(response => {
          // 首先调登录接口
          const {
            data: { code, msg, data }
          } = response
          if (code === 0) {
            // 成功返回后，将token存到cookie中，然后携带token去请求获取信息接口
            Cookies.set('token', 'value')
            dispatch('getInfoActions', data).then(() => {
              resolve()
            })
          } else {
            console.error(msg)
          }
        })
      })
    },
    getInfoActions({ commit }, data) {
      return new Promise((resolve, reject) => {
        getInfoReq(data).then(res => {
          const {
            data: { code, data }
          } = res
          if (code === 0) {
            commit('setUserInfoMutations', data)
            resolve() // 全部操作做完后，调用resolve方法
          }
        })
      })
    }
  }
})
