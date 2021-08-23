/**
 * 先入先出, 入队，出队
 *
 */

function Queue() {
  this.items = [];
  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.first = first;
  this.isEmpty = isEmpty;
  this.size = size;
  this.toString = toString;
}

// 添加
function enqueue(item) {
  this.items.push(item);
}

// 删除
function dequeue() {
  return this.items.shift();
}

// 获取队首元素
function first() {
  return this.items[0];
}

// 是否是空队列
function isEmpty() {
  return this.items.length === 0;
}

// 队列的长度
function size() {
  return this.items.length;
}

// 辅助方法
function toString() {
  var str = "";
  for (var i = 0; i < this.items.length; i++) {
    str += this.items[i] + "-";
  }
  return str;
}

// 测试
// var queue = new Queue();
// queue.enqueue("a");
// queue.enqueue("b");
// queue.enqueue("c");

// console.log(queue.toString());
// queue.dequeue();
// console.log(queue.toString());
// console.log(queue.isEmpty());
// console.log(queue.size());
// console.log(queue.first());
// console.log(queue.dequeue());

// 应用一：循环队列 - 击鼓传花算法
// 创建一个队列，将所有人放入队列中，然后通过循环将队列中的每个元素出队，
// 如果这个元素不是第 num 个数，则再将其入队，重复循环，直至队列剩下一个元素时，将其输出，这就是最终获胜的人
function passGame(nameList, num) {
  // 创建队列
  var queue = new Queue();
  // 循环加入元素
  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }
  // 寻找最后一个人
  while (queue.size() > 1) {
    for (let i = 0; i < num - 1; i++) {
      queue.enqueue(queue.dequeue());
    }
    // 将第num人移除
    queue.dequeue();
  }

  // 获取最后剩下的人
  var endName = queue.dequeue();
  //   console.log("最后剩下的人是", endName);
  return nameList.indexOf(endName);
}

var names = ["AAA", "BBB", "CCC", "DDD", "EEE"];
var index = passGame(names, 100); //数到8的人淘汰
// console.log("最终位置:" + index);

// 应用二： 优先队列
function PriorityQueue() {
  this.items = [];
  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.first = first;
  this.isEmpty = isEmpty;
  this.size = size;
  this.toString = toString;
}

// 创建优先元素的类
function QueueElement(element, priority) {
  this.element = element;
  this.priority = priority;
}

// 添加
function enqueue(element, priority) {
  // 1. 创建一个优先队列对象
  var queueElement = new QueueElement(element, priority);
  // 2. 判断队列是否为空
  if (this.items.length === 0) {
    this.items.push(queueElement);
  } else {
    var added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      this.items.push(queueElement);
    }
  }
}

// 删除
function dequeue() {
  return this.items.shift();
}

// 获取队首元素
function first() {
  return this.items[0];
}

// 是否是空队列
function isEmpty() {
  return this.items.length === 0;
}

// 队列的长度
function size() {
  return this.items.length;
}

// 辅助方法
function toString() {
  var str = "";
  for (var i = 0; i < this.items.length; i++) {
    str += this.items[i].element + "-" + this.items[i].priority;
  }
  return str;
}
//测试代码
var pq = new PriorityQueue();
pq.enqueue("a", "111");
pq.enqueue("b", "115");
pq.enqueue("c", "110");
console.log(pq.toString());
