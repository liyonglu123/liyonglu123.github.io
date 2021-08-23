/**
 * 栈： 先入后出
 */

function Stack() {
  this.items = [];
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.isEmpty = isEmpty;
  this.size = size;
  this.clear = clear;
  this.getStack = getStack;
}

// 入栈
function push(item) {
  this.items.push(item);
}

// 出栈
function pop() {
  return this.items.pop();
}

// 返回栈顶元素
function peek() {
  return this.items[length - 1];
}

// 判断是否为空
function isEmpty() {
  return this.items.length === 0;
}

// 栈的长度
function size() {
  return this.items.length;
}

// 清空栈
function clear() {
  this.items = [];
}

// 查看栈
function getStack() {
  return this.items;
}

// 测试
// var stack = new Stack();
// stack.push(1);
// stack.push(2);
// stack.push(3);
// console.log(stack.getStack());
// console.log(stack.size());
// console.log(stack.isEmpty());
// stack.pop();
// console.log(stack.getStack());
// stack.pop();
// stack.pop();
// console.log(stack.size());
// console.log(stack.isEmpty());

// 应用一： 进制转化
function baseConverter(decNumber, base) {
  var remStack = new Stack(),
    rem,
    baseString = "",
    digits = "0123456789ABCDEF";
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }
  return baseString;
}

console.log(baseConverter(2, 2));
console.log(baseConverter(2, 8));
console.log(baseConverter(2, 16));
