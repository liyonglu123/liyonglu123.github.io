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
    'use strict';
    if (!$) {
        $ = root.jQuery || null;
    }
    if (!$) {
        throw new TypeError("必须引入jquery库才能正常使用！");
    }
    // 构造函数
    function WTree(setting, options) {
        
    }
    WTree.prototype = {
        constructor: WTree,
        // 初始化
        init: function() {

        }
    }
}));