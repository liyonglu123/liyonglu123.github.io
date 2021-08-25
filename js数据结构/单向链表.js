/**
 * 创建链表节点类
 * @param {*} val 节点的值
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * 创建链表类
 */
function LinkedList() {
  this.length = 0;
  this.head = null;
}

// 追加节点
LinkedList.prototype.append = function (val) {
  var node = new ListNode(val);
  if (!this.head) {
    this.head = node;
  } else {
    var cur = this.getElementAt(this.length - 1);
    cur.next = node;
  }
  this.length++;
};

// 在链表的指定位置插入节点
LinkedList.prototype.insert = function (index, val) {
  if (index < 0 || index > this.length) return false;
  var node = new ListNode(val);
  if (index === 0) {
    node.next = this.head;
    this.head = node;
  } else {
    var prev = this.getElementAt(index - 1);
    node.next = prev.next;
    prev.next = node;
  }
  this.length++;
  return true;
};

// 删除链表中指定位置的元素，并返回这个元素的值
LinkedList.prototype.removeAt = function (index) {
  if (index < 0 || index > this.length) return null;
  var cur = this.head;
  if (index === 0) {
    this.head = cur.next;
  } else {
    var prev = this.getElementAt(index - 1);
    cur = prev.next;
    prev.next = cur.next;
  }
  this.length--;
  return cur.val;
};

// 删除链表中对应的元素
LinkedList.prototype.remove = function (val) {
  return this.removeAt(this.indexOf(val));
};

// 获取链表中指定元素的索引
LinkedList.prototype.indexOf = function (val) {
  var cur = this.head;
  for (var i = 0; i < this.length; i++) {
    if (cur.val === val) return i;
    cur = cur.next;
  }
  return -1;
};

// 获取链表中某个节点
LinkedList.prototype.find = function (val) {
  var cur = this.head;
  while (cur) {
    if (cur.val === val) return cur;
    cur = cur.next;
  }
  return null;
};

// 获取链表中索引所对应的元素
LinkedList.prototype.getElementAt = function (index) {
  if (index < 0 || index >= this.length) return null;
  var cur = this.head;
  while (index--) {
    cur = cur.next;
  }
  return cur;
};

// 判断链表是否为空
LinkedList.prototype.isEmpty = function () {
  return !this.length;
};

// 获取链表的长度
LinkedList.prototype.size = function () {
  return this.length;
};

// 获取链表的头元素
LinkedList.prototype.getHead = function () {
  return this.head;
};

// 清空链表
LinkedList.prototype.clear = function () {
  this.head = null;
  this.length = 0;
};

// 序列化链表
LinkedList.prototype.join = function (split) {
  var cur = this.head;
  var str = "";
  while (cur) {
    str += cur.val;
    if (cur.next) str += split;
    cur = cur.next;
  }
  return str;
};

// 测试
let linkedList = new LinkedList();
linkedList.append(10);
linkedList.append(20);
linkedList.append(30);
console.log(linkedList.join("--"));
linkedList.insert(0, 5);
linkedList.insert(2, 15);
console.log(linkedList.join("--"));
console.log(linkedList.removeAt(0));
console.log(linkedList.removeAt(1));
console.log(linkedList.removeAt(2));
console.log(linkedList.join("--"));
console.log(linkedList.indexOf(20));
linkedList.remove(20);
console.log(linkedList.join("--"));
console.log(linkedList.find(10));
console.log(linkedList.size());
console.log(linkedList.isEmpty());
linkedList.clear();
console.log(linkedList.isEmpty());
