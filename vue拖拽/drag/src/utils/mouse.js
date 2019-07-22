// 封装事件处理函数 常见的事件问题
window.tool = {};
// 获取指定范围内的随机数
window.tool.getRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
// 碰撞检测 判断两个物体是否有交集
window.tool.intersects = function(bodyA, bodyB) {
    return !(bodyA.x + bodyA.width < bodyB.x ||
        bodyB.x + bodyB.width < bodyA.x ||
        bodyA.y + bodyA.height < bodyB.y ||
        bodyB.y + bodyB.height < bodyA.y);
};

window.tool.captureMouse = function(element, mousedown, mousemove, mouseup) {
    /*传入Event对象*/
    function getPoint(event) {
        event = event || window.event; /*为了兼容IE*/
        /*将当前的鼠标坐标值减去元素的偏移位置，返回鼠标相对于element的坐标值*/
        var x = (event.pageX || event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
        x -= element.offsetLeft;
        var y = (event.pageY || event.clientY + document.body.scrollTop + document.documentElement.scrollTop);
        y -= element.offsetTop;
        return { x: x, y: y };
    };
    if (!element) return;
    /*为element元素绑定mousedown事件*/
    element.addEventListener('mousedown', function(event) {
        event.point = getPoint(event);
        mousedown && mousedown.call(this, event);
    }, false);
    /*为element元素绑定mousemove事件*/
    element.addEventListener('mousemove', function(event) {
        event.point = getPoint(event);
        mousemove && mousemove.call(this, event);
    }, false);
    /*为element元素绑定mouseup事件*/
    element.addEventListener('mouseup', function(event) {
        event.point = getPoint(event);
        mouseup && mouseup.call(this, event);
    }, false);
};
window.tool.captureTouch = function(element, touchstart, touchmove, touchend) {
    /*传入Event对象*/
    function getPoint(event) {
        event = event || window.event;
        // 注意上面代码中的 event.changedTouches[0] ，这是获取当前触摸事件引发的所有Touch对象中第一个触摸点的Touch对象，
        // 当然还有 event.touches[0] 也可以获取到，它是获取所有仍然处于活动状态的触摸点中的第一个
        var touchEvent = event.changedTouches[0];
        /*将当前的鼠标坐标值减去元素的偏移位置，返回鼠标相对于element的坐标值*/
        var x = (touchEvent.pageX || touchEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
        x -= element.offsetLeft;
        var y = (touchEvent.pageY || touchEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop);
        y -= element.offsetTop;
        return { x: x, y: y };
    };
    if (!element) return;
    /*为element元素绑定touchstart事件*/
    element.addEventListener('touchstart', function(event) {
        event.point = getPoint(event);
        touchstart && touchstart.call(this, event);
    }, false);
    /*为element元素绑定touchmove事件*/
    element.addEventListener('touchmove', function(event) {
        event.point = getPoint(event);
        touchmove && touchmove.call(this, event);
    }, false);
    /*为element元素绑定touchend事件*/
    element.addEventListener('touchend', function(event) {
        event.point = getPoint(event);
        touchend && touchend.call(this, event);
    }, false);
};
// 两者的结合
window.tool.captureMT = function(element, touchStartEvent, touchMoveEvent, touchEndEvent) {
    'use strict';
    var isTouch = ('ontouchend' in document);
    var touchstart = null;
    var touchmove = null
    var touchend = null;
    if (isTouch) {
        touchstart = 'touchstart';
        touchmove = 'touchmove';
        touchend = 'touchend';
    } else {
        touchstart = 'mousedown';
        touchmove = 'mousemove';
        touchend = 'mouseup';
    };
    /*传入Event对象*/
    function getPoint(event) {
        /*将当前的触摸点坐标值减去元素的偏移位置，返回触摸点相对于element的坐标值*/
        event = event || window.event;
        var touchEvent = isTouch ? event.changedTouches[0] : event;
        var x = (touchEvent.pageX || touchEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
        x -= element.offsetLeft;
        var y = (touchEvent.pageY || touchEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop);
        y -= element.offsetTop;
        return { x: x, y: y };
    };
    if (!element) return;
    /*为element元素绑定touchstart事件*/
    element.addEventListener(touchstart, function(event) {
        event.point = getPoint(event);
        touchStartEvent && touchStartEvent.call(this, event);
    }, false);
    /*为element元素绑定touchmove事件*/
    element.addEventListener(touchmove, function(event) {
        event.point = getPoint(event);
        touchMoveEvent && touchMoveEvent.call(this, event);
    }, false);
    /*为element元素绑定touchend事件*/
    element.addEventListener(touchend, function(event) {
        event.point = getPoint(event);
        touchEndEvent && touchEndEvent.call(this, event);
    }, false);
};

// 键盘事件
window.tool.captureKeyDown = function(params) {
    function keyEvent(event) {
        params[event.keyCode]();
    };
    window.addEventListener('keydown', keyEvent, false);
};
window.tool.captureKeyUp = function(params) {
    function keyEvent(event) {
        params[event.keyCode]();
    };
    window.addEventListener('keyup', keyEvent, false);
};
// 判断鼠标位置是不是在制定的区域内
window.tool.containsPoint = function(body, x, y) {
    return !(x < body.x || x > (body.x + body.width) || y < body.y || y > (body.y + body.height));
};
// 获取矩形边界
window.tool.getBound = function(body) {
    return {
        x: (body.x - body.radius),
        y: (body.y - body.radius),
        width: body.radius * 2,
        height: body.radius * 2
    };
}