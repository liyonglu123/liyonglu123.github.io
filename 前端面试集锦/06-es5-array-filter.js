/**
 * filter -> Array.prototype.filter
 * filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
 * var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
 * filter 不会改变原数组，它返回过滤后的新数组
 */

// let array = [1, 2, 3].filter((item) => {
//   return item > 2;
// });
// console.log(array);

// 实现filter

Array.prototype.myFilter = function (fn) {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i])) {
      console.log(this[i], i, this);
      arr.push(this[i]);
    }
  }
  return arr;
};
let array = [1, 2, 3].myFilter((item) => {
  return item > 2;
});
console.log(array);
