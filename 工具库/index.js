/**
 * 处理动态表单中表单中的联动的数据问题
 * @param {*} ctx 传入的目标对象
 * @param {*} exp 执行的比较语句或者单纯的字符串
 * @param {*} defVal 传入的默认值
 */
function execExp(ctx, exp, defVal) {
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
/**
 * 
 * @param {*} obj 目标对象
 * @param {*} key 对应得key值
 */
function isEmpty(s) {
    return (s == null || s == undefined || s == "") ? true : false;
}

function getObjectValue(obj, key) {
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
/**
 * 设置目标对象的值
 * @param {*} obj 目标对象
 * @param {*} key 对应的键
 * @param {*} val 对应的值
 */
function setObjectValue(obj, key, val) {
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