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
    //        console.log(map);
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

function WTree(data, options) {
    options = options || {};
    this.data = data;
    this.setting = {};
    this.init(options);
}

WTree.prototype = {
    constructor: WTree,
    // 初始化
    init: function (options) {
        this.setting = extend(this.setting, options);
        this.render();
    },
    render: function () {
        var parent =  $('<div class="wq-tree"></div>')
        parent.append(el);
        if (!menu.hasOwnProperty("children")) { //判断是否是叶子节点，根据自己的数据去判断
            return parent;
        }
        var ul = $('<ul/>');
        for (var i = 0; i < menu.children.length; ++i) {
            var li = $('<li/>');
            renderMenu(menu.children[i], li);
            ul.append(li);
        }

        parent.append(ul);
        return parent;
    }
}