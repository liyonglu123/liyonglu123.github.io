/** 
 * 1. 需求分析  上拉加载更多, 下拉刷新数据
 * 2. 接口设计  js基本事件 touch
 * 3. 调用方式  链式  $.fn等的实现
 */

;
(function (root, factory) {
    'use strict';
    if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'), root);
    }
    if (typeof define === "function") {
        if (define.cmd) {
            define(function (require, exports, module) {
                var $ = require("jquery");
                factory($, root);
            });
        } else {
            define(["jquery"], function ($) {
                factory($, root);
            });
        }
    } else {
        factory(root.jQuery, root);
    }
}(typeof window !== "undefined" ? window : this, function ($, root, undefined) {
    'use strict';
    var win = window;
    var doc = document;
    var $win = $(win);
    var $doc = $(doc);
    $.fn.pdscroll = function (options) {
        return new PDscroll(this, options);
    };
    // 构建实例
    function PDscroll(element, options) {
        var me = this;
        me.$element = element;
        me._scrollTop = 0;
        me.isData = true;
        me.defaultOptions = {
            scrollArea: me.$element,
            // 上方DOM
            domUp: {
                domClass: 'pdscroll-up',
                domRefresh: '<div class="pdscroll-refresh">↓下拉刷新</div>',
                domUpdate: '<div class="pdscroll-update">↑释放更新</div>',
                domLoad: '<div class="pdscroll-load"><span class="loading"></span>加载中...</div>'
            },
            // 下方DOM
            domDown: {
                domClass: 'pdscroll-down',
                domRefresh: '<div class="pdscroll-refresh">↑上拉加载更多</div>',
                domLoad: '<div class="pdscroll-load"><span class="loading"></span>加载中...</div>',
                domNoData: '<div class="pdscroll-noData">暂无数据</div>'
            },
            distance: 50, // 拉动距离
            dropdownRefreshFn: null, //  下拉刷新方法 
            pullUploadFn: null //  上拉加载方法 
        };
        me.init(options);
    }
    PDscroll.prototype = {
        constructor: PDscroll,
        // 初始化
        init: function (options) {
            var me = this;
            me.opts = $.extend(true, {}, me.defaultOptions, options);
            // 如果加载下方，事先在下方插入DOM   && me.$element.height() > $win.innerHeight - 20
            if (me.opts.pullUploadFn) {
                me.$element.append('<div class="' + me.opts.domDown.domClass + ' not-active">' + me.opts.domDown.domRefresh + '</div>');
                me.$domDown = $('.' + me.opts.domDown.domClass);
            }
            // 判断滚动区域
            if (me.opts.scrollArea == win) {
                me.$scrollArea = $win;
                // 获取文档高度
                me._scrollContentHeight = $doc.height();
                // 获取win显示区高度
                me._scrollWindowHeight = doc.documentElement.clientHeight;
            } else {
                me.$scrollArea = me.opts.scrollArea;
                me._scrollContentHeight = me.$element[0].scrollHeight;
                me._scrollWindowHeight = me.$element.height();
            }
            // 绑定触摸
            me.$element.on('touchstart', function (e) {
                if (!me.loading) {
                    fnTouches(e);
                    fnTouchstart(e, me);
                }
            });
            me.$element.on('touchmove', function (e) {
                if (!me.loading) {
                    fnTouches(e, me);
                    fnTouchmove(e, me);
                }
            });
            me.$element.on('touchend', function () {
                if (!me.loading) {
                    fnTouchend(me);
                }
            });
            // 加载下方
            me.$scrollArea.on('scroll', function () {
                me._scrollTop = me.$scrollArea.scrollTop();
                // 滚动页面触发加载数据
                if (me.opts.pullUploadFn && !me.loading && me._scrollContentHeight <= (me._scrollWindowHeight + me._scrollTop)) {
                    $(".pdscroll-down").removeClass("not-active").addClass("active");
                    pullUploadFn(me);
                }
            });
        },
        // 没有数据
        noData: function (flag) {
            var me = this;
            if (flag === undefined || flag == true) {
                me.isData = false;
            } else if (flag == false) {
                me.isData = true;
            }
        },
        // 重新加载数据
        reload: function () {
            var me = this;
            if (me.direction == 'down' && me.upInsertDOM) {
                me.$domUp.css({ 'height': '0' }).on('webkitTransitionEnd mozTransitionEnd transitionend', function () {
                    me.loading = false;
                    me.upInsertDOM = false;
                    $(this).remove();
                    fnRecoverContentHeight(me);
                });
            } else if (me.direction == 'up') {
                me.loading = false;
                // 如果有数据
                if (me.isData) {
                    // 加载区修改样式
                    me.$domDown.html(me.opts.domDown.domRefresh);
                    fnRecoverContentHeight(me);
                    // fnAutoLoad(me);
                } else {
                    // 如果没数据
                    me.$domDown.html(me.opts.domDown.domNoData);
                }
            }
        }
    }
    // 加载下方
    function pullUploadFn(me) {
        me.direction = 'up';
        me.$domDown.html(me.opts.domDown.domLoad);
        me.loading = true;
        me.opts.pullUploadFn(me);
    }
    // touch 事件
    function fnTouches(e) {
        if (!e.touches) {
            e.touches = e.originalEvent.touches;
        }
    }

    // touchstart
    function fnTouchstart(e, me) {
        me._startY = e.touches[0].pageY;
        // 记住触摸时的scrolltop值
        me.touchScrollTop = me.$scrollArea.scrollTop();
    }

    // touchmove
    function fnTouchmove(e, me) {
        me._curY = e.touches[0].pageY;
        me._moveY = me._curY - me._startY;

        if (me._moveY > 0) {
            me.direction = 'down';
        } else if (me._moveY < 0) {
            me.direction = 'up';
        }

        var _absMoveY = Math.abs(me._moveY);

        // 下拉刷新
        if (me.opts.dropdownRefreshFn && me.touchScrollTop <= 0 && me.direction == 'down') {
            e.preventDefault();
            me.$domUp = $('.' + me.opts.domUp.domClass);
            // 如果加载区没有DOM
            if (!me.upInsertDOM) {
                me.$element.prepend('<div class="' + me.opts.domUp.domClass + '"></div>');
                me.upInsertDOM = true;
            }

            fnTransition(me.$domUp, 0);

            // 下拉
            if (_absMoveY <= me.opts.distance) {
                me._offsetY = _absMoveY;
                me.$domUp.html(me.opts.domUp.domRefresh);
                // 指定距离 < 下拉距离 < 指定距离*2
            } else if (_absMoveY > me.opts.distance && _absMoveY <= me.opts.distance * 2) {
                me._offsetY = me.opts.distance + (_absMoveY - me.opts.distance) * 0.5;
                me.$domUp.html(me.opts.domUp.domUpdate);
                // 下拉距离 > 指定距离*2
            } else {
                me._offsetY = me.opts.distance + me.opts.distance * 0.5 + (_absMoveY - me.opts.distance * 2) * 0.2;
            }

            me.$domUp.css({ 'height': me._offsetY });
        }
    }
    // touchend
    function fnTouchend(me) {
        var _absMoveY = Math.abs(me._moveY);
        if (me.opts.dropdownRefreshFn && me.touchScrollTop <= 0 && me.direction == 'down') {
            fnTransition(me.$domUp, 300);

            if (_absMoveY > me.opts.distance) {
                me.$domUp.css({ 'height': me.$domUp.children().height() });
                me.$domUp.html(me.opts.domUp.domLoad);
                me.loading = true;
                me.opts.dropdownRefreshFn(me);
            } else {
                me.$domUp.css({ 'height': '0' }).on('webkitTransitionEnd mozTransitionEnd transitionend', function () {
                    me.upInsertDOM = false;
                    $(this).remove();
                });
            }
            me._moveY = 0;
        }
    }
    // 重新获取文档高度
    function fnRecoverContentHeight(me) {
        if (me.opts.scrollArea == win) {
            me._scrollContentHeight = $doc.height();
        } else {
            me._scrollContentHeight = me.$element[0].scrollHeight;
        }
    }
    // css过渡
    function fnTransition(dom, num) {
        dom.css({
            '-webkit-transition': 'all ' + num + 'ms',
            'transition': 'all ' + num + 'ms'
        });
    }
}));