/**
 *  1. call, Function.prototype.call
 *  2. function.call(thisArg, arg1, arg2, ...)
 * 让当前函数执行
 * 把函数中的THIS指向改为第一个传递给CALL的实参
 * 把传递给CALL其余的实参，当做参数信息传递给当前函数
 * 如果执行CALL一个实参都没有传递，非严格模式下是让函数中的THIS指向WINDOW，严格模式下指向的是UNDEFINED
 */

// 1. 使用call调用父构造函数， 实现属性继承
function Product(name, price) {
  this.name = name;
  this.price = price;
}
function Food(name, price) {
  Product.call(this, name, price);
  this.category = "food";
}
let food = new Food("apple", 10);
// console.log(food.name, food.price, food.category);

// 2. call方法调用匿名函数
let list = [
  {
    name: "zhangsan",
    age: 18,
  },
  {
    name: "lisi",
    age: 20,
  },
];
for (let i = 0; i < list.length; i++) {
  (function (i) {
    this.print = function () {
      //   console.log(i, this.name, this.age);
    };
    this.print();
  }.call(list[i], i));
}

// 3. 使用call方法调用函数，并且指定上下文中的this
function greet() {
  let reply = `我是${this.name}`;
  console.log(reply);
}
let obj = {
  name: "zhangsan",
};
// greet();
// greet.call(obj);

// 4. 使用call方法调用函数，并且不指定第一个参数,
// 在严格模式下，使用call方法调用函数，并且不指定第一个参数， this指向undefined
let data = "不指定第一个参数";
function dataLog() {
  console.log(this, data);
}
// dataLog();
// dataLog.call();

// ------- 手动实现 call -------

Function.prototype.myCall = function (context) {
  // 判断是否有参数， 如果没有指定全局作用域
  let _context = context || window;
  // this 就是Function实例对象即调用者本身, 即 this: greet 【重点】
  _context.fn = this;
  // 保存参数的数组
  // let argArr = [...arguments].slice(1);
  let argArr = Array.from(arguments).slice(1);
  // 遍历数组，第一个参数是obj,所以从第二项开始遍历
  // for (var i = 1; i < arguments.length; i++) {
  //   argArr.push("arguments[" + i + "]");
  // }
  // 执行obj的fn方法，把arg拆分, 严格模式下不允许使用eval方法
  // eval("_context.fn(" + argArr + ")")
  _context.fn(...argArr);
  // 执行完之后删除fn这个方法
  delete context.fn;
};
// greet.myCall(obj, 1, 2, 3);
// console.log(obj);

// ------ 经典面试题 --------
// 一个call了是让左边的函数执行，多个call是让传参的函数执行(this是window/undefined)
function fn1() {
  console.log(1);
}

function fn2() {
  console.log(2);
}

// 先找到Function原型上的call方法让其执行
// call执行的时候会让fn1执行，并且把fn1中的this改为了fn2，结果为1.
fn1.call(fn2); // 1

/**
 * 第一次执行call方法：fn1.call--call(fn2)
 *    context: fn2
 *    this: fn1.call
 *    fn2.(fn1.call) = fn1.call
 *    让fn2.(fn1.call)执行，相当于让fn1.call执行，此时fn1.call中的this变为了fn2
 *    即第一次执行call的结果： fn1.call ---> this:fn2
 * 第二次执行call方法：fn1.call()
 *    context: undefined || window 得知 context = window
 *    this: fn2
 *    window.fn2 = fn2
 *    whidow.fn2() ---> 等价于fn2(), this:window ---> 结果输出2
 */
fn1.call.call(fn2); // 2

// 本质是让Function.prototype执行，所以并没有任何输出结果
Function.prototype.call(fn1); // 没输出

// context: fn1, this: Function.prototype.call --> context: window, this: fn1
Function.prototype.call.call(fn1); // 1
