;
(function (window, document, undefined) {
    function swipeDelete(element, options) {
        var _self = this; //此时this指向实例对象
        _self.swipeElement = element;
        if (typeof element === 'string') {
            _self.swipeElement = document.querySelector(element);
        }
        //取消new 关键字
        return (_self instanceof swipeDelete) ? _self.init(_self.swipeElement, options) : new swipeDelete(_self.swipeElement, options);
    }
    swipeDelete.prototype = {
        constructor: swipeDelete,  // 修改原型的指向问题
        extend: function () {
            for (var i = 1; i < arguments.length; i++)
                for (var key in arguments[i])
                    if (arguments[i].hasOwnProperty(key))
                        arguments[0][key] = arguments[i][key];
            return arguments[0];
        },
        allowMultiple: true,
        // transitionend 执行完毕
        endEvent: function () {
            var el = document.createElement("div");
            var transEndEventNames = {
                WebkitTransition: "webkitTransitionEnd",
                transition: "transitionend"
            };
            for (var name in transEndEventNames) {
                if (el.style[name] !== undefined) {
                    return transEndEventNames[name]
                }
            }
            el = null;
            return false
        }(),
        // 初始化
        init: function (element, options) {
            var _self = this;
            var options = options || {};
            var defaults = {
                distance: 80, //滑动距离
                units: 'px', //默认单位
                touchStart: function () {}, //触摸开始回调
                opened: function () {}, //展开后回调
                closed: function () {}, //关闭后回调
                duration: 100, //毫秒
                deleteBtn: '.swipe-delete-btn', //删除元素
                direction: 'left', //滑动方向
                deleteClose: true, //点击删除是否 关闭
                deleteFn: function () {} //删除事件回调   retuan false 不关闭  //   retuan true 关闭
            };

            _self.options = _self.extend({}, defaults, options);
            _self.swipeEvent(element, _self.options);


        },
        swipeEvent: function (element, options) {
            var _self = this;
            var ele = element;
            var isMoved = false;
            var isTouched = true;
            var isScrolling = undefined; //目标对象位置
            var touchesDiff = 0; ////移动距离
            var startX = 0;
            var startPos = {
                x: 0,
                y: 0,
                startTime: +new Date
            };
            var scale = false;
            var isGo = false;
            var deleteBtn = ele.querySelectorAll(options.deleteBtn)[0]; //删除元素  可能是子元素   也可能同一级别 兄弟节点
            var deleteFn = options.deleteFn; //删除元素回调时间
            var distance = options.distance; //最大滑动距离
            var direction = options.direction;
            var deleteClose = options.deleteClose;
            var units = options.units;
            ele.setAttribute("data-lock", "false");
            if (!deleteBtn) {
                deleteBtn = ele.parentNode.nodeType == 1 && ele.parentNode.querySelectorAll(options.deleteBtn)[0];
                scale = true;
            };
            _self.direction = direction;
            deleteBtn.addEventListener('click', function (event) {
                var that = this;
                var event = event;
                var target = event.target;
                if (options.deleteClose == true) {
                    _self.swipeClose(ele, options);
                }
                if (options.deleteFn && options.deleteFn.apply(target, arguments) == true) {
                    _self.swipeClose(ele, options);
                }
                event.stopPropagation();
            });
            ele.addEventListener('click', function (event) {
                _self.swipeClose(ele, options);
            });
            ele.addEventListener('touchstart', function (event) {
                var touchs = event.touches[0]; //手指头的一个 
                if (!_self.allowMultiple) { //不允许同时  展示多个删除
                    // _self.swipeClose(ele,options)
                    //return false;
                }; //不能滑动 有没有 缩进去的
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                startPos = {
                    x: touchs.pageX || touchs.clientX,
                    y: touchs.pageY || touchs.clientY,
                    startTime: +new Date
                };
                ele.style.webkitTransitionDuration = ele.style.transitionDuration = "0s";
                startX = (ele.style.WebkitTransform.replace(/translateX\(/g, "").replace(/(px|rem|%)\)/g, "")) * 1 || (ele.style.transform.replace(/translateX\(/g, "").replace(/(px|rem|%)\)/g, "")) * 1 || 0;
                if (ele.getAttribute("data-lock") == "false") {
                    options.touchStart && options.touchStart.apply(ele, arguments);
                }
                document.addEventListener('touchmove', function (event) {
                    var event = event || window.event;
                    if (!isTouched) {
                        return;
                    }
                    if (event.touches.length > 1 || event.scale && event.scale !== 1) {
                        return;
                    }
                    var touchs = event.changedTouches[0];
                    var movPos = {
                        x: touchs.pageX || touchs.clientX,
                        y: touchs.pageY || touchs.clientY
                    };
                    if (typeof isScrolling === 'undefined') {
                        isScrolling = !!(isScrolling || Math.abs(movPos.x - startPos.x) < Math.abs(movPos.y - startPos.y));
                    }
                    if (isScrolling) {
                        isTouched = false;
                        return;
                    }
                    //event.preventDefault();
                    //if (!event.defaultPrevented) {
                    event.preventDefault();
                    //  }
                    _self.touchesDiff = movPos.x - startPos.x + startX; //滑动的距离
                    isMoved = true;
                    if (direction == 'left') { //向左滑
                        if (_self.touchesDiff >= 0) {
                            var l = isGo ? Math.abs(_self.touchesDiff) * 0.1 : 0;
                            ele.style.WebkitTransform = ele.style.transform = "translateX(" + l + units + ") translateZ(0)";
                        } else {
                            var l = Math.abs(_self.touchesDiff);
                            isGo = true;
                            ele.style.WebkitTransform = ele.style.transform = "translateX(" + -l + units + ") translateZ(0)";
                            if (l > distance) {
                                if (scale) {
                                    l = (distance + (l - distance) * 0.39);;
                                } else {
                                    l = distance;
                                }
                                ele.style.WebkitTransform = ele.style.transform = "translateX(" + -l + units + ") translateZ(0)";
                            }
                        }
                    }
                    if (direction == 'right') { //向右侧
                        if (_self.touchesDiff >= 0) {
                            var l = Math.abs(_self.touchesDiff);
                            isGo = true;
                            ele.style.WebkitTransform = ele.style.transform = "translateX(" + l + units + ") translateZ(0)";
                            if (l > distance) {
                                if (scale) {
                                    l = (distance + (l - distance) * 0.39);;

                                } else {
                                    l = distance;
                                }
                                ele.style.WebkitTransform = ele.style.transform = "translateX(" + l + units + " ) translateZ(0)";
                            }
                        } else {
                            var l = isGo ? Math.abs(_self.touchesDiff) * 0.1 : 0;
                            ele.style.WebkitTransform = ele.style.transform = "translateX(-" + l + units + ") translateZ(0)";
                        }
                    }
                });
                document.addEventListener('touchend', function (event) {
                    if (!isTouched || !isMoved) {
                        isMoved = false;
                        isTouched = false;
                        return;
                    }
                    isMoved = false;
                    isTouched = false;
                    isGo = false;
                    var touchs = event.changedTouches[0]; //手指头的一个  
                    var endPos = {
                        x: touchs.pageX || touchs.clientX,
                        y: touchs.pageY || touchs.clientY,
                        endTime: +new Date
                    };
                    var timeDiff = endPos.endTime - startPos.startTime;
                    var distance = options.distance;
                    var direction = options.direction;
                    var touchesDiff = _self.touchesDiff;
                    var action = "close";
                    //是否关闭状态
                    if (ele.getAttribute("data-lock") == 'true') {
                        action = 'open';
                    }
                    if (timeDiff < 300 && (touchesDiff < -10 && direction === 'left' || touchesDiff > 10 && direction === 'right') ||
                        timeDiff > 300 && (touchesDiff < -parseInt(distance / 3) && direction === 'left' || touchesDiff > parseInt(distance / 3) && direction === 'right')
                    )
                    {
                        if (action == 'close') {

                            _self.swipeOpen(ele, options)

                        } else {
                            _self.swipeClose(ele, options);
                            isGo = false;
                            event.preventDefault();
                        }
                    } else {
                        _self.swipeClose(ele, options);
                        isGo = false;
                        event.preventDefault();

                    }
                });
            });
            return this;
        },
        swipeClose: function (ele, options) {
            var _self = this;
            var ele = ele || _self.swipeElement;
            var options = options || _self.options;
            var fired = false;
            var endEvent = _self.endEvent;
            var units = options.units;
            var duration = Number(options.duration / 1000) || 100;
            var sa = 0;
            var handler = function (e) {
                ele.removeEventListener(endEvent, arguments.callee, false);
                fired = true;
                handler = null;
                sa++;
                if (sa > 1) { return }
                ele.setAttribute("data-lock", "false");
                options.closed && options.closed.apply(ele, arguments);;
                callback = null;

            };
            ele.style.WebkitTransform = ele.style.transform = "translateX(-" + 0 + units + ") ";
            ele.style.webkitTransitionDuration = ele.style.transitionDuration = duration + "s";
            ele.addEventListener(endEvent, handler.bind(this), false);
            setTimeout(function () {
                if (fired) {
                    return
                }
                handler();
            }, parseInt(duration + 25));

            return this;
        },
        swipeOpen: function (ele, options) {
            var _self = this;
            var ele = ele || _self.swipeElement;
            var options = options || _self.options;
            var distance = options.distance; //最大滑动距离
            var units = options.units;
            var duration = Number(options.duration / 1000) || 100;
            var sa = 0;
            var fired = false;
            var endEvent = _self.endEvent;
            var handler = function (e) {
                ele.removeEventListener(endEvent, arguments.callee, false);
                fired = true;
                handler = null;
                sa++;
                if (sa > 1) { return }
                ele.setAttribute("data-lock", "true");
                if (ele.getAttribute("data-lock") == "true") {
                    options.opened && options.opened.apply(ele, arguments);
                }
            };
            if (options.direction == "left") {
                distance = distance * -1;
            }
            ele.clientLeft;
            ele.style.WebkitTransform = ele.style.transform = "translateX(" + distance + units + ") ";
            ele.style.webkitTransitionDuration = ele.style.transitionDuration = duration + "s";
            ele.addEventListener(endEvent, handler.bind(this), false);
            setTimeout(function () {
                if (fired) {
                    return
                }
                handler();
            }, parseInt(duration + 25));
            return this;
        }
    };
    if (typeof exports == 'object') {
        module.exports = swipeDelete;
    }
    else if (typeof define == 'function' && define.amd) {
        define(function () {
            return swipeDelete;
        });
    }
    else {
        window.swipeDelete = swipeDelete;
    }
})(window, document);