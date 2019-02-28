/**
 * Created  on 18/09/26.
 */

export function isvalidUsername(str) {


}

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

/**
 *
 *validate intnum
 * @export
 * @param {*} val
 * @returns
 */
export function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 检测对象是否为空  
 * @param {*} obj 
 */
export function validatenull(obj) {
    const arr = Object.keys(obj);
    if (arr.length == 0) {
        return true
    } else {
        return false

    }
}

/*
 * 检验姓名
 */
export const nameValidate = (rule, value, callback) => {
  if (!value) {
    callback(new Error('名字不能为空'));
    return
  }
  if(value.length > 20) {
    callback(new Error('长度不能大于20'));
    return
  }
  callback();
};
/*
 * 检验金额
 */
export const amountValidate = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入贷款金额'))
    return
  }
  if(isNaN(parseInt(value))) {
    callback(new Error('金额必须为数字'))
    return
  }
  if(parseFloat(value) > 100000000 || parseFloat(value) <= 0) {
    callback(new Error('金额必须大于0且小于1亿'))
    return
  }
  callback();
};
/*
 * 检验手机号
 */
export const phoneValidate = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号'))
    return
  }
  if(!/^1[3456789]\d{9}$/.test(value)) {
    callback(new Error('请输入有效手机号'))
    return
  }
  callback();
};