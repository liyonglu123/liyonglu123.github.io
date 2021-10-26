/**
 * compose 组合
 * 将需要嵌套执行的函数平铺，嵌套执行就是一个函数的返回值作为另一个函数的参数，改函数调用的方向是从右向左的
 */

function sum(a, b) {
  return a + b;
}

function toUpper(str) {
  return str.toUpperCase();
}

function add(str) {
  return "---" + str + "---";
}

// 不使用compose
// console.log(add(toUpper(sum("tom", 27))));

// 使用 ES5-reduceRight 实现
// function compose(...fns) {
//   return function (...args) {
//     let lastFn = fns.pop();
//     return fns.reduceRight((a, b) => {
//       return b(a);
//     }, lastFn(...args));
//   };
// }

// 使用ES6 - reduceRight 实现

// const compose = (...fns) => (...args) => {
//   let lastFn = fns.pop();
//   return fns.reduceRight((a, b) => b(a), lastFn(...args));
// };

// function compose(...fns) {
//   return function (...args) {
//     return fns.reduce((acc, cur) => {
//       // 第一次accs是函数，之后是结果，所以加这个判断
//       return typeof acc === "function" ? cur(acc(...args)) : cur(acc);
//     });
//   };
// }

const compose = (...fns) => (...args) =>
  fns.reduce((acc, cur) =>
    typeof acc === "function" ? cur(acc(...args)) : cur(acc)
  );

// 使用compose
console.log(compose(add, toUpper, sum)("tom", "27"));
