/**
 * 使用一个通用的柯里化
 * 特点：当一个函数有多个参数的时候可以先传递一部分参数调用它（这部分参数以后永远不变），
 * 然后返回一个新的函数接受剩余的参数，返回结果
 * 1. 判断传递的参数是否达到执行函数fn的个数
 * 2. 没有达到的话，继续返回新的函数，将fn函数继续返回并将剩余参数累加
 * 3. 达到fn参数个数时，将累加后的参数传给fn执行
 */

function sum(a, b, c) {
  return a + b + c;
}

// 实现
const curry = function (func) {
  return function curryFn(...args) {
    // 判断实参和形参的个数
    if (args.length < func.length) {
      // args参数会被记录下来，最终参数一致时，执行func(...args)
      return function (...args2) {
        return curryFn(...args.concat(args2));
      };
    }
    return func(...args);
  };
};

let a = curry(sum)(1)(2)(4);
console.log(a);
