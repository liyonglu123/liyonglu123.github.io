import { init } from "snabbdom/build/package/init";
import { h } from "snabbdom/build/package/h";

const patch = init([]);

let vnode = h("div#container", [
  h("h1", "hello snabbdom"),
  h("p", "我是p标签"),
]);
let app = document.querySelector("#app");

let oldVnode = patch(app, vnode);

// 模拟接口
setTimeout(() => {
  //   vnode = h("div#container", [h("h1", "hello wold"), h("p", "hello p")]);
  //   patch(oldVnode, vnode);

  // 清除div中的内容
  patch(oldVnode, h("!"));
}, 2000);
