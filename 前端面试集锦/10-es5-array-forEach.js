/**
 * forEach, Array.prototype.forEach
 * forEach() 方法对数组的每个元素执行一次给定的函数。
 * arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
 * 返回undefined，不能链式调用
 * 除了抛出异常以外，没有办法中止或跳出 forEach() 循环。如果你需要中止或跳出循环，forEach() 方法不是应当使用的工具。
 */

// [1, 2, 3].forEach((item, index, arr) => {
//   console.log(item, index, arr);
// });

// 实现forEach
Array.prototype.myForEach = function (fn) {
  for (let i = 0; i < this.length; i++) {
    fn(this[i], i, this);
  }
};

// 测试
[1, 2, 3].myForEach((item, index, arr) => {
  console.log(item, index, arr);
});
