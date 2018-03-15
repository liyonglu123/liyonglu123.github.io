export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    // const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    const format = cFormat || '{y}-{m}-{d}' // 时间的格式
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}
export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}
/**************************************时间格式化处理************************************/
export function dateFtt(fmt, date) {
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
// 获取今天,昨天,最近7天的开始时间和结束时间
/**
 * today: 当前天
 * yesterday: 昨天
 * week: 最近7天
 * 23, 59, 59, 0  
 * 0,0,0,0
 */
export function getNeedTime(time, date) {
    const obj = {
        createTimeStart: '',
        createTimeEnd: ''
    };
    // 今天
    if (time == 'today') {
        var nowStartDate = new Date(new Date().setHours(0, 0, 0, 0));
        var nowEndDate = new Date(new Date().setHours(23, 59, 59, 9));
        obj.createTimeStart = dateFtt("yyyy-MM-dd hh:mm:ss.S", nowStartDate);
        obj.createTimeEnd = dateFtt("yyyy-MM-dd hh:mm:ss.S", nowEndDate);
        return obj
    }
    // 昨天
    if (time == 'yesterday') {
        var nowStartDate = new Date(new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000);
        var nowEndDate = new Date(new Date().setHours(23, 59, 59, 9) - 24 * 60 * 60 * 1000);
        obj.createTimeStart = dateFtt("yyyy-MM-dd hh:mm:ss.S", nowStartDate);
        obj.createTimeEnd = dateFtt("yyyy-MM-dd hh:mm:ss.S", nowEndDate);
        return obj
    }
    // 昨天
    if (time == 'week') {
        var nowStartDate = new Date(new Date().setHours(0, 0, 0, 0) - 6 * 24 * 60 * 60 * 1000);
        var nowEndDate = new Date(new Date().setHours(23, 59, 59, 9));
        obj.createTimeStart = dateFtt("yyyy-MM-dd hh:mm:ss.S", nowStartDate);
        obj.createTimeEnd = dateFtt("yyyy-MM-dd hh:mm:ss.S", nowEndDate);
        return obj
    }
    // 搜索的时候的输入的是同一天的情况下
    if (time == 'same') {
        var beginDateStart = new Date(new Date(date).setHours(0, 0, 0, 0));
        var endDateEnd = new Date(new Date(date).setHours(23, 59, 59, 9));
        obj.createTimeStart = dateFtt("yyyy-MM-dd hh:mm:ss.S", beginDateStart);
        obj.createTimeEnd = dateFtt("yyyy-MM-dd hh:mm:ss.S", endDateEnd);
        return obj
    }
}
//为数字添加千位符
export function toThousands(num) {
    var num = (num || 0).toString(),
        result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}
// 活动列表中分转化为万的方法
export function minutesToTenThousand(num) {
    // 遍历字符传
    if (num) {
        var prev = num.toString().substring(0, num.toString().length - 5);
        var next = prev.substring(0, prev.length - 1);
        var thousands = prev.substring(prev.length - 1);
    }
    return next + '.' + thousands + '万元'
}
// 对象转化为数组 acs码 属于同一个类型的时候
export function ObjTranlateArr(object) {
    var obj = {
        arrKey: [],
        arrValue: []
    }
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var element = object[key];
            obj.arrValue.push(element);
            obj.arrKey.push(key)
        }
    }
    return obj
}
// 数组中的元素求和
export function sumData(array) {
    var sum = 0;
    array.forEach(function (element) {
        element = Number(element);
        sum += element;
    }, this);
    return sum
}
// 数组的随机排序  可以根据大小进行不同的排序的使用 
export function randomSort(a, b) {
    return Math.random()- 0.5;
}

// 数字格式化方法
export function numFormat(num) {
    var NUM,
        rules; //判断规则
    if (num === undefined || num === null) return '0';
    NUM = Number(num);
    if (NUM < 10000) return NUM;
    rules = [{
        //大于一万
        match: function (param) {
            return param >= 10000 && param < 10000000;
        },
        action: function (param) {
            param = (Math.round(param / 1000)) / 10 + '万';
            return param;
        }
    },
    {
        //大于1000万
        match: function (param) {
            return param >= 10000000 && param < 1000000000;
        },
        action: function (param) {
            param = (Math.round(param / 1000000)) / 10 + '千万';
            return param;
        }
    },
    {
        //大于1亿
        match: function (param) {
            return param >= 1000000000;
        },
        action: function (param) {
            param = (Math.round(param / 10000000)) / 10 + '亿';
            return param;
        }
    }]
    for (var i = 0; i < rules.length; i++) {
        if (rules[i].match(NUM)) {
            return rules[i].action(NUM);
        }
    }
};

//首頁签约数字格式化
export function signNumFormat(num) {
    num = num + '';
    if (num == 'undefined' || num == 'null') num = '0';
    var length = num.length;
    var zero_len = 9 - num.length;
    length < 9 ? num = (Math.pow(10, zero_len) + '').substring(1) + num : null;
    return num.substring(0, 3) + ',' + num.substring(3, 6) + ',' + num.substring(6);
}
// 左边地图导航的数据处理

function addFirstObj(item) {
    return {
        name: "全部",
        value: item.name
    }
}
//处理返回的地区数据为  下拉菜单栏 所需的数据结构
// export function mapDataHandle(data) {
//   data.forEach(function (item) {
//     !item.code && (item.code = item.name)
//     if (item.children && item.children.length > 0) {
//       var firstCode = item.code;
//       item.children.unshift(addFirstObj(item));
//       item.children.forEach(function (item) {
//         !item.code && (item.code = (firstCode + '-' + item.name))
//         if (item.children && item.children.length > 0) {
//           var secondCode = item.code;
//           item.children.unshift(addFirstObj(item));
//           item.children.forEach(function (item) {
//             !item.code && (item.code = (secondCode + '-' + item.name))
//           })
//         }
//       })
//     }
//   })
//   return data
// }
//处理返回的地区数据为  级联菜单 所需的数据结构
export function mapDataHandle(data) {
    // debugger
    data.forEach(function (item) {
        !item.value && (item.label = item.value = item.name);
        if (item.children && item.children.length > 0) {
            mapDataHandle(item.children);
        }
    })
    // console.log(data);
    return data;
}
/**
 * 
 * @param  method 请求方法
 * @param  data 该方法的数据
 */
export function delayRequest(method, data, context) {
    if (method.timer) {
        clearTimeout(method.timer)
    }
    // debugger
    var delay = new Promise((resolve, reject) => {
        method.timer = setTimeout(function () {
            method.call(context, data);
            resolve('complete');
        }, 500);

    })
    return delay;
}
/**
 * 
 * @param  mapName 当前地图的名称
 */
export function hoverName(mapName) {
    if (!mapName) return "";
    var length;
    var nameArr = [];
    if (mapName.indexOf('-') === -1) return mapName;
    nameArr = mapName.split('-');
    length = nameArr.length - 1;
    return nameArr[length];
}
/**
 * 将地图名称转化为请求所需参数，返回省市区组成的对象
 * @param  mapName 当前地图的名称
 */
export function toParamName(mapName) {
    if (!mapName) return "";
    if (mapName.indexOf('-') < 0) {
        return {
            province: mapName
        }
    } else {
        var areaArray = mapName.split('-');
        return {
            province: areaArray[0],
            city: areaArray[1],
            region: areaArray[2],
        }
    }
}
/**
 * 将对象处理为由value组成的数组
 * @param  data 需要转换的数据
 */
//输入示例
// "高血压": {
//     "contract": 41766,
//     "health": 0
// },
// "残疾人": {
//     "contract": 0,
//     "health": 0
// }
//返回示例
// {
//     "contract": [],
//     "health": []
// }
export function toArray(data) {
    if (!data) return {};
    var keys = Object.keys(data);
    var res = {};
    var subkeys = Object.keys( data[ keys[0] ] );
    subkeys.forEach(function( item, index ){
        res[item] = [];
        keys.forEach(function( value, key ){
            res[item].push( data[value][item] );
        })
    })
    return res;
}
/**
 * 转化为小数
 * @param {*} numerator 分子
 * @param {*} denominator 分母  
 * @param {*} num 保留几位
 */
export function toFixedNum(numerator, denominator, num) {
    if (numerator === 0) return (numerator.toFixed(num)).toFixed(num);
}

//深拷贝
export function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' != typeof obj) return obj
  
    // Handle Date
    if (obj instanceof Date) {
      let copy = new Date()
      copy.setTime(obj.getTime())
      return copy
    }
  
    // Handle Array
    if (obj instanceof Array) {
      let copy = []
      for (let i = 0, len = obj.length; i < len; ++i) {
        copy[i] = clone(obj[i])
      }
      return copy
    }
  
    // Handle Object
    if (obj instanceof Object) {
      let copy = {}
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr])
      }
      return copy
    }
  
    throw new Error('Unable to copy obj! Its type isn\'t supported.')
  }

/**
 * 
 * @param {*} cname  传入的元素
 * @param {*} wordlength 指定需要比较的长度
 */
const wordLimit = function (cname, wordlength) {
    var cname = document.getElementsByClassName(cname);
    for (var i = 0; i < cname.length; i++) {　　　　　　　　　　　
        var nowhtml = cname[i].innerHTML;
        var nowlength = cname[i].innerHTML.length;
        if (nowlength > wordlength) {
            cname[i].innerHTML = nowhtml.substr(0, wordlength) + '...'; //截取元素的文本的长度并加上省略号
        }
    }
};

/**
 * 签约率排序公共方法
 * @param arr 要排序的数组
 * @param type 1 升序  0  降序
 * @param sortBy 如果是对象则按照某一key排序
 */
export function sortByParam(arr, type, sortBy) {
    if (!arr) return;
    if (!arr.length) return [];
    var type = type || 1;
    arr.sort(function (a, b) {
        var _a = type ? a : b;
        var _b = type ? b : a;
        if (sortBy) {
            return _b[sortBy] - _a[sortBy];
        }
        return _b - _a;
    })
}
/**
 * 将对象的value转化为数组
 * @param obj 传入的对象
 */
export function toValueArr(obj) {
    if (!obj) return[];
    var arr = [];
    var keys = Object.keys(obj);
    keys.forEach((item, index) => {
        arr.push(obj[item]);
    })
    return arr;
}
//  url的解析最终返回的是一个对象
/**
 * 
 * @param {*} url  目标url
 */
export function parseURL (url) {
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

/**
 * 转化为字符串的实体
 * @param {*} text ：传入的字符串值
 * match: 模式的匹配项
 * pos：  模式匹配项在字符串中的位置
 * originalText： 原始字符串
 */
export function HtmlEscape(text) {
    return text.replace(/[<>"&]/g, function (match, pos, originalText) {
        switch (match) {
            case "<":
                return "&lt;"
                break;
            case ">": 
                return "&gt;"
                break;
            case "&":
                return "&amp;"
                break;
            case "\"":
                return "&quot;"
                break;
            default:
                break;
        }
    })
}
/**
 * 
 * @param {*} values : 传入的数组
 * @param {*} tag : 最大值还是最小值
 */
export function getMaxOrMinNum(values, tag) {
    switch (tag) {
        case "max":
            return Math.max.apply(Math, values);
            break;
        default:
            return Math.min.apply(Math, values);
            break;
    }
}

/**
 * 获取指定范围内的一个随机数
 * @param {*} lowerValue 下限
 * @param {*} upperValue 上限
 */
export function getRandom(lowerValue, upperValue) {
    var choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
}

/**
 * 用于区分属性是实例对象还是通过原型中的
 * @param {*} object  测试的对象
 * @param {*} name    对象的属性
 */
export function hasProtoTypeProperty(object, name) {
    return !object.hasOwnProperty(name) &&  (name in object);
}

/**
 * 求阶乘 arguments.callee  在严格模式下会出错
 * @param {*} num  传入的数值
 */
export function factorial(num) {
    if (num <=1 ) {
        return 1;
    } else {
        return num * arguments.callee(num -1);
    }
}