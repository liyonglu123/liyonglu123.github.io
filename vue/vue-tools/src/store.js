import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    includes: []
  },
  mutations: {
    SET_INCLUDES: (state, include) => {
        state.includes.push(include);
    },
    DEL_INCLUDES: (state) => {
        state.includes.pop();
    },
  },
  actions: {
    setIncludes({ commit }, includes) {
        commit('SET_INCLUDES', includes);
    },
    delIncludes({ commit }, includes) {
        commit('DEL_INCLUDES', includes);
    },
  }
})
