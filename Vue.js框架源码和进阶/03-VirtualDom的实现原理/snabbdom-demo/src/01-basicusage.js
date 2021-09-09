import { init } from "snabbdom/build/package/init";
import { h } from "snabbdom/build/package/h";

const patch = init([]);

// 第一个参数： 标签+选择器
// 第二个参数： 如果是字符串就是标签的文本内容
let vnode = h("div#container.cls", "Hello World");
let app = document.querySelector("#app");
// 第一个参数： 旧的VNode,可以是DOM元素
// 第二个参数： 新的VNode
// 返回新的VNode
let oldVnode = patch(app, vnode);

vnode = h("div#container.xxx", "Hello 123");
patch(oldVnode, vnode);
