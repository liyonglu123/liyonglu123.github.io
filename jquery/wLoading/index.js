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
    if (!$) {
        $ = root.jQuery || null;
    }
    if (!$) {
        throw new TypeError("必须引入jquery库才能正常使用！");
    }
    var arraySlice = Array.prototype.slice;
    // 比较两个对象是否完全相等
    function compare(origin, target) {
        if (typeof target !== "object") {
            //target不是对象/数组
            return origin === target; //直接返回全等的比较结果
        }

        if (typeof origin !== "object") {
            //origin不是对象/数组
            return false; //直接返回false
        }
        for (let key of Object.keys(target)) {
            //遍历target的所有自身属性的key
            if (!compare(origin[key], target[key])) {
                //递归比较key对应的value，
                //value不等，则两对象不等，结束循环，退出函数，返回false
                return false;
            }
        }
        //遍历结束，所有value都深度比较相等，则两对象相等
        return true;
    };
    // 构造WLoading 
    function WLoading(dom, options) {
        options = options || {};
        this.dom = dom;
        this.options = $.extend(true, {}, WLoading.defaultOptions, options); // 合并得到最新的options
        this.container = null;
        this.render().show();
    };
    WLoading.dataKey = "WLoading";
    WLoading.defaultOptions = {
        text: "加载中...",
        iconTag: "img",
        icon: "http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif",
        html: false,
        content: "", //设置content后，text和icon设置将无效
        mask: true //是否显示遮罩（半透明背景）
    };
    WLoading.prototype = {
        constructor: WLoading, // 防止无意间修改原型对象
        // 初始化dom元素
        initElement: function () {
            var dom = this.dom,
                ops = this.options;
            var containerElement = dom.children(".wloading"),
                bodyElement = containerElement.children('.wloading-body'),
                barElement = bodyElement.children('.wloading-bar'),
                iconElement = barElement.children('.wloading-icon'),
                textElement = barElement.find(".wloading-text");
            if (containerElement.length == 0) {
                containerElement = $('<div class="wloading"></div>');
                dom.append(containerElement);
            }
            if (bodyElement.length == 0) {
                bodyElement = $('<div class="wloading-body"></div>');
                containerElement.append(bodyElement);
            }
            if (barElement.length == 0) {
                barElement = $('<div class="wloading-bar"></div>');
                bodyElement.append(barElement);
            }
            if (iconElement.length == 0) {
                var _iconElement = document.createElement(ops.iconTag);
                iconElement = $(_iconElement);
                iconElement.addClass("wloading-icon");
                barElement.append(iconElement);
            }
            if (textElement.length == 0) {
                textElement = $('<span class="wloading-text"></span>');
                barElement.append(textElement);
            }

            this.containerElement = containerElement;
            this.bodyElement = bodyElement;
            this.barElement = barElement;
            this.iconElement = iconElement;
            this.textElement = textElement;
            return this;
        },
        // 渲染元素
        render: function () {
            var dom = this.dom,
                ops = this.options;
            this.initElement();
            // 判断是不是全屏
            if (dom.is("html") || dom.is("body")) {
                this.containerElement.addClass("wloading-full");
            } else {
                this.containerElement.removeClass("wloading-full");
                if (!dom.hasClass("wloading-container")) {
                    dom.addClass("wloading-container");
                }
            }
            // 判断是不是有蒙板
            if (ops.mask) {
                this.containerElement.addClass("wloading-mask");
            } else {
                this.containerElement.removeClass("wloading-mask");
            }
            // 根据options显示不同的内容
            if (ops.content != "" && typeof ops.content != "undefined") {
                if (ops.html) {
                    this.bodyElement.html(ops.content);
                } else {
                    this.bodyElement.text(ops.content);
                }
            } else {
                this.iconElement.attr("src", ops.icon);
                if (ops.html) {
                    this.textElement.html(ops.text);
                } else {
                    this.textElement.text(ops.text);
                }
            }
            return this;
        },
        // 设置options
        setOptions: function (options) {
            options = options || {};
            var oldOptions = this.options;
            this.options = $.extend(true, {}, this.options, options);
            // 比较新旧options 不等则重新渲染
            if (!compare(oldOptions, this.options)) {
                this.render();
            }
        },
        // 显示
        show: function () {
            var dom = this.dom,
                ops = this.options,
                barElement = this.barElement;
            this.containerElement.addClass("active");
            barElement.css({
                "marginTop": "-" + barElement.outerHeight() / 2 + "px",
                "marginLeft": "-" + barElement.outerWidth() / 2 + "px"
            });
            return this;
        },
        // 隐藏
        hide: function () {
            var dom = this.dom,
                ops = this.options;
            this.containerElement.removeClass("active");
            if (!dom.is("html") && !dom.is("body")) {
                dom.removeClass("wloading-container");
            }
            return this;
        },
        // 清除
        destroy: function () {
            var dom = this.dom,
                ops = this.options;
            this.containerElement.remove();
            if (!dom.is("html") && !dom.is("body")) {
                dom.removeClass("wloading-container");
            }
            dom.removeData(WLoading.dataKey);
            return this;
        }
    };
    // 扩展到jq实例上面
    $.fn.wLoading = function (options) {
        var ops = {},
            funName = "",
            funArgs = [];
        if (typeof options === "object") {
            ops = options;
        } else if (typeof options === "string") {
            funName = options;
            funArgs = arraySlice.call(arguments).splice(0, 1);
        }
        return this.each(function (i, element) {
            var dom = $(element),
                plsInc = dom.data(WLoading.dataKey);
            if (!plsInc) {
                plsInc = new WLoading(dom, ops);
            }

            if (funName) {
                var fun = plsInc[funName];
                if (typeof fun === "function") {
                    fun.apply(plsInc, funArgs);
                }
            }
        });
    }

}));