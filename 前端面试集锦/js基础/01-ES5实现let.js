/**
 * 如何在es5环境下实现let
 * var 声明的变量会挂载到window上，而let 和const不会
 * var 声明的变量存在变量提升，而let和const不会
 * let和const声明形成块级作用域，只能在作用域里访问，不能跨块访问，也不能跨函数访问
 * 同一作用域下，let和const不能声明同名变量，而var可以
 * 暂时性死区，let和const声明的变量不能在声明前被使用
 *
 */
// 通过自执行函数来模拟块级作用域

(function () {
  for (var i = 0; i < 5; i++) {
    console.log(i); // 0 ,1,2,3,4
  }
})();

console.log(i); // ReferenceError: i is not defined
