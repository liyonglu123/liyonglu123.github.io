// 实现深度拷贝.
function clone(target) {
    if (typeof target !== 'object') return;
    //判断目标类型，来创建返回值
    var newObj = target instanceof Array ? [] : {};

    for (var item in target) {
        //只复制元素自身的属性，不复制原型链上的
        if (target.hasOwnProperty(item)) {
            newObj[item] = typeof target[item] == 'object' ? clone(target[item]) : target[item] //判断属性值类型
        }
    }
    return newObj
}
// 判断对象是不是为空
function isEmpty(target) {
    let val;
    !target ? val == false : val == true;
    return val
}
String.format = function() {
    var s = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        s = s.replace(/%[sd]/, arguments[i]);
    }
    return s;
}
String.isEmpty = function(s) {
        return (s === undefined || s === null || s === "") ? true : false;
    }
    // 过滤数组
Array.filter = function(arr, k, v) {
    conds = k;
    if (!isEmpty(k) && v !== undefined) {
        conds = {};
        conds[k] = v;
    }
    if (!arr || !(isArray(arr))) {
        return null;
    }
    var ret = [];
    if (!(isArray(conds))) {
        conds = [conds];
    }
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        for (var j = 0; j < conds.length; j++) {
            var cond = conds[j];
            if (typeof(cond) == "object" && typeof(item) == "object") {
                var flag = true;
                for (var k in cond) {
                    if (cond[k] != item[k]) {
                        flag = false;
                    }
                }
                if (flag) {
                    ret.push(item);
                }
            } else if (cond == item) {
                ret.push(item);
            }

        }

    }
    return ret.length > 0 ? ret : null;
}
var isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
var BTree = function(items, op) {
    // let defaultOptions = {
    //     selectedColor: 'white',
    //     selectedBackground: '#3a84d5',
    //     imgDir: "../images/tree/",
    //     itemClass: "btree",
    //     //lineClass: "BTREE_LINE",
    //     nameLength: 50,
    //     dirLine: true,
    //     fields: {
    //         name: "name",
    //         id: 'id',
    //         parentId: 'parentId',
    //         tag: "_tag",
    //         topName: null
    //     }
    // }
    // this.options = Object.assign({}, defaultOptions, op);
    this.options = op;
    this.init(items);
}
BTree.prototype = {
    maxSelections: 1,
    fields: { name: "name", id: 'id', parentId: 'parentId', tag: "_tag", topName: null },
    items: [],
    selectedItems: [],
    rootNode: null,
    container: null,
    NODE_DATA_KEY: "data",
    NODE_TYPE_KEY: "role",
    NODE_TYPE_TITLE: "title",
    NODE_TYPE_CHECKBOX: "checkbox",
    NODE_TYPE_ICON: "icon",
    NODE_TYPE_FOLDER: "folder",

    findItem: function(k, v) {
        if (isEmpty(k) || isEmpty(v)) {
            return null;
        }
        var ret = [];
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item["data"][k] == v) {
                ret.push(item);
            }
        }
        return ret.length > 0 ? ret : null;
    },
    setFields: function(p) {
        if (typeof(p) != "object")
            return;
        for (var k in p) {
            this.fields[k] = p[k];
        }
        if (!p["topName"]) {
            this.fields["topName"] = this.fields.name;
        }
    },
    init: function(items) {
        this.setOptions(this.options);
        this.items = [];
        var ds = clone(items);
        for (var i = 0; i < ds.length; i++) {
            this.items.push({ data: ds[i] });
        }
    },
    setOptions: function(op) {
        this.options = {
            imgDir: "../../../static/images/department/",
            expand: true,
            selectedColor: "white",
            selectedBackground: "skyblue",
            multiCheck: false,
            cascade: false,
            readonly: false,
            dragEnable: false,
            dirLine: true,
            nameLength: 50
        };
        if (op["fields"]) {
            this.setFields(op["fields"]);
        }
        for (var k in op) {
            this.options[k] = op[k];
        }
        if (this.options["readonly"]) {
            this.options["dragEnable"] = false;
        }

        if (!this.options.doubleClickHandle)
            this.options.doubleClickHandle = function() {
                return false;
            };
        if (!this.options.contextMenuHandle)
            this.options.contextMenuHandle = function() {
                return false;
            };

        // if (!this.options.plus)
        //     this.options.plus = this.options.imgDir + "st_icon_open.png";
        // if (!this.options.minus)
        //     this.options.minus = this.options.imgDir + "st_icon_open.png";
        if (!this.options.folderClosed)
            this.options.folderClosed = this.options.imgDir + "st_folder.gif";
        if (!this.options.folderOpen)
            this.options.folderOpen = this.options.imgDir + "st_folder_open.gif";
    },
    hasSelected: function(id) {
        for (var i = 0; i < this.selectedItems.length; i++) {
            if (this.selectedItems[i][this.fields.id] == id) {
                return true;
            }
        }
        return false;
    },
    selectItem: function(id, checked) {
        checked = checked === false ? false : true;
        var handler = this;
        var _check = function(itemId, flag) {
            var a = handler.findItem(handler.fields.id, itemId);
            for (var i = 0; a && i < a.length; i++) {
                var item = a[i];
                item["node"]["a"].style.background = checked ? handler.options.selectedBackground : "";
                item["node"]["a"].style.color = checked ? handler.options.selectedColor : "";
                item["node"]["cb"].checked = checked;

                var hasSelected = handler.hasSelected(item["data"][handler.fields.id]);
                //添加到选中列表
                if (checked && !hasSelected) {
                    handler.selectedItems.push(item["data"]);
                } else if (!checked && hasSelected) {
                    //从选中列表中删除
                    for (var j = 0; j < handler.selectedItems.length; j++) {
                        if (handler.selectedItems[j][handler.fields.id] == item["data"][handler.fields.id]) {
                            handler.selectedItems.splice(j, 1);
                        }
                    }
                }
            }
        };
        var _checkParent = function(itemId, flag) {
            var p = handler.getPath(itemId);
            for (var i = 0; p && i < p.length; i++) {
                _check(p[i][handler.fields.id], flag);
            }
        };
        var _checkChildren = function(itemId, flag) {
            var children = handler.findItem(handler.fields.parentId, itemId);
            for (var i = 0; children && i < children.length; i++) {
                _check(children[i]["data"][handler.fields.id], flag);
                _checkChildren(children[i]["data"][handler.fields.id], flag);
            }
        };
        _check(id, checked);
        if (this.options["cascade"]) {
            if (checked) {
                _checkParent(id, checked);
                _checkChildren(id, checked);
            } else {
                _checkChildren(id, checked);
            }
        }
    },
    getSelectedItems: function() {
        if (this.options["multiCheck"]) {
            return this.selectedItems.length > 0 ? this.selectedItems : null;
        } else {
            return this.selectedItems.length > 0 ? this.selectedItems[0] : null;
        }
    },
    getSelectedItem: function() {
        return this.getSelectedItems();
    },
    // 设置默认选中的节点  子节点没有选中
    setSelectedItems: function(a) {
        var cascade = this.options["cascade"];
        this.options["cascade"] = false;
        var b = [];
        for (var i = 0; a && i < a.length; i++) {
            var id = a[i];
            id = typeof(id) == "object" ? id[this.fields.id] : id;
            this.selectItem(id, true);
            b.push(id);
        }
        var c = [];
        for (var i = 0; i < this.selectedItems.length; i++) {
            var id = this.selectedItems[i][this.fields.id];
            if (!Array.filter(b, id)) {
                c.push(id);
            }
        }
        for (var i = 0; i < c.length; i++) {
            this.selectItem(c[i], false);
        }
        this.options["cascade"] = cascade;

    }
};

BTree.prototype.addEventHandler = function(container) {
    var op = this.options,
        fields = this.fields;
    var handler = this;
    var isMouseDown = false;
    var mirror = null;
    var srcElement = null;
    var evts = ["onmousedown", "onmouseover", "onmouseout", "onmouseup", "onclick"];
    var moveEvtHandler = {
        onmousedown: function() {
            if (this[handler.NODE_TYPE_KEY] == handler.NODE_TYPE_TITLE) {
                isMouseDown = true;
                srcElement = this;
                handler.rootNode.className += " move";
                document.body.className += " move";
            }
            return false;
        },
        onmousemove: function() {
            if (!isMouseDown || !srcElement)
                return false;
            if (!mirror) {
                mirror = document.createElement("span");
                mirror.style.padding = "5px";
                mirror.style.margin = 0;
                mirror.style.background = "#ccc";
                mirror.innerHTML = srcElement.innerHTML;
                mirror.style.position = "absolute";
                document.body.appendChild(mirror);
            }
            var evt = arguments[0] || window.event;
            mirror.style.zIndex = "1001";
            mirror.style.left = (evt.clientX + 10) + "px";
            mirror.style.top = (evt.clientY - 3) + "px";
        },
        onmouseover: function(evt) {
            if (!isMouseDown || !srcElement)
                return false;
            if (this[handler.NODE_TYPE_KEY] == handler.NODE_TYPE_TITLE) {
                var destElement = evt.srcElement || evt.target;
                var srcData = srcElement[handler.NODE_DATA_KEY];
                var destData = destElement[handler.NODE_DATA_KEY];
                var r = handler.getRelation(srcData[fields.id], destData[fields.id]);
                if (r != 0 && r != 5)
                    return false;
                this.className += "hover";
            }
            return false;
        },
        onmouseout: function(evt) {
            if (!isMouseDown || !srcElement)
                return false;
            if (this[handler.NODE_TYPE_KEY] == handler.NODE_TYPE_TITLE) {
                this.className = this.className ? this.className.replace(/hover/g, "").trim() : "";
                var destElement = evt.srcElement || evt.target;
                var srcData = srcElement[handler.NODE_DATA_KEY];
                var destData = destElement[handler.NODE_DATA_KEY];
                var r = handler.getRelation(srcData[fields.id], destData[fields.id]);
                if (r != 0 && r != 5)
                    return false;
            }
            return false;
            //如果是
            //if (handler.selectedItems)
            //if(handler.selectedItemId!=param)
            //	this.style.backgroundColor="transparent";
        },
        onmouseup: function(evt) {
            console.log(handler.rootNode.className);
            handler.rootNode.className = handler.rootNode.className.replace(/move/g, "").trim();
            document.body.className = document.body.className.replace(/move/g, "").trim();
            if (!isMouseDown)
                return false;
            if (this[handler.NODE_TYPE_KEY] == handler.NODE_TYPE_TITLE) {

                var destElement = evt.srcElement || evt.target;
                var srcData = srcElement[handler.NODE_DATA_KEY];
                var destData = destElement[handler.NODE_DATA_KEY];
                var r = handler.getRelation(srcData[fields.id], destData[fields.id]);
                if (r == 0 || r == 5) {
                    this.style.backgroundColor = "transparent";
                    handler.moveItem(srcData[fields.id], destData[fields.id]);
                }
            }
            if (mirror && mirror.parentNode) {
                mirror.parentNode.removeChild(mirror);
            }
            isMouseDown = false;
            mirror = null;
            srcElement = null;
        }
    };

    if (op["dragEnable"]) {
        document.body.onmousemove = function(evt) {
            moveEvtHandler["onmousemove"].call(evt.srcElement || evt.target, evt);
        };
        document.body.onmouseup = function(evt) {
            moveEvtHandler["onmouseup"].call(evt.srcElement || evt.target, evt);
        };
    }
    //点击事件单独处理 针对title 以及checkbox
    var _clickNode = function(evt) {
        var id = evt.data;
        if (op["multiCheck"]) {
            handler.selectItem(id, !handler.hasSelected(id));
        } else {
            for (var i = 0; i < handler.selectedItems.length; i++) {
                if (handler.selectedItems[i][fields.id] != id) {
                    handler.selectItem(handler.selectedItems[i][fields.id], false);
                }
            }
            handler.selectItem(id, true);
        }
    };
    var _expandEvent = function(evt) {
        var item = handler.findItem(fields.id, evt.data);
        if (!item) {
            return false;
        }
        item = item[0];
        var node = item["node"];
        if (node["child"].style.display == "none") {
            node["folder"].src = node["folder"]["_minus"];
            node["child"].style.display = "";
            node["icon"].src = op.folderOpen;
            item["expand"] = true;
        } else {
            node["folder"].src = node["folder"]["_plus"];
            node["child"].style.display = "none";
            node["icon"].src = op.folderClosed;
            item["expand"] = false;
        }
    };
    var _addMouseEvent = function(e) {
        container[e] = function(evt) {
            var o = evt.srcElement || evt.target;
            //拖拽
            if (op["dragEnable"] && typeof(moveEvtHandler[e]) == "function") {
                moveEvtHandler[e].call(o, evt);
            }
            var nodeType = o[handler.NODE_TYPE_KEY];
            if (!nodeType)
                return false;
            //
            var data = o[handler.NODE_DATA_KEY];
            var id = data[fields.id];
            if (e == "onclick") {
                evt.data = id;
                switch (nodeType) {
                    case handler.NODE_TYPE_TITLE:
                    case handler.NODE_TYPE_CHECKBOX:
                        {
                            if (handler.options["readonly"]) {
                                return false;
                            }
                            _clickNode.call(o, evt);
                            //回调
                            if (typeof(op[e]) == "function") {
                                var ret = handler.selectedItems;
                                if (!op["multiCheck"]) {
                                    ret = ret.length > 0 ? ret[0] : null;
                                }
                                evt.data = ret;
                                op[e].call(o, evt, handler);
                            }
                            break;
                        }
                    case handler.NODE_TYPE_FOLDER:
                        {
                            _expandEvent.call(o, evt);
                            break;
                        }
                };
            }
        }
    }
    for (var i = 0; i < evts.length; i++) {
        var e = evts[i];
        _addMouseEvent(e);
    }
};
BTree.prototype.createNode = function(item) {
    var data = item["data"];
    var handler = this,
        op = this.options,
        items = this.items,
        handler = this;
    var flag = false,
        _src = null,
        mirror = null,
        _srcId,
        _targetId = null;

    /*核心：生产节点*/
    function createNode(curItem) {
        var data = curItem["data"];
        var fields = handler.fields;
        var li = document.createElement("li");
        li.style.listStyle = "none";
        // li.className += "el-select-dropdown__item";
        //折叠图片
        var folder = document.createElement("img");
        folder.style.verticalAlign = "middle";
        folder.style.margin = 0;

        //文件夹图标
        var icon = folder.cloneNode(true);
        var cb = document.createElement("input");
        cb.type = "checkbox";

        var a = document.createElement("a");
        var name = data[fields["name"]];

        var tag = "";
        if (fields["tag"] && data[fields["tag"]]) {
            tag = data[fields["tag"]];
        }

        a.title = (name + tag);
        var len = op["nameLength"] ? op["nameLength"] : 50;
        name = name.substr(0, len - tag.length - 3);
        a.innerHTML = String.format("%s<b>%s</b>", name, tag);

        var _prop = function(o, d, nt) {
            o[handler.NODE_DATA_KEY] = d;
            o[handler.NODE_TYPE_KEY] = nt;
        };
        _prop(a, data, handler.NODE_TYPE_TITLE);
        _prop(cb, data, handler.NODE_TYPE_CHECKBOX);
        _prop(icon, data, handler.NODE_TYPE_ICON);
        _prop(folder, data, handler.NODE_TYPE_FOLDER);

        //保存节点
        curItem["node"] = {
            "a": a,
            "li": li,
            "icon": icon,
            "cb": cb,
            "folder": folder,
        };


        li.appendChild(folder);
        li.appendChild(icon);

        if (op["multiCheck"]) {
            li.appendChild(cb);
        }
        li.appendChild(a);
        var children = handler.findItem(fields.parentId, data[fields.id]);
        if (children) {
            var child = document.createElement("ul");
            for (var i = 0; i < children.length; i++) {
                child.appendChild(createNode(children[i]));
            }
            li.appendChild(child);
            curItem["node"]["child"] = child;
        }
        return li;
    }
    return createNode(item);
}
BTree.prototype.build = function(container) {
    var handler = this,
        op = this.options,
        items = this.items,
        handler = this;

    var n = items.length;
    var ul = document.createElement("ul");
    if (op.itemClass) ul.className = op.itemClass;

    //循环创建顶级节点
    for (var i = 0; i < n; i++) {
        var cond = {};
        cond[this.fields.id] = items[i]["data"][this.fields.parentId];
        var d = items[i];
        if (!handler.findItem(this.fields.id, d["data"][this.fields.parentId])) {
            ul.appendChild(this.createNode(d));
        }
    }
    this.rootNode = ul;
    this.setUI();
    container = container ? container : this.container;
    container.innerHTML = "";
    container.appendChild(ul);
    this.addEventHandler(container);
    this.container = container;
}
BTree.prototype.setIcon = function(id, iconPath) {
        var o = this.findItem(this.fields.id, id);
        if (o) {}
    }
    //根据id修改节点名称
BTree.prototype.setItemName = function(id, name) {
        var item = this.findItem(this.fields.id, id);
        if (item) {
            item = item[0];
            item["data"][this.fields.name] = name;
            item["node"]["a"].innerHTML = name;
        }
    }
    //设置tag
BTree.prototype.setTag = function(id, tag) {
    tag = tag ? tag : "";
    var o = this.findItem(this.fields.id, id);
    if (o) {
        o[0]._tag = tag;
        this.setItemName(id);
    }
}
BTree.prototype.setTop = function(p) {
    if (p) {
        for (var i = 0; i < this.items.length; i++) {
            var id = this.items[i]["data"][this.fields.id];
            if (!this.findItem(this.fields.id, id)) {
                this.items.push({ "data": p });
            }
        }
    }
};
BTree.prototype.getTopItem = function() {
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        var pid = item["data"][this.fields.parentId];
        if (!this.findItem(this.fields.id, pid)) {
            return item["data"];
        }
    }
    return null;
}
BTree.prototype.getAllTopItems = function() {
        var tops = [];
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            var pid = item["data"][this.fields.parentId];
            if (!this.findItem(this.fields.id, pid)) {
                tops.push(item["data"]);
            }
        }
        return tops.length > 0 ? tops : null;
    }
    //设置图标
BTree.prototype.setIcon = function(id, iconPath) {
        var o = this.findItem(this.fields.id, id);
        if (o) {
            o[0]["node"]["icon"].src = iconPath;
        }
    }
    /**
     * 移动节点 @para f:要移动的节点id 可以是数组，一次移动多个，parentId:目标节点
     * @param f
     * @param parentId
     */
BTree.prototype.moveItem = function(f, parentId) {
        var a = typeof(f) == "object" ? f : [f];
        for (var i = 0; i < a.length; i++) {
            var items = this.findItem(this.fields.id, a[i]);
            if (items) {
                items[0]["data"][this.fields.parentId] = parentId;
            }
        }
        this.build();
        this.update();
        //this.clickById(parentId);
    }
    /**
     * 0:没关系 1: 自身 2: 前者是后者父亲  3:爷爷，4：孩子，5，孙子
     * @param id1
     * @param id2
     * @returns {number}
     */
BTree.prototype.getRelation = function(id1, id2) {
        if (id1 == null || id2 == null)
            return 0;
        if (id1 == id2)
            return 1;
        var handler = this;

        function check(_id1, _id2) {
            var arr = handler.getPath(_id2);
            for (var i = 0, n = (arr ? arr.length : 0); i < n; i++)
                if (arr[i][handler.fields.id] == _id1) {
                    if ((i + 2) == n)
                        return 2;
                    else
                        return 3;
                };
            return null;
        }
        var flag1 = check(id1, id2),
            flag2 = check(id2, id1);
        return flag1 ? flag1 : (flag2 ? (flag2 == 2 ? 4 : 5) : 0);
    }
    //删除节点
BTree.prototype.remove = function(f) { //移除节点 可以移除多个
}
BTree.prototype.clickById = function(id) { //模拟点击事件
    if (!id)
        return false;
    var a = this.findItem(this.fields.id, id);
    for (var i = 0; a && i < a.length; i++) {
        var item = a[i];
        var a = item["node"]["a"];
        try {
            a.click();
        } catch (e) {
            var evt = a.ownerDocument.createEvent("MouseEvents");
            evt.initEvent("click", false, true);
            a.dispatchEvent(evt);
        }
    }
}
BTree.prototype.getPath = function(id) { //获取节点id路径 返回数组
    if (!id) {
        if (this.selectedItems.length == 0)
            return null;
        id = this.selectedItems[0][this.fields.id];
    }

    var handler = this;

    function getPath(i) {
        if (!i)
            return null;
        var o = handler.findItem(handler.fields.id, i);
        if (o) {
            o = o[0]["data"];
            var p = o[handler.fields.parentId] ? getPath(o[handler.fields.parentId]) : null;
            return p ? p.concat(o) : [o]
        }
        return null;
    }
    var a = getPath(id);
    return a;
}
BTree.prototype.getIdPathFrom = function(id) { //获取从id开始的子路径 返回包含数组的数组

}

BTree.prototype.add = function(f) { //添加节点
    var arr = null;
    if (isArray(f)) {
        arr = f;
    } else {
        arr = new Array();
        arr[0] = f;
    }
    var n = arr.length;
    for (var i = 0; i < n; i++)
    //没有重复id 就添加
        if (!this.findItem(this.fields.id, arr[i][this.fields.id])) {
            var pid = arr[i][this.fields.parentId],
                parentNode = null;
            if (pid == null || pid == undefined)
                parentNode = null;
            else {
                var p = this.findItem(this.fields.id, pid);
                if (p)
                    parentNode = p[0]["node"]["li"];
            }
            if (!parentNode)
                parentNode = this.rootNode.firstChild;
            if (parentNode.childNodes.length > 3)
                parentNode = parentNode.lastChild;
            else {
                var ul = document.createElement("ul");
                parentNode.appendChild(ul);
                parentNode = ul;
            }
            parentNode.appendChild(this.createNode(arr[i]));
            this.items[this.items.length] = arr[i];
        }
    this.setUI();
}
BTree.prototype.upwards = function(id) { //模拟点击父亲节点
    if (isEmpty(id)) {
        if (this.selectedItems.length > 0) {
            id = this.selectedItems[this.selectedItems.length - 1][this.fields.id];
        }
    }
    if (isEmpty(id))
        return;
    var o = this.findItem(this.fields.id, id);
    if (!o || !o[0][this.fields.parentId])
        return;
    this.clickById(o[0][this.fields.parentId]);
}
BTree.prototype.copy = function(continer, op) { //复制树
    var tree = new BTree(this.items, op ? op : this.options);
    tree.build(continer);
    return tree;
}
BTree.prototype.update = function(list) { //更新树
    if (list) {
        this.init(list);
    }
    this.build();
    var cascade = this.options["cascade"];
    this.options["cascade"] = false;
    for (var i = 0; i < this.selectedItems.length; i++) {
        this.selectItem(this.selectedItems[i][this.fields.id], true);
    }
    this.options["cascade"] = cascade;
}
BTree.prototype.setUI = function() { //画线
    var op = this.options;
    var handler = this;
    var items = this.items;
    var n = this.items.length;

    function _expandNode(node, minusIcon, plusIcon, flag) { //展开 合拢
        flag = flag === false ? false : true;
        node["icon"].src = flag ? op.folderOpen : op.folderClosed;
        node["folder"].src = op.imgDir + (flag ? minusIcon : plusIcon);
        node["folder"]["_minus"] = op.imgDir + minusIcon;
        node["folder"]["_plus"] = op.imgDir + plusIcon;

        if (node["child"]) {
            node["child"].style.display = flag ? "" : "none";
        }
    }

    for (var i = 0; i < n; i++) {
        var expand = op["expand"] ? true : false;
        var item = items[i];
        if (item["expand"] === false || item["expand"] === true) {
            expand = item["expand"];
        }
        var node = item["node"];
        var li = node["li"];
        var c1 = (!li.parentNode.parentNode || li.parentNode.parentNode.nodeType == 11) ? 0 : 1; //是否是顶级
        c1 = (li.parentNode == this.rootNode) ? 0 : 1;

        var c2 = li.previousSibling ? 1 : 0; //是否有前驱
        var c3 = li.nextSibling ? 1 : 0; //标记是否有后继

        var c4 = li.lastChild.tagName.toLowerCase() == "ul" ? 1 : 0; //标记是否有孩子

        c4 = c4 == 1 ? (li.lastChild.childNodes.length > 0 ? 1 : 0) : 0;
        var code = c1 * 1000 + c2 * 100 + c3 * 10 + c4;
        var cImg = op.folderClosed;

        if (!op.dirLine) {
            switch (code) {
                case 0:
                    { //1. 孤家寡人
                        li.removeChild(li.firstChild);
                        node["folder"].src = cImg;
                        break;
                    }
                case 1: //2. 只有子节点
                case 11: //4. 有后继有孩子
                case 101:
                case 1001:
                case 1101: //只有前驱和后继
                case 111:
                case 1111:
                case 1011: //8. 有前驱后继和孩子
                    {
                        _expandNode(node, "minus.gif", "plus.gif", expand);
                        break;
                    }
                case 10: //3. 只有后继
                case 100:
                case 1000:
                case 1100: //5. 只有前驱
                case 110:
                case 1010:
                case 1110:
                    {
                        node["icon"].src = cImg;
                        node["folder"].style.display = "none";
                        node["icon"].style.marginLeft = "18px";
                        break;
                    }
                default:
                    { break; }
            } //end switch
            continue;
        } else {
            switch (code) {
                case 0:
                    { //1. 孤家寡人
                        li.removeChild(li.firstChild);
                        node["folder"].src = cImg;
                        break;
                    }
                case 1:
                    { //2. 只有子节点  最顶级的节点展开
                        _expandNode(node, "st_icon_open.png", "st_icon.png", true);
                        node["child"].style.background = "url('" + op.imgDir + "st_icon_shu.png') repeat-y 6px 0";
                        break;
                    }
                case 10:
                    { //3. 只有后继
                        node["folder"].src = op.imgDir + "line1.gif";
                        node["icon"].src = cImg;
                        break;
                    }
                case 11:
                    { //4. 有后继有孩子
                        _expandNode(node, "st_icon_open.png", "st_icon.png", expand);
                        node["child"].style.background = "url('" + op.imgDir + "st_icon_shu.png') repeat-y 6px 0";
                        break;
                    }
                case 100:
                case 1000:
                case 1100:
                    { //5. 只有前驱
                        // node["folder"].src = op.imgDir + "st_node.gif";
                        node["icon"].src = cImg;
                        break;
                    }
                case 101:
                case 1001:
                case 1101:
                    { //6. 只有前驱和孩子
                        _expandNode(node, "st_icon_open.png", "st_icon.png", expand);
                        node["child"].style.background = "url('" + op.imgDir + "st_icon_shu.png') repeat-y 6px 0";
                        break;
                    }
                case 110:
                case 1010:
                case 1110:
                    { //7. 只有前驱和后继
                        // node["folder"].src = op.imgDir + "line3.gif";
                        node["icon"].src = cImg;
                        break;
                    }
                case 111:
                case 1111:
                case 1011:
                    { //8. 有前驱后继和孩子
                        _expandNode(node, "st_icon_open.png", "st_icon.png", expand);
                        node["child"].style.background = "url('" + op.imgDir + "st_icon_shu.png') repeat-y 6px 0";
                        break;
                    }
                default:
                    { break; }
            } //end switch
        }
    } //end for
}
var buildTree = function(ele, items, options) {
    var op = {
        selectedColor: 'white',
        selectedBackground: '#3a84d5',
        imgDir: "../../../static/images/department/",
        // itemClass: "btree",
        itemClass: "el-scrollbar__view el-select-dropdown__list",
        //lineClass: "BTREE_LINE",
        nameLength: 50,
        dirLine: true,
        fields: {
            name: "name",
            id: 'id',
            parentId: 'parentId',
            tag: "_tag",
            topName: null
        }
    };
    if (!options) {
        options = {};
    }
    // console.log("options", options);
    for (var k in options) {
        op[k] = options[k];
    }
    var tree = new BTree(items, op);
    tree.build(ele);
    return tree;
}
export { buildTree }
// $.fn.extend({
//     buildTree: function(items, options) {
//         var op = {
//             selectedColor: 'white',
//             selectedBackground: '#3a84d5',
//             imgDir: "../images/tree/",
//             itemClass: "btree",
//             //lineClass: "BTREE_LINE",
//             nameLength: 50,
//             dirLine: true
//         };
//         if (!options) {
//             options = {};
//         }
//         for (k in options) {
//             op[k] = options[k];
//         }
//         var tree = new BTree(items, op);
//         tree.build($(this).get(0));
//         return tree;
//     }
// });