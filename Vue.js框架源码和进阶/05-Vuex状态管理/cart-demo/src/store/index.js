import Vue from "vue";
// import Vuex from "vuex";
import Vuex from "../myvuex/index.js"; // 模拟自己的vuex
import products from "./modules/product.js";
import cart from "./modules/cart.js";

Vue.use(Vuex);

// Vuex自定义插件
const myPlugin = (store) => {
  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith("cart/")) {
      window.localStorage.setItem(
        "cart-products",
        JSON.stringify(state.cart.cartProducts)
      );
    }
  });
};

export default new Vuex.Store({
  state: {
    count: 100,
  },
  mutations: {
    increase(state, payload) {
      state.count += payload;
    },
  },
  actions: {
    increaseAsync(context, payload) {
      setTimeout(() => {
        context.commit("increase", payload);
      }, 2000);
    },
  },
  modules: {
    products,
    cart,
  },
  plugins: [myPlugin],
});
