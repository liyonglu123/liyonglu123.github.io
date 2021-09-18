// https://leetcode-cn.com/problems/min-stack/
// 使用两个栈实现查找最小, 参照物
var MinStack = function () {
  this.stack = [];
  this.minSatck = [Infinity];
};

MinStack.prototype.push = function (val) {
  this.stack.push(val);
  // 判断是否是小的val
  let top = this.minSatck[this.minSatck.length - 1];
  if (val < top) {
    this.minSatck.push(val);
  } else {
    this.minSatck.push(top);
  }
};

MinStack.prototype.pop = function () {
  this.stack.pop();
  this.minSatck.pop();
};

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.minSatck[this.minSatck.length - 1];
};
