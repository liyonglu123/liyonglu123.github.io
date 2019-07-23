import Vue from 'vue'
export default (Vue) => {
    Vue.directive('dragScale', {
        // 当被绑定的元素插入到dom时……
        inserted(el, binding, vnode) {
        },
        bind(el, binding, vnode) {
            el.onmousedown = function (ev) {
                let fa = el.parentElement;
                let oEvent = ev;
                // 浏览器有一些图片的默认事件,这里要阻止
                oEvent.preventDefault();
                let disX = oEvent.clientX - el.offsetLeft;
                let disY = oEvent.clientY - el.offsetTop;
                fa.onmousemove = function (ev) {
                    oEvent = ev;
                    oEvent.preventDefault();
                    let x = oEvent.clientX - disX;
                    let y = oEvent.clientY - disY;
                    // 图形移动的边界判断
                    x = x <= 0 ? 0 : x;
                    x = x >= fa.offsetWidth - el.offsetWidth ? fa.offsetWidth - el.offsetWidth : x;
                    y = y <= 0 ? 0 : y;
                    y = y >= fa.offsetHeight - el.offsetHeight ? fa.offsetHeight - el.offsetHeight : y;
                    el.style.left = x + 'px';
                    el.style.top = y + 'px';
                }
                // 图形移出父盒子取消移动事件,防止移动过快触发鼠标移出事件,导致鼠标弹起事件失效
                fa.onmouseleave = function () {
                    fa.onmousemove = null;
                    fa.onmouseup = null;
                }
                // 鼠标弹起后停止移动
                fa.onmouseup = function () {
                    fa.onmousemove = null;
                    fa.onmouseup = null;
                }
            };
            // 缩放 分为三种 水平, 垂直, 两者都有
            let children = el.children;
            let horizontal = children[1];
            let vertical = children[2];
            let scaleChild = el.lastElementChild;
            // 水平方向
            horizontal.onmousedown = function (e) {
                let fa = el.parentElement;
                // 阻止冒泡,避免缩放时触发移动事件
                e.stopPropagation();
                e.preventDefault();
                var pos = {
                    'w': el.offsetWidth,
                    'x': e.clientX,
                };
                fa.onmousemove = function (ev) {
                    ev.preventDefault();
                    // 设置图片的最小缩放为30*30
                    let w = Math.max(30, ev.clientX - pos.x + pos.w)
                    // 设置图片的最大宽高
                    w = w >= fa.offsetWidth - el.offsetLeft ? fa.offsetWidth - el.offsetLeft : w
                    el.style.width = w + 'px';
                }
                fa.onmouseleave = function () {
                    fa.onmousemove = null;
                    fa.onmouseup = null;
                }
                fa.onmouseup = function () {
                    fa.onmousemove = null;
                    fa.onmouseup = null;
                }
            }
            // 垂直方向
            vertical.onmousedown = function (e) {
                let fa = el.parentElement;
                // 阻止冒泡,避免缩放时触发移动事件
                e.stopPropagation();
                e.preventDefault();
                var pos = {
                    'h': el.offsetHeight,
                    'y': e.clientY
                };
                fa.onmousemove = function (ev) {
                    ev.preventDefault();
                    // 设置图片的最小缩放为30*30
                    let h = Math.max(30, ev.clientY - pos.y + pos.h)
                    h = h >= fa.offsetHeight - el.offsetTop ? fa.offsetHeight - el.offsetTop : h
                    el.style.height = h + 'px';
                }
                fa.onmouseleave = function () {
                    fa.onmousemove = null;
                    fa.onmouseup = null;
                }
                fa.onmouseup = function () {
                    fa.onmousemove = null;
                    fa.onmouseup = null;
                }
            }
            // 都有
            scaleChild.onmousedown = function (e) {
                let fa = el.parentElement;
                // 阻止冒泡,避免缩放时触发移动事件
                e.stopPropagation();
                e.preventDefault();
                var pos = {
                    'w': el.offsetWidth,
                    'h': el.offsetHeight,
                    'x': e.clientX,
                    'y': e.clientY
                };
                fa.onmousemove = function (ev) {
                    ev.preventDefault();
                    // 设置图片的最小缩放为30*30
                    let w = Math.max(30, ev.clientX - pos.x + pos.w)
                    let h = Math.max(30, ev.clientY - pos.y + pos.h)
                    // console.log(w,h)
                    // 设置图片的最大宽高
                    w = w >= fa.offsetWidth - el.offsetLeft ? fa.offsetWidth - el.offsetLeft : w
                    h = h >= fa.offsetHeight - el.offsetTop ? fa.offsetHeight - el.offsetTop : h
                    el.style.width = w + 'px';
                    el.style.height = h + 'px';
                }
                fa.onmouseleave = function () {
                    fa.onmousemove = null;
                    fa.onmouseup = null;
                }
                fa.onmouseup = function () {
                    fa.onmousemove = null;
                    fa.onmouseup = null;
                }
            }

        },
        // 所在组件的 VNode 更新时调用
        update(el, binding, vnode) {


        },
        // 只调用一次，指令与元素解绑时调用
        unbind(el, binding, vnode) {

        }
    })
}