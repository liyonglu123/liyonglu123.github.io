/**
 * 1. apply, Function.prototype.apply
 * 2. func.apply(thisArg, [argsArray])
 */

// 1. apply 将数组各项添加到另一个数组
var array = ["a", "b"];
var elements = [1, 2, 3];
array.push.apply(array, elements);
console.log(array);

// 2. 使用apply和内置函数， 对于一些需要写循环以遍历数组各项的需求，我们可以用apply完成以避免循环。
// 找出数组中最大和最小的元素
var numbers = [5, 6, 2, 3, 7];
var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);

// 对比简单循环算法

max = -Infinity;
min = +Infinity;
for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
  if (numbers[i] < min) {
    min = numbers[i];
  }
}
// notice: JavaScriptCore中有被硬编码的参数个数上限65536
// 当参数数组可能非常大，可以使用混合策略：将数组切块后循环传入目标方法
function minOfArray(arr) {
  var min = Infinity;
  var QUANTUM = 32768;
  for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)));
    min = Math.min(submin, min);
  }
  return min;
}

var min = minOfArray([5, 6, 2, 3, 7]);

// 3. 使用apply 来链接构造器

Function.prototype.construct = function (aArgs) {
  var oNew = Object.create(this.prototype);
  this.apply(oNew, aArgs);
  return oNew;
};

function MyConstructor(arguments) {
  for (var nProp = 0; nProp < arguments.length; nProp++) {
    this["property" + nProp] = arguments[nProp];
  }
}

var myArray = [4, "Hello world!", false];
var myInstance = new MyConstructor(myArray); //Fix MyConstructor.construct is not a function

console.log(myInstance.property1); // logs "Hello world!"
console.log(myInstance instanceof MyConstructor); // logs "true"
console.log(myInstance.constructor); // logs "MyConstructor"

// 手写apply
Function.prototype.myApply = function (context, argArr) {
  // 判断是否有参数， 如果没有指定全局作用域
  let _context = context || window;
  // _context 添加fn方法
  _context.fn = this;
  // 获取第二个数组参数
  let arg = [];
  // 当不存在参数数组或者参数数组为空时候，直接执行函数，否则把数组拆分后传递给函数并执行
  if (!argArr || argArr.length === 0) {
    _context.fn();
  } else {
    for (let i = 0; i < argArr.length; i++) {
      arg.push("argArr[" + i + "]");
    }
    // 执行_context的fn方法，把arg拆分
    eval("_context.fn(" + arg + ")");
  }
  // 移除这个方法
  delete _context.fn;
};

Function.prototype.myApply = function (thisArg, args) {
  const fn = Symbol("fn"); // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
  thisArg = thisArg || window; // 若没有传入this, 默认绑定window对象
  thisArg[fn] = this; // this指向调用call的对象,即我们要改变this指向的函数
  const result = thisArg[fn](...args); // 执行当前函数（此处说明一下：虽然apply()接收的是一个数组，但在调用原函数时，依然要展开参数数组。可以对照原生apply()，原函数接收到展开的参数数组）
  delete thisArg[fn]; // 删除我们声明的fn属性
  return result; // 返回函数执行结果
};

//测试
foo.myApply(obj, []);

// 测试
function test(x, y, z) {
  console.log(this.name);
}
var obj = {
  name: "张三",
};
test.myApply(obj, ["张三", "李四", "王五"]);
console.log(obj); // 张三
