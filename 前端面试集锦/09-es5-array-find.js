/**
 * find,Array.prototype.find
 * find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
 * arr.find(callback[, thisArg])
 * 不会改变原数组
 */

// let item = [1, 2, 3].find((item) => {
//   return item > 1;
// });
// console.log(item);

// 实现find

Array.prototype.myFind = function (fn) {
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

// 测试
let item = [1, 2, 3].myFind((item) => {
  return item > 2;
});
console.log(item);
