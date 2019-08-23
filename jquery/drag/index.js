// /** 
//  * 1. 单个对象的拖拽
//  * 2. 多个对象的拖拽
//  */
// ;
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
    // 构建实例
    function Drag(options) {
        this.disX = 0;
        this.dixY = 0;
        this.options = options || {};
        this.init();
    }

    Drag.prototype.init = function () {
        var that = this;
        this.defaultOptions = {
            rangeFlag: false, // 默认不限定范围 
        }
        this.options = $.extend(true, {}, this.defaultOptions, this.options);
        this.obj = $(this.options.el);
        that.obj.mousedown(function (e) {
            var e = e || window.event;
            that.fnDown(e);
            document.onmousemove = function (e) {
                var e = e || window.event;
                that.fnMove(e);
            }
            document.onmouseup = function () {
                that.fnUp();
            }
            return false;
        })
    }
    Drag.prototype.fnDown = function (e) {
        this.disX = e.clientX - this.obj.offset().left;
        this.disY = e.clientY - this.obj.offset().top;
    }
    Drag.prototype.fnMove = function (e) {
        // 限定范围 0 - window.innerWidth;
        var rangeFlag = this.options.rangeFlag; // 是否限定范围
        var L = e.clientX - this.disX;
        var T = e.clientY - this.disY;
        // 限定范围
        if (rangeFlag) {
            var parent = this.obj.parent();
            var pW = parent.width();
            var pH = parent.height();
            if (L < 0) {
                L = 0;
            } else if (L > pW - this.obj.width()) {
                L = pW - this.obj.width();
            }
            if (T < 0) {
                T = 0;
            } else if (T > pH - this.obj.height()) {
                T = pH - this.obj.height();
            }
        }
        this.obj.css({
            left: L + 'px',
            top: T + 'px'
        });
    }
    Drag.prototype.fnUp = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    }
    $.fn.drag = function (options) {
        return new Drag(options);
    }
}));