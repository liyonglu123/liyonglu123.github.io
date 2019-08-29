/**
 * 将数据
 * @param {*} data 
 */
function toTree(data) {
    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        delete item.children;
    });
    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function (item) {
        map[item.id] = item;
    });
    // console.log(map);
    var val = [];
    data.forEach(function (item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.pid];
        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });
    return val;
}

// 实现简单对象的拷贝
function extend(obj1, obj2) {
    for (var key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            obj1[key] = obj2[key];
        }
    }
    return obj1;
}
// 判断对象是不是为空
function isEmpty(target) {
    let val;
    !target ? val == false : val == true;
    return val
}

// ==================
var settings = {};
var tools = {
    eqs: function (str1, str2) {
        return str1.toLowerCase() === str2.toLowerCase();
    },
    isArray: function (arr) {
        return Object.prototype.toString.apply(arr) === "[object Array]";
    },
}

/**
 * 思路: 
 * 1. 数据 处理成tree格式的数据
 * 2. 视图 渲染成对应格式的ui
 * 3. 行为 为元素添加事件的问题
 *
 */
var tools = {
    clone: function (obj) {
        if (obj === null) return null;
        var o = obj.constructor === Array ? [] : {};
        for (var i in obj) {
            o[i] = (obj[i] instanceof Date) ? new Date(obj[i].getTime()) : (typeof obj[i] === "object" ? arguments.callee(obj[i]) : obj[i]);
        }
        return o;
    }
}
// 构造函数
function WTree() {
    this.setting = {
        treeId: '',
        treeObj: null,
        view: {

        },
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
                pIdKey: "pId",
                rootPId: null
            },
        },
        callback: {

        }
    }

}
WTree.prototype = {
    constructor: WTree,

    // 初始化
    init: function (obj, wSetting, wNodes) {
        var setting = tools.clone(this.setting);
        $.extend(true, setting, wSetting);
        setting.treeId = obj.attr('id');
        setting.treeObj = obj;
        setting.treeObj.empty(); // 清空之前残留的文档
        settings[setting.treeId] = setting;
        var html = this.createNodes(setting, 0, wNodes);
        obj.html(html);
    },
    // 创建节点
    createNodes: function (setting, level, nodes, parentNode) {
        if (!nodes || nodes.length == 0) return;
        var str = '';
        forTree(nodes);
        function forTree(nodes) {
            for (var i = 0; i < nodes.length; i++) {
                var urlstr = "";
                var node = nodes[i];
                try {
                    urlstr = '<li><span>' + node.name + '</span><ul>';
                    str += urlstr;
                    if (node.children != null) {
                        forTree(node.children);
                    }
                    str += "</ul></li>";
                } catch (e) {}
            }
        }
        return str;
    },
}