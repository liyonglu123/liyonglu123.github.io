/**
 * 特点： 使用call，apply可以让非数组借用一些其他类型的函数，比如
 * Array.prototype.push.call , Array.prototype.slice.call, uncurry把这些方法泛化出来
 * 不在只是单单的用于数组，更好的语义化
 */

// 实现
Function.prototype.uncurry = function () {
  var self = this;
  return function () {
    return Function.prototype.call.apply(self, arguments);
  };
};

// 利用反柯里化创建检测数据类型的函数
let checkType = Object.prototype.toString.uncurry();
console.log(checkType(1));
console.log(checkType("hello"));
console.log(checkType(true));
