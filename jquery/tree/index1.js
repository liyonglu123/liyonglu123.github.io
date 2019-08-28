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
tools = {
    eqs: function (str1, str2) {
        return str1.toLowerCase() === str2.toLowerCase();
    },
    isArray: function (arr) {
        return Object.prototype.toString.apply(arr) === "[object Array]";
    },
}

function WTree(data, options) {
    options = options || {};
    this.data = data;
    this.setting = {
        treeId: "",
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
                pIdKey: "pid",
                rootPId: null
            },
        }
    };
    this.init(options);
}

WTree.prototype = {
    constructor: WTree,
    // 初始化
    init: function (options) {
        this.setting = extend(this.setting, options);
        this.render(this.data);
    },
    // 渲染节点
    render: function (data) {
        var html = "";
        forTree(data);
        function forTree(data) {
            for (var i = 0; i < data.length; i++) {
                var urlstr = "";
                try {
                    urlstr = "<div><span><a href=" + data[i]["id"] + ">" + data[i]["name"] + "</a></span><ul>";
                    html += urlstr;
                    if (data[i]["children"] != null) {
                        forTree(data[i]["children"]);
                    }
                    html += "</ul></div>";
                } catch (e) {}
            }
        }
        return html;
    },
    // 转化成树形节点格式
    transferWTreeNode: function (data) {
        
    },
    // 转化成tree的格式
    transformTowTreeFormat: function (setting, sNodes) {
        var i, l,
            key = setting.data.simpleData.idKey,
            parentKey = setting.data.simpleData.pIdKey,
            childKey = setting.data.key.children;
        if (!key || key == "" || !sNodes) return [];

        if (tools.isArray(sNodes)) {
            var r = [];
            var tmpMap = [];
            for (i = 0, l = sNodes.length; i < l; i++) {
                tmpMap[sNodes[i][key]] = sNodes[i];
            }
            for (i = 0, l = sNodes.length; i < l; i++) {
                if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
                    if (!tmpMap[sNodes[i][parentKey]][childKey])
                        tmpMap[sNodes[i][parentKey]][childKey] = [];
                    tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
                } else {
                    r.push(sNodes[i]);
                }
            }
            return r;
        } else {
            return [sNodes];
        }
    }
}