;
(function (root, factory) {
    'use strict'
    // require es6 形式
    if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'), root);
    }
    if (typeof define === 'function') {
        // cmd的格式
        if (define.cmd) {
            define(function (require, exports, module) {
                var $ = require('jquery');
                factory($, root);
            });
        } else {
            // AMD 
            define(["jquery"], function ($) {
                factory($, root);
            });
        }
    } else {
        // 普通格式
        factory(root.jQuery, root);
    }
}(typeof window !== "undefined" ? window : this, function ($, root, undefined) {
    'use strict'
    if (!$) {
        $ = root.jQuery || null;
    }
    if (!$) {
        throw new TypeError("必须引入jquery库才能正常使用!");
    }
    /**
     * 思路: 传入 setting, data
     * 1. 数据  平滑以及处理好的
     * 2. 视图  渲染ui
     * 3. 事件  本身事件以及自定义事件
     */
    var consts = {
        event: {
            CLICK: "click",
            BEFORE_CLICK: "wtree_before_click",
            EXPAND: "wtree_expand",
            COLLAPSE: "wtree_collapse",
            ASYNC_SUCCESS: "wtree_async_success",
            ASYNC_ERROR: "wtree_async_error"
        },
    }
    var tools = {
        apply: function (fun, param, defaultValue) {
            if ((typeof fun) == "function") {
                return fun.apply(zt, param ? param : []);
            }
            return defaultValue;
        },
    }

    function WTree(obj, wSetting, wNodes) {
        wSetting = wSetting || {};
        this.treeId = '';
        this.treeObj = null;
        this.setting = {
            data: {
                key: {
                    children: "children",
                    name: "name",
                    title: "",
                    url: "url"
                },
                simpleData: {
                    enable: false,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPId: null
                },
            },
            view: {

            },
            callback: {
                onClick: null,
                beforeClick: null, // 自定义事件
            }
        };
        this.init(obj, wSetting, wNodes);

    }
    WTree.prototype = {
        constructor: WTree,
        // 初始化实例
        init: function (obj, wSetting, wNodes) {
            this.setting = $.extend(true, {}, this.setting, wSetting);
            this.buildNode(obj, this.setting, 0, wNodes);
        },
        // 构建节点
        buildNode: function (obj, setting, pid, wNodes) {
            var handler = this;
            var n = wNodes.length;
            var ul = document.createElement("ul");
            //循环创建顶级节点
            for (var i = 0; i < n; i++) {
                var node = wNodes[i];
                ul.appendChild(this.createNode(node));
            }
            obj.append(ul);
            // 绑定事件
            this.bindEvent(obj, setting);
        },
        // 生成ui
        createNode: function (node) {
            var handler = this;
            function createNode(curNode) {
                var li = document.createElement("li");
                li.style.listStyle = "none";
                //折叠图片
                var folder = document.createElement("img");
                folder.style.verticalAlign = "middle";
                folder.style.margin = 0;
                //文件夹图标
                var cb = document.createElement("input");
                cb.type = "checkbox";
                var a = document.createElement("a");
                a.data = curNode; // 数据的添加
                a.innerHTML = curNode.name;
                li.appendChild(folder);
                li.appendChild(a);
                if (curNode.children && curNode.children.length > 0) {
                    var len = curNode.children.length;
                    var child = document.createElement("ul");
                    for (var i = 0; i < len; i++) {
                        var item = curNode.children[i];
                        child.appendChild(handler.createNode(item));
                    }
                    li.appendChild(child);
                }
                return li;
            }
            return createNode(node);
        },
        // 事件绑定
        bindEvent: function (obj, setting) {
            var o = obj;
            var c = consts.event;
            // 传入节点
            o.on(c.CLICK, function (event) {
                var aim = event.target;
                var data = event.target.data;
                // 触发自定义事件
                o.trigger(c.BEFORE_CLICK, aim, data);
                // 获取当前点击的节点
                setting.callback.onClick.call(aim, data);
                aim.style.color = "red";

                // tools.apply(setting.callback.onClick, [srcEvent, treeId, node, clickFlag]);
            });
            o.on(c.BEFORE_CLICK, function (aim, data, event) {
                // 获取当前点击的节点
                setting.callback.beforeClick.call(aim, data);
                // tools.apply(setting.callback.onClick, [srcEvent, treeId, node, clickFlag]);
            });
        },
    }
    // 扩展到jq实例上面
    $.fn.wTree = function (setting, data) {
        return this.each(function (i, element) {
            var dom = $(element);
            this.treeId = dom.attr('id');
            this.treeObj = new WTree(dom, setting, data);
        });
    }
}))