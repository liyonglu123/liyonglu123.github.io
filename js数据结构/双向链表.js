/**
 * 双向链表的节点类
 * @param {*} val 节点值
 */
function ListNode(val) {
  this.val = val;
  this.prev = null;
  this.next = null;
}

/**
 * 双向链表类
 */
function DoubleLinkedList() {
  this.length = 0;
  this.head = null;
  this.tail = null;
}

// 获取双向链表指定索引对应的元素
DoubleLinkedList.prototype.getElementAt = function (index) {
  if (index < 0 || index > this.length) return null;
  let cur = null;
  if (index > Math.floor(this.length / 2)) {
    // 从后往前
    cur = this.tail;
    let i = this.length - 1;
    while (i > index) {
      cur = cur.prev;
      i--;
    }
  } else {
    // 从前往后
    cur = this.head;
    while (index--) {
      cur = cur.next;
    }
  }
  return cur;
};

// 获取双向链表中某个节点
DoubleLinkedList.prototype.find = function (val) {
  let curHead = this.head;
  let curTail = this.tail;
  while (curHead) {
    if (curHead.val === val) return curHead;
    curHead = curHead.next;

    if (curTail.val === val) return curTail;
    curTail = curTail.prev;
  }
  return null;
};

// 向双向链表中追加元素
DoubleLinkedList.prototype.append = function (val) {
  let node = new ListNode(val);
  if (this.head === null) {
    // 链表为空，Head和tail均指向当前添加的节点
    this.head = node;
    this.tail = node;
  } else {
    // 链表不为空, 将当前节点添加到链表尾部
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }
  this.length++;
};

// 向双向链表指定位置出入元素
DoubleLinkedList.prototype.insert = function (index, val) {
  if (index < 0 || index > this.length) return false;
  // 插入到尾部
  if (index === this.length) {
    this.append(val);
  } else {
    let node = new ListNode(val);
    if (index === 0) {
      // 插入到头部
      if (this.head === null) {
        this.head = node;
        this.tail = node;
      } else {
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
      }
    } else {
      // 插入到中间位置
      let curNode = this.getElementAt(index);
      let prevNode = curNode.prev;
      node.next = curNode;
      node.prev = prevNode;
      curNode.prev = node;
      prevNode.next = node;
    }
    this.length++;
  }
  return true;
};

// 删除双向链表中指定位置的元素，并返回这个元素的值
DoubleLinkedList.prototype.removeAt = function (index) {
  if (index < 0 || index >= this.length) return null;

  let current = this.head;
  let prevNode;

  if (index === 0) {
    // 移除头部元素
    this.head = current.next;
    this.head.prev = null;
    if (this.length === 1) this.tail = null;
  } else if (index === this.length - 1) {
    // 移除尾部元素
    current = this.tail;
    this.tail = current.prev;
    this.tail.next = null;
  } else {
    // 移除中间元素
    current = this.getElementAt(index);
    prevNode = current.prev;
    prevNode.next = current.next;
    current.next.prev = prevNode;
  }

  this.length--;
  return current.val;
};

// 获取双向链表中给定元素的索引
DoubleLinkedList.prototype.indexOf = function (val) {
  let curHead = this.head;
  let curTail = this.tail;
  let idx = 0;
  while (curHead !== curTail) {
    if (curHead.val === val) return idx;
    curHead = curHead.next;

    if (curTail.val === val) return this.length - 1 - idx;
    curTail = curTail.prev;
    idx++;
  }
  return -1;
};

// 序列化双向链表
DoubleLinkedList.prototype.join = function (split) {
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
let doubleLinkedList = new DoubleLinkedList();
doubleLinkedList.append(10);
doubleLinkedList.append(15);
doubleLinkedList.append(20);
doubleLinkedList.append(25);
console.log(doubleLinkedList.join("<->"));

console.log(doubleLinkedList.getElementAt(0).val);
console.log(doubleLinkedList.getElementAt(1).val);
console.log(doubleLinkedList.getElementAt(5));

console.log(doubleLinkedList.join("<->"));
console.log(doubleLinkedList.indexOf(10));
console.log(doubleLinkedList.indexOf(25));
console.log(doubleLinkedList.indexOf(50));

doubleLinkedList.insert(0, 5);
doubleLinkedList.insert(3, 18);
doubleLinkedList.insert(6, 30);
console.log(doubleLinkedList.join("<->"));

console.log(doubleLinkedList.find(10).val);
console.log(doubleLinkedList.removeAt(0));
console.log(doubleLinkedList.removeAt(1));
console.log(doubleLinkedList.removeAt(5));

console.log(doubleLinkedList.join("<->"));
