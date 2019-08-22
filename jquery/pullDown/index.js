/** 
 * 1. 需求分析  上拉加载更多, 下拉刷新数据
 * 2. 接口设计  js基本事件 
*/

;(function (root, factory) {
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

}));
