// https://leetcode-cn.com/problems/linked-list-cycle-ii

// 1. 标记法
var detectCycle = function (head) {
  if (head === null || head.next === null) {
    return null;
  }
  while (head) {
    if (head.visited) {
      return head;
    }
    head.visited = true;
    head = head.next;
  }
  return null;
};

// 2. 快慢指针-- 如何找出等量关系
var detectCycle = function (head) {
  if (head === null || head.next === null) {
    return null;
  }
  var slow = head;
  var fast = head;
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      // 这里不知fast比slow快了多少， 需要另外一个指针进行处理
      var pre = head;
      while (pre !== slow) {
        pre = pre.next;
        slow = slow.next;
      }
      return pre;
    }
  }
  return null;
};

//
var detectCycle = function (head) {
  var p = [head, head];
  while (p[0] && p[1]) {
    p = [p[0].next, p[1].next ? p[1].next.next : null];
    if (p[0] && p[0] === p[1]) {
      while (head) {
        if (p[0] === head) return head;
        (p[0] = p[0].next), (head = head.next);
      }
    }
  }
  return null;
};
