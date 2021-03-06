/**
 * 对表格中的数据进行格式化处理，并取得缓存中的字典数据, 正规的数据不作处理
 * @param {*} row 表格中的行对象
 * @param {*} prop 传入的value 可能是组合(例如 "a b", "a-b"等)
 * @param {*} splitChar 分隔符 " ", "-"等
 */
export function tableDataFormat(row, prop, splitChar) {
    //   取值 并且换行处理
    let propArr = prop.split(splitChar);
    let valArr = [];
    //不需要取值
    propArr.forEach((item, index) => {
        valArr[index] = row[item] ? row[item] : '';
    });
    return valArr
}
/**
 * 用于过滤关键字
 * 拼音和汉字均可查询
 * @param {*} keyWord 搜索的关键字
 * @param {*} list 目标数组
 */
export function tranformPinyin(keyWord, list, title) {
    // console.log(pinyin('测试了', {
    //     style: pinyin.STYLE_NORMAL, // 设置拼音风格
    // }));
    var arr = [];
    list.forEach(item => {
        if (item[title].indexOf(keyWord) >= 0) {
            arr.push(item);
        } else {
            // 不是汉字
            // 每一项转化为拼音 == 返回一个数组
            let keyWordPinyinArr = pinyin(item[title], {
                style: pinyin.STYLE_NORMAL, // 设置拼音风格
            });
            // console.log(keyWordPinyinArr);
            // console.log(deepFlatten(keyWordPinyinArr));
            // console.log(deepFlatten(keyWordPinyinArr).join(''));
            if (deepFlatten(keyWordPinyinArr).indexOf(keyWord) >= 0) {
                arr.push(item);
            }
        }
    });
    return arr;
}

/**
 * 数组多层嵌套改为一层
 * @param {*} arr 目标数组
 */
export function deepFlatten(arr) {
    return [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v));
}

/**
 * 转化为树形结构数据结构
 * @param {*} data  传入的数组
 */
export function transformTree(data) {
    // 删除 所有 children,以防止多次调用
    data.forEach(function(item) {
        delete item.children;
    });

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function(item) {
        map[item.id] = item;
    });
    // console.log(map);
    var val = [];
    data.forEach(function(item) {
        // 以当前遍历项的parentId,去map对象中找到索引的id
        var parent = map[item.parentId];
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
/**
 * 遍历数组,获取对象中的每一个元素对应的值吗,并存入数组
 * @param {*} obj 
 */
export function getEachObjVal(array, needKey) {
    let valArr = [];
    array.forEach(item => {
        for (const key in item) {
            if (item.hasOwnProperty(key) && needKey == key) {
                const val = item[needKey];
                valArr.push(val);
            }
        }
    });
    return valArr
}

/**
 * 时间格式化
 * @param {*} fmt  形式
 * @param {*} date 日期
 */
export function dateFtt(fmt, date) {
    if (typeof(date) == "string") {
        let t = Date.parse(date);
        date = new Date(t);
    }
    var o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日   
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 * 对开始和结束的时间进行格式化处理 这里也可以不是时间
 * @param {*} date 目标时间
 */
export function setNeedTime(key, date, fmtText) {
    let time;
    if (date instanceof Date) {
        (key.toLowerCase().indexOf("begin")) > 0 ? time = dateFtt(fmtText, new Date(date.setHours(0, 0, 0))) : (key.toLowerCase().indexOf("end")) ? time = dateFtt(fmtText, new Date(date.setHours(23, 59, 59))) : dateFtt(fmtText, date);
    } else {
        time = date;
    }
    return time;
}
/**
 * 实现对象的深拷贝
 * @param {*} target 
 */
export function deepCopy(target) {
    if (typeof target !== 'object') return;
    //判断目标类型，来创建返回值
    var newObj = target instanceof Array ? [] : target instanceof Date ? target : {};
    if (target == null) {
        newObj = null;
        return newObj
    }

    for (var item in target) {
        //只复制元素自身的属性，不复制原型链上的
        if (target.hasOwnProperty(item)) {
            newObj[item] = typeof target[item] == 'object' ? deepCopy(target[item]) : target[item] //判断属性值类型
        }
    }
    return newObj
}

/**
 *
 *
 * @export 过滤空值 一层或者多层时候
 * @param {*} target
 */
export function filterEmpty(target) {
    if (typeof target !== 'object') return;
    //判断目标类型，来创建返回值
    var newObj = target instanceof Array ? [] : {};
    for (var item in target) {
        //只复制元素自身的属性，不复制原型链上的
        if (target.hasOwnProperty(item)) {
            if (typeof target[item] == 'number' && target[item] == 0) {
                newObj[item] = 0;
            } else {
                newObj[item] = typeof target[item] == 'object' ? filterEmpty(target[item]) : target[item] ? target[item] : null;
            }

        }
    }
    return newObj
}
/**
 * 删除axios中参数为空的
 * @param {*} obj  目标对象
 */
export function deleteEmptyArgs(obj) {
    if (Object.keys(obj).length > 0) {
        for (var key in obj) {
            if (typeof(obj[key]) != 'boolean' && typeof(obj[key]) != 'number') {
                if (obj[key] == '' || obj[key] == undefined || obj[key] == 'all' || (obj[key] instanceof Array && obj[key].length === 0))
                    delete obj[key];
            }
        }
    }
    return obj;
}

/**
 * 重置筛选条件
 * @param {*} obj  目标对象
 */
export function resetEmptyArgs(target) {
    if (typeof target !== 'object') return;
    //判断目标类型，来创建返回值
    for (var item in target) {
        //只复制元素自身的属性，不复制原型链上的 这里的全部还没进行处理哦
        if (target.hasOwnProperty(item)) {
            if (Object.prototype.toString.call(target[item]) === '[object Number]' || Object.prototype.toString.call(target[item]) === '[object String]' || Object.prototype.toString.call(target[item]) === '[object Null]' || Object.prototype.toString.call(target[item]) === '[object Undefined]') {
                target[item] = '';
            } else {
                target[item] instanceof Array ? target[item] = [] : target[item] = {};
            }
        }
    }
    return target;
};
/*
 * 给首个对象中存在的属性赋值
 * @param {*} obj  被赋值对象
 * @param {*} args  给值对象(参数必须为objcet)
 * @return {*} returnObj  返回值
 */
export function partAssign(obj, ...args) {
    let returnObj = Object.assign({}, obj)
    if (args && args.length > 0) {
        args.forEach((item, index) => {
            if (typeof item != 'object' || !(item instanceof Object)) {
                throw new Error("参数必须为object")
            } else {
                for (let subItem in item) {
                    if (returnObj.hasOwnProperty(subItem) && item.hasOwnProperty(subItem)) {
                        if (item[subItem] != undefined && item[subItem] != null) {
                            returnObj[subItem] = item[subItem]
                        }
                    }
                }
            }
        })
    }
    return returnObj
}
/*
 * 下载文件
 * @param {*} data  文件数据
 * @param {*} fileName  文件名字
 * 浏览器执行文件下载
 */
export function downloadFileCmp(data, fileName) {
    let blob = new Blob([data], {
        type: "application/octet-stream"
    });
    let filename = fileName || "filename.xls";
    if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        var blobURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", filename);
        if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
}
export function isEmpty(s) {
    return (s == null || s == undefined || s == "") ? true : false;
}
export function getObjectValue(obj, key) {
    if (isEmpty(key) || isEmpty(obj)) {
        return undefined;
    }
    var a = key.split(".");
    var v = obj;
    for (var i = 0; i < a.length && a[i]; i++) {
        var m = a[i].match(/(\w+)(\[(\d+)\])?$/);
        if (!m) {
            return undefined;
        }
        var k = m[1];
        var index = m[3];
        v = v[k];
        if (v && index) {
            v = v[index];
        }
        if (isEmpty(v)) {
            return v;
        }
    }
    return v;
}
export function setObjectValue(obj, key, val) {
    if (!key || !obj) {
        return false;
    }
    var a = key.split(".");
    var o = obj;
    for (var i = 0, n = a.length; i < n - 1; i++) {
        var m = a[i].match(/(\w+)(\[(\d+)?\])?$/);
        // console.log(m);
        if (!m) {
            return false;
        }
        var k = m[1];
        var isArray = m[2] != undefined;
        var index = m[3];
        if (!o[k]) {
            if (isArray) {
                o[k] = [];
            } else {
                o[k] = {};
            }
        }
        o = o[k];
        if (isArray && index >= 0) {
            if (!o[index]) {
                var tmp = {};
                o.push(tmp);
            }
            o = o[index];
        }
    }
    var k = a[a.length - 1];
    o[k] = val;
    return true;
}
export var isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
export function execExp(ctx, exp, defVal) {
    // if exp is function    
    if (typeof(exp) == "function") {
        try {
            return exp();
        } catch (e) {
            console.log(e, exp);
        }
        return defVal;
    }

    let _exec = function(ctx, exp, defVal) {
        let cmds = [];
        if (ctx) {
            for (let k in ctx) {
                if (k != 'delete') {
                    cmds.push("var " + k + " = ctx['" + k + "']");
                }
            }
        }
        cmds.push(exp);
        let ret = defVal;
        try {
            let cmdStr = cmds.join(";");
            ret = eval(cmdStr);
        } catch (e) {
            console.log("exec error:", e, exp);
            ret = defVal;
        }
        return ret;
    }
    let ret = _exec(ctx, exp, defVal);
    return ret;
}
Object.clone = function(obj) {
        if (!obj) {
            return obj;
        }
        if (typeof(obj) == "object") {
            let s = JSON.stringify(obj);
            let ret = JSON.parse(s);
            return ret;
        }
        let s = obj;
        return s;
    }
    /**
     * 把obj2的值合并到obj1中
     */
Object.extend = function(obj1, obj2, allowEmpty) {
        if (!obj1 || !obj2) {
            return;
        }
        for (let k in obj2) {
            let v2 = obj2[k];
            //如果是空的
            if (!allowEmpty && isEmpty(v2)) {
                continue
            }
            if (allowEmpty && isEmpty(v2)) {
                obj1[k] = v2;
                continue;
            }
            let v1 = obj1[k];
            if (isEmpty(v1)) {
                obj1[k] = Object.clone(v2);
                continue;
            }
            if (typeof(v1) == "object") {
                if (Object.prototype.toString.call(v1) == Object.prototype.toString.call(v2)) {
                    Object.extend(v1, v2, allowEmpty);
                } else {
                    continue;
                }
                continue;
            }
            obj1[k] = obj2[k];
        }
    }
    //把obj2中与obj1中有相同字段的值赋值到obj1里
Object.transfer = function(obj1, obj2, allowEmpty) {
    if (!obj1 || !obj2) {
        return;
    }
    for (let k in obj1) {
        let v2 = obj2[k];
        //如果是空的
        if (!allowEmpty && isEmpty(v2)) {
            continue
        }
        if (allowEmpty && isEmpty(v2)) {
            obj1[k] = v2;
            continue;
        }
        let v1 = obj1[k];
        if (isEmpty(v1)) {
            obj1[k] = Object.clone(v2);
            continue;
        }
        if (typeof(v1) == "object") {
            if (Object.prototype.toString.call(v1) == Object.prototype.toString.call(v2)) {
                Object.extend(v1, v2, allowEmpty);
            } else {
                continue;
            }
            continue;
        }
        obj1[k] = obj2[k];
    }
}
String.short = function(s, len, type) {
    if (!len) {
        len = 10;
    }
    len -= 3;
    if (s.length <= (len + 3)) {
        return s;
    }
    let ret = "...";
    switch (type) {
        //省略右边
        case 'right':
            {
                ret = s.substr(0, len) + ret;
                break
            }
            //省略中间
        case 'middle':
            {
                let leftLen = len / 2;
                ret = s.substr(0, leftLen) + ret + s.substr(s.length - len + leftLen);
                break
            }
            //省略左边
        default:
            {
                ret = ret + s.substr(s.length - len)
                break
            }
    }
    return ret;
}
Date.format = dateFtt;
/**
 * 货币处理 方法
 * @param value(String), currency("$"), decimals(2), issign(true/false)
 * returns oldValue
 * returns sign + currency + head + body + back
 **/
export function formatCurrency(value, currency, decimals, issign) {
    const digitsRE = /(\d{3})(?=\d)/g
    const oldValue = value
    value = parseFloat(value)
    if (!isFinite(value) || (!value && value !== 0)) {
        return oldValue
    }
    currency = currency != null ? currency : ''
    decimals = decimals != null ? decimals : 0
    let sign = ''
    issign = issign != null ? issign : ''
    if (!!issign) {
        sign = value > 0 ? '-' : '+'
    }
    // value = front(head + body) + back
    let stringify = Math.abs(value).toFixed(decimals).toString()
    let front = decimals ? stringify.slice(0, -1 - decimals) : stringify
    let head = front.length % 3
    let body = front.slice(head).replace(digitsRE, '$1,')
    if (head > 0) {
        head = front.slice(0, head) + (front.length > 3 ? ',' : '')
    } else {
        head = ''
    }
    let back = decimals ? stringify.slice(-1 - decimals) : ''
    return sign + currency + head + body + back
}
/**
 *
 * 实现数字的千分位逗号分隔
 * @export
 * @param {*} num
 * @returns
 */
export function numFormatThousand(num) {
    var c = (num.toString().indexOf('.') !== -1) ? num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : num.toString().replace(/\d(?=(\d{3})+$)/g, '$&,');
    // var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return c;
}

/**
 * 数据结构扁平化
 * @param obj Object
 * @return result Object
 */
function flatten(obj) {
    var result = {};

    function recurse(src, prop) {
        var toString = Object.prototype.toString;
        if (toString.call(src) == '[object Object]') {
            var isEmpty = true;
            for (var p in src) {
                isEmpty = false;
                recurse(src[p], prop ? prop + '.' + p : p)
            }
            if (isEmpty && prop) {
                result[prop] = {};
            }
        } else if (toString.call(src) == '[object Array]') {
            var len = src.length;
            if (len > 0) {
                src.forEach(function(item, index) {
                    recurse(item, prop ? prop + '.[' + index + ']' : index);
                })
            } else {
                result[prop] = [];
            }
        } else {
            result[prop] = src;
        }
    }
    recurse(obj, '');

    return result;
}
/**
 * 数据结构层次化
 * @param obj Object
 * @return result Object
 */
function unflatten(data) {
    if (Object(data) !== data || Array.isArray(data))
        return data;
    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
        resultholder = {};
    for (var p in data) {
        var cur = resultholder,
            prop = "",
            m;
        while (m = regex.exec(p)) {
            cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
            prop = m[2] || m[1];
        }
        cur[prop] = data[p];
    }
    return resultholder[""] || resultholder;
}
/**
 * 数据结构层次化
 * @param obj Object
 * @return result Object
 */
function unflatten2(data) {
    if (Object(data) !== data || Array.isArray(data))
        return data;
    var result = {},
        cur, prop, idx, last, temp;
    for (var p in data) {
        cur = result, prop = "", last = 0;
        do {
            idx = p.indexOf(".", last);
            temp = p.substring(last, idx !== -1 ? idx : undefined);
            cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
            prop = temp;
            last = idx + 1;
        } while (idx >= 0);
        cur[prop] = data[p];
    }
    return result[""];
}
/**
 * 数据过滤
 * @param newData Object
 * @param oldData Object
 * @return result Object
 */
export function filterData(newData, oldData) {
    if (typeof newData != "object" || typeof oldData != "object") {
        throw new Error("参数必须为object")
    }
    let newFlattenData = flatten(newData)
    let oldFlattenData = flatten(oldData)
    console.log(newFlattenData)
    console.log(oldFlattenData)
    let copyFlattenData = {}
    for (let item in newFlattenData) {
        if (oldFlattenData.hasOwnProperty(item) && (newFlattenData[item] != oldFlattenData[item])) {
            copyFlattenData[item] = newFlattenData[item]
        }
        if (!oldFlattenData.hasOwnProperty(item)) {
            copyFlattenData[item] = newFlattenData[item]
        }
        let split = item.split('.')
        let length = split.length
        let str = split[length - 1]
        if (str == 'id') {
            copyFlattenData[item] = newFlattenData[item]
        }
    }
    let result = unflatten(copyFlattenData)
    return result
}
/**
 * 验证重复元素，有重复返回true；否则返回false
 * @param arr 
 * @return 
 */
export function isRepeat(arr) {
    var hash = {};
    for (var i in arr) {
        if (hash[arr[i]]) {
            return true;
        }
        // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
        hash[arr[i]] = true;
    }
    return false;
}

/**
 * url的解析
 * @param {*} url  目标url
 */
export function parseURL(url) {
    var queryObj = {};
    var reg = /[?&]([^=&#]+)=([^&#]*)/g;
    var querys = url.match(reg);
    if (querys) {
        for (var i in querys) {
            var query = querys[i].split('=');
            var key = query[0].substr(1),
                value = query[1];
            queryObj[key] ? queryObj[key] = [].concat(queryObj[key], value) : queryObj[key] = value;
        }
    }
    return queryObj
}