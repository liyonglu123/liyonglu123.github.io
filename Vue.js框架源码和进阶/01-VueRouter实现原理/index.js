let _Vue = null;
class VueRouter {
  static install(Vue) {
    // 1. 判断当前插件是否已经被安装
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    // 2. 把Vue构造函数记录到全局变量
    _Vue = Vue;
    // 3. 把创建Vue实例时候传入的router对象注入到Vue实例上
    // 混入
    _Vue.mixin({
      beforeCreate() {
        // 确保组件不执行
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
          this.$options.router.init();
        }
      },
    });
  }

  constructor(options) {
    this.options = options;
    this.routeMap = {};
    this.data = _Vue.observable({
      current: "/",
    });
  }

  init() {
    this.createRouteMap();
    this.initComponents(_Vue);
    this.initEvent();
  }

  createRouteMap() {
    // 遍历所有的路由规则，把路由规则解析成为键值对的形式，存储到routeMap中
    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component;
    });
  }

  initComponents(Vue) {
    const self = this;
    Vue.component("router-link", {
      props: {
        to: String,
      },
      //   template: "<a :href='to'><slot></slot></a>", // 运行时不支持
      render(h) {
        return h(
          "a",
          {
            attrs: {
              href: this.to,
            },
            on: {
              click: this.clickHandler,
            },
          },
          [this.$slots.default]
        );
      },
      methods: {
        clickHandler(e) {
          // 不会刷新，不发送请求，客户端进行处理
          history.pushState({}, "", this.to);
          // 响应式的变化
          this.$router.data.current = this.to;
          e.preventDefault();
        },
      },
    });
    Vue.component("router-view", {
      render(h) {
        const component = self.routeMap[self.data.current];
        return h(component);
      },
    });
  }

  initEvent() {
    // 处理前进后退问题
    window.addEventListener("popstate", () => {
      this.data.current = window.location.pathname;
    });
  }
}
