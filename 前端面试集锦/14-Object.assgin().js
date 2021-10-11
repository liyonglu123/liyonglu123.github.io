/**
 * Object.assgin()
 * 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
 * Object.assign(target, ...sources)
 * 作用：
 * 复制对象
 * 合并对象
 * 拷贝对象
 * 继承属性和不可枚举属性是不可拷贝的
 */

const obj = { a: 1 };
// const obj1 = Object.assign(obj, { a: 2 });
// console.log(obj1);

if (typeof Object.myAssign != "function") {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "myAssign", {
    value: function myAssign(target, varArgs) {
      // .length of function is 2
      "use strict";
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError("Cannot convert undefined or null to object");
      }

      let to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        console.log(arguments);
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (let nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true,
  });
}

const obj1 = Object.myAssign(obj, { a: 3 });
console.log(obj1);
