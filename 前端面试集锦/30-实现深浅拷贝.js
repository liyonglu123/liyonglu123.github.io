/**
 * 深浅拷贝什么时候使用到，常见的使用方式  https://segmentfault.com/a/1190000020255831
 * 数据类型：基本数据类型，引用数据类型以及区别，从堆栈角度分析
 * 浅拷贝：
 *      直接赋值，使用对象解构，使用循环，Object.assign
 *      只是实现第一层的拷贝，无法实现多层的深拷贝
 * 深拷贝：
 *      值为 undefined 的属性在转换后丢失；
 *      值为 Symbol 类型的属性在转换后丢失；
 *      值为 RegExp 对象的属性在转换后变成了空对象；
 *      值为 函数对象的属性在转换后丢失；
 *      值为 Date 对象的属性在转换后变成了字符串；
 *      会抛弃对象的 constructor,所有的构造函数会指向 Object；
 *      对象的循环引用会抛出错误。
 *
 * 
 * 基本实现

递归能力
循环引用

考虑问题的全面性
理解weakmap的真正意义
多种类型

考虑问题的严谨性
创建各种引用类型的方法，JS API的熟练程度
准确的判断数据类型，对数据类型的理解程度
通用遍历：

写代码可以考虑性能优化
了解集中遍历的效率
代码抽象能力
拷贝函数：

箭头函数和普通函数的区别
正则表达式熟练程度
 */

const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function isObject(target) {
  const type = typeof target;
  return target !== null && (type === "object" || type === "function");
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(",");
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return cloneSymbol(targe);
    case funcTag:
      return cloneFunction(targe);
    default:
      return null;
  }
}

function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });

  return cloneTarget;
}

module.exports = {
  clone,
};
