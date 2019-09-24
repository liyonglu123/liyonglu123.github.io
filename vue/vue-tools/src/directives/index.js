import Vue from 'vue'
//求两点之间的距离
function getDistance(obj1, obj2) {
    var a = (obj1.offsetLeft + obj1.offsetWidth / 2) - (obj2.offsetLeft + obj2.offsetWidth / 2);
    var b = (obj1.offsetTop + obj1.offsetHeight / 2) - (obj2.offsetTop + obj2.offsetHeight / 2);
    return Math.sqrt(a * a + b * b)
}

//碰撞检测
function isButt(obj1, obj2) {
    var l1 = obj1.offsetLeft;
    var t1 = obj1.offsetTop;
    var r1 = obj1.offsetLeft + obj1.offsetWidth;
    var b1 = obj1.offsetTop + obj1.offsetHeight;

    var l2 = obj2.offsetLeft;
    var t2 = obj2.offsetTop;
    var r2 = obj2.offsetLeft + obj2.offsetWidth;
    var b2 = obj2.offsetTop + obj2.offsetHeight;

    return !(r1 < l2 || b1 < t2 || r2 < l1 || b2 < t1)
}

//获取最终样式
function getStyle(obj, attr) {
    return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr])
}
//运动框架
function startMove(obj, pos, onEnd) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        doMove(obj, pos, onEnd)
    }, 30)
}

function doMove(obj, pos, onEnd) {
    var iCurL = getStyle(obj, "left");
    var iCurT = getStyle(obj, "top");
    var iSpeedL = (pos.left - iCurL) / 5;
    var iSpeedT = (pos.top - iCurT) / 5;
    iSpeedL = iSpeedL > 0 ? Math.ceil(iSpeedL) : Math.floor(iSpeedL);
    iSpeedT = iSpeedT > 0 ? Math.ceil(iSpeedT) : Math.floor(iSpeedT);
    if (pos.left == iCurL && pos.top == iCurT) {
        clearInterval(obj.timer);
        onEnd && onEnd()
    } else {
        obj.style.left = iCurL + iSpeedL + "px";
        obj.style.top = iCurT + iSpeedT + "px";
    }
}
export default (Vue) => {
    Vue.directive('dragExchange', {
        // 当被绑定的元素插入到dom时……
        inserted(el, binding, vnode) {
            console.log(el);
            var zIndex = 1;
            var aLi = el.parentElement.children;
            var aPos = [];
            //布局转换
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].index = i;
                aLi[i].style.top = aLi[i].offsetTop + "px";
                aLi[i].style.left = aLi[i].offsetLeft + "px";
                aLi[i].style.margin = "0 5px 5px 0";
                aPos.push({
                    "left": aLi[i].offsetLeft,
                    "top": aLi[i].offsetTop
                })
            }
            for (i = 0; i < aLi.length; i++) {
                aLi[i].style.position = "absolute";
                drag(aLi[i])
            }

            //拖拽函数
            function drag(obj, handle) {
                var handle = handle || obj;
                handle.style.cursor = "move";
                handle.onmousedown = function (event) {
                    var event = event || window.event;
                    var disX = event.clientX - this.offsetLeft;
                    var disY = event.clientY - this.offsetTop;
                    var oNear = null;
                    obj.style.zIndex = zIndex++;
                    document.onmousemove = function (event) {
                        var event = event || window.event;
                        var iL = event.clientX - disX;
                        var iT = event.clientY - disY;
                        var maxL = obj.parentNode.clientWidth - obj.offsetWidth;
                        var maxT = obj.parentNode.clientHeight - obj.offsetHeight;

                        iL < 0 && (iL = 0);
                        iT < 0 && (iT = 0);
                        iL > maxL && (iL = maxL);
                        iT > maxT && (iT = maxT);
                        obj.style.left = iL + "px";
                        obj.style.top = iT + "px";

                        for (i = 0; i < aLi.length; i++) aLi[i].classList.remove("hig");

                        oNear = findNearest(obj);

                        oNear && (oNear.classList.add("hig"));

                        return false
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                        if (oNear) {
                            var tIndex = obj.index;
                            obj.index = oNear.index;
                            oNear.index = tIndex;
                            startMove(obj, aPos[obj.index]);
                            startMove(oNear, aPos[oNear.index]);
                            oNear.classList.remove("hig");
                        } else {
                            startMove(obj, aPos[obj.index])
                        }
                        handle.releaseCapture && handle.releaseCapture()
                    };
                    this.setCapture && this.setCapture();
                    return false
                }
            }

            //找出相遇点中最近的元素
            function findNearest(obj) {
                var filterLi = [];
                var aDistance = [];
                for (i = 0; i < aLi.length; i++) aLi[i] != obj && (isButt(obj, aLi[i]) && (aDistance.push(getDistance(obj, aLi[i])), filterLi.push(aLi[i])));
                var minNum = Number.MAX_VALUE;
                var minLi = null;
                for (i = 0; i < aDistance.length; i++) aDistance[i] < minNum && (minNum = aDistance[i], minLi = filterLi[i]);
                return minLi
            }

        },
        bind(el, binding, vnode) {

        },
        // 所在组件的 VNode 更新时调用
        update(el, binding, vnode) {

        },
        // 只调用一次，指令与元素解绑时调用
        unbind(el, binding, vnode) {

        }
    });
}