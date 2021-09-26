// https://leetcode-cn.com/problems/design-circular-deque/
// 设计循环双端队列

// 构造函数,双端队列的大小为k。
var MyCircularDeque = function (k) {
  this.length = 0;
  this.list = [];
  this.maxLength = k;
};

// 将一个元素添加到双端队列头部。 如果操作成功返回 true。
MyCircularDeque.prototype.insertFront = function (value) {
  if (this.length === this.maxLength) {
    return false;
  }
  this.list.unshift(value);
  this.length++;
  return true;
};

// 将一个元素添加到双端队列尾部。如果操作成功返回 true。
MyCircularDeque.prototype.insertLast = function (value) {
  if (this.length === this.maxLength) {
    return false;
  }
  this.list.push(value);
  this.length++;
  return true;
};

// 从双端队列头部删除一个元素。 如果操作成功返回 true。
MyCircularDeque.prototype.deleteFront = function () {
  if (this.list.length > 0) {
    this.list.shift();
    this.length--;
    return true;
  }
  return false;
};

// 从双端队列尾部删除一个元素。如果操作成功返回 true。
MyCircularDeque.prototype.deleteLast = function () {
  if (this.list.length > 0) {
    this.list.pop();
    this.length--;
    return true;
  }
  return false;
};

// 从双端队列头部获得一个元素。如果双端队列为空，返回 -1。
MyCircularDeque.prototype.getFront = function () {
  if (this.length === 0) {
    return -1;
  }
  return this.list[0];
};

// 获得双端队列的最后一个元素。 如果双端队列为空，返回 -1。
MyCircularDeque.prototype.getRear = function () {
  if (this.length === 0) {
    return -1;
  }
  return this.list[this.list.length - 1];
};

// 检查双端队列是否为空。
MyCircularDeque.prototype.isEmpty = function () {
  return this.length === 0;
};

// 检查双端队列是否满了。
MyCircularDeque.prototype.isFull = function () {
  return this.length === this.maxLength;
};

// 不使用数组的方法
/**
 * Initialize your data structure here. Set the size of the deque to be k.
 * @param {number} k
 */
var MyCircularDeque = function (k) {
  this.size = k;
  this.tail = 0;
  this.head = 0;
  this.len = 0;
  this.list = [];
};

/**
 * Adds an item at the front of Deque. Return true if the operation is successful.
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
  if (!this.isFull()) {
    this.head = (this.head + this.size - 1) % this.size;
    this.list[this.head] = value;
    this.len++;
    return true;
  }
  return false;
};

/**
 * Adds an item at the rear of Deque. Return true if the operation is successful.
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
  if (!this.isFull()) {
    // 注意不应该直接push
    this.list[this.tail] = value;
    this.tail = (this.tail + 1) % this.size;
    this.len++;
    return true;
  }
  return false;
};

/**
 * Deletes an item from the front of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
  if (!this.isEmpty()) {
    this.head = (this.head + 1) % this.size;
    this.len--;
    return true;
  }
  return false;
};

/**
 * Deletes an item from the rear of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
  if (!this.isEmpty()) {
    this.tail = (this.tail + this.size - 1) % this.size;
    this.len--;
    return true;
  }
  return false;
};

/**
 * Get the front item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
  if (!this.isEmpty()) {
    return this.list[this.head];
  }
  return -1;
};

/**
 * Get the last item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
  if (!this.isEmpty()) {
    return this.list[(this.tail + this.size - 1) % this.size];
  }
  return -1;
};

/**
 * Checks whether the circular deque is empty or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
  return this.len == 0;
};

/**
 * Checks whether the circular deque is full or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
  return this.len == this.size;
};
