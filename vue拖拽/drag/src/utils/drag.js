/**
 * 注意clientY pageY screenY layerY offsetY 的区别
 * 1.自动生成一个版面  drag.getBoundingClientRect() 获取矩形边界值
 * 2.计算出边界值
 * 3.点击生成不同类型的元素,根据边界值放入到不同的位置
 * 4.可以进行拖拽和缩放
 * 5.可以双击进行修改
 */

export default class Drag {
    constructor(opt) {
        this.el = document.querySelector(opt.el);
        this.hoverList = "move,e-resize,s-resize,se-resize";
        this.curClass = '';
    };
    init() {
        this._mouseenter();
    }
    // hover中不同的位置显示不同的cursor
    setCursorClass() {
        // let list = this.hoverList.split(',');
        return `customer-${this.curClass}`;
    }
    // 获取鼠标的相对element的相对位置
    getPoint(element,event) {
        event = event || window.event; /*为了兼容IE*/
        /*将当前的鼠标坐标值减去元素的偏移位置，返回鼠标相对于element的坐标值*/
        var x = (event.pageX || event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
        x -= element.offsetLeft;
        var y = (event.pageY || event.clientY + document.body.scrollTop + document.documentElement.scrollTop);
        y -= element.offsetTop;
        return { x: x, y: y };
    };
    // 添加子元素暂时先不做处理

    // 元素的各种事件的处理
    captureMouse(element, mouseenter,mousemove, mousedown, mouseup) {
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
        element.addEventListener('mouseenter', function(event) {
            event.point = getPoint(event);
            mouseenter && mouseenter.call(this, event);
        }, false);
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
    // _mouseenter() {
    //     let _this = this;
    //     this.el.addEventListener('mouseenter', function(event) {
    //         let mouseX = _this.getPoint(_this.el, event).x;
    //         let mouseY = _this.getPoint(_this.el, event).y;
    //         let width = _this.getParentEleRect(".ceshi").width;
    //         let height = _this.getParentEleRect(".ceshi").height;
    //         let x = _this.getParentEleRect(".ceshi").x;
    //         let y = _this.getParentEleRect(".ceshi").y;
    //         // 条件判断
    //         if( mouseX >=  width -10 && mouseY <  height -10) {
    //             _this.curClass = "e-resize";
    //             _this.setCursorClass();
    //             console.log("left");
    //         }
    //         if( mouseX <  width -10 && mouseY <  height -10) {
    //             _this.curClass = "move";
    //             _this.setCursorClass();
    //             console.log("center");
    //         }
    //         if( mouseY >=  height -10 &&  mouseX <  width -10) {
    //             _this.curClass = "s-resize";
    //             _this.setCursorClass();
    //             console.log("bottom");
    //         }
    //         if( mouseY >=  height -10 && mouseY <=  height &&  mouseX >=  width -10 && mouseX <=  width) {
    //             _this.curClass = "se-resize";
    //             _this.setCursorClass();
    //             console.log("cross");
    //         }
    //     }, false);
    // }
    // _mousemove(element) {
    //     this.el.addEventListener('mousemove', function(event) {
    //         event.point = _this.getPoint(event);
    //     }, false);
    // }
    // _mousedown(element) {
    //     this.el.addEventListener('mousedown', function(event) {
    //         event.point = _this.getPoint(event);
    //     }, false);
        
    // }
}