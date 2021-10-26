/**
 * 管道
 * pipe函数和compose函数的作用一样，也是将参数平铺，只不过他的顺序是从左向右
 */

function splitString(str) {
  return str.split("");
}

function count(array) {
  return array.length;
}

// 使用pipe之前

// console.log(count(splitString("hello")));

// 实现 pipe
// const pipe = function () {
//   const args = [].slice.apply(arguments);
//   return function (x) {
//     return args.reduce((res, cb) => cb(res, x));
//   };
// };

// 使用 ES5- reduceRight 实现
// function pipe(...fns) {
//   return function (...args) {
//     let lastFn = fns.shift();
//     return fns.reduceRight((a, b) => {
//       return b(a);
//     }, lastFn(...args));
//   };
// }

// // 使用 ES6 - reduceRight 实现
// const pipe = (...fns) => (...args) => {
//   let lastFn = fns.shift();
//   return fns.reduceRight((a, b) => b(a), lastFn(...args));
// };

// 使用 ES6 - reduce 一行代码实现：（redux源码）
const pipe = (...fns) => (...args) => fns.reduce((a, b) => b(a), ...args);
console.log(pipe(splitString, count)("hello"));
