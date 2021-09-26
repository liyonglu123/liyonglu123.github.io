/**
 * some, Array.prototype.some
 * some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
 * arr.some(callback(element[, index[, array]])[, thisArg])
 */

// let flag = [1, 2, 3].some((item) => {
//   return item > 1;
// });
// console.log(flag);

// 手写some
Array.prototype.mySome = function (fn) {
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      return true;
    }
  }
  return false;
};

// 测试
let flag = [1, 2, 3].mySome((item) => {
  return item < 1;
});
console.log(flag);
