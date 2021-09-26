/**
 * every, Array.prototype.every
 * every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
 * arr.every(callback(element[, index[, array]])[, thisArg])
 * 不会改变原数组
 */
// let flag = [1, 2, 3].every((item) => {
//   return item > 1;
// });
// console.log(flag);

// 实现every

Array.prototype.myEvery = function (fn) {
  for (let i = 0; i < this.length; i++) {
    if (!fn(this[i], i, this)) {
      return false;
    }
  }
  return true;
};

let flag = [].myEvery((item) => {
  return item > 1;
});
console.log(flag);
