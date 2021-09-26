/**
 * reduce,  Array.prototype.reduce
 * reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
 * arr.reduce(callback(accumulator, currentValue[, index[, array]])[, ?initialValue])
 * 如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。
 * 如果提供initialValue，从索引0开始。
 */

// let total = [1, 2, 3, 4].reduce((prev, next, currentIndex, array) => {
//   return prev + next;
// }, 0);
// console.log(total);

// 实现reduce

Array.prototype.myReduce = function (fn, prev) {
  for (let i = 0; i < this.length; i++) {
    // 当初始值没有传递时候
    if (typeof prev === "undefined") {
      // 要知道回调函数的参数有哪些
      prev = fn(this[i], this[i + 1], i + 1, this);
      i++;
    } else {
      prev = fn(prev, this[i], i, this);
    }
  }
  // 函数返回的结果作为下一次循环的prev
  return prev;
};

// 测试
let total = [1, 2, 3, 4].myReduce((prev, next, currentIndex, array) => {
  return prev + next;
}, 2);
console.log(total);
