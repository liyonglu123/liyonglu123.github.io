/**
 * map -> Array.prototype.map
 * 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
 * var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 * // Return element for new_array
 * }[, thisArg])
 */

const arr = [1, 2, 3, 4];
const newArr = arr.map(function (item) {
  return item * item;
});
// console.log(newArr);

// ["1", "2", "3"].map(parseInt); // [1, NaN, NaN]

// 实现map

Array.prototype.myMap = function (fn) {
  let arr = [];
  // console.log(fn, this); 此处的this是数组本身
  for (let i = 0; i < this.length; i++) {
    arr.push(fn(this[i], i, this));
  }
  return arr;
};

const arr1 = arr.myMap(function (item, index, a) {
  // console.log(item, index, a);
  return item * item;
});
console.log(arr1);
