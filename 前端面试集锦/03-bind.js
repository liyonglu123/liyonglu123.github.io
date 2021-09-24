/**
 * 1. bind, function.bind(thisArg[, arg1[, arg2[, ...]]])
 * bind() 方法创建一个新的函数，
 * 在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
 * 返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。
 */

// 手写bind

Function.prototype.myBind = function (obj) {
  // 判断调用myBind方法是否是函数
  if (typeof this !== "function") {
    throw Error("调用myBind方法必须是函数！");
  }
  // 截取传给函数的参数
  var args = Array.prototype.slice.call(arguments, 1);
  // 保存这个函数，方便后续调用
  var _fn = this;
  // 创建一个需要返回出去的函数，这个函数会被赋到外部变量中
  var bindFn = function () {
    // 获取myBind方法返回的函数的参数
    var newArgs = Array.prototype.slice.call(arguments);
    // 通过apply去改变this指向，实现函数柯里化
    var _obj = this.constructor === _fn ? this : obj;
    _fn.apply(_obj, newArgs.concat(args));
  };
  // 创建一个中介函数，实现原型继承
  var ProtoFn = function () {};
  ProtoFn.prototype = _fn.prototype;
  bindFn.prototype = new ProtoFn();
  // 返回bindFn的函数给外部
  return bindFn;
};

// 测试

var obj = {
  name: "前端菜鸟库",
};
function test(x, y, z) {
  this.age = "18";
  console.log(this.name); // 前端菜鸟库
  console.log("x:", x, "y:", y, "z:", z); // x: 1 y: 2 z: 3
  console.log(x + y + z); // 6
}
test.prototype.book = "JS";
var Bound = test.myBind(obj, 1, 2, 3);
Bound();

var Bound = test.myBind(obj, 1, 2);
Bound(4); // 7
// 构造函数, 构造函数中，this指向的是实例对象，而这个实例中没有name属性，因此为undefined。
var bound = new Bound(3);
console.log(bound);
