// https://leetcode-cn.com/problems/reverse-nodes-in-k-group/
// 1. 递归
var reverseKGroup = function (head, k) {
  function reverse(curr) {
    var prev = null;
    while (curr) {
      var next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    return prev;
  }
  if (!head) {
    return null;
  }
  var tail = head;
  for (var i = 1; i < k; i++) {
    tail = tail.next;
    if (!tail) {
      return head;
    }
  }
  var next = tail.next;
  tail.next = null;
  reverse(head);
  head.next = reverseKGroup(next, k);
  return tail;
};

// 2.  额外的傻瓜指针处理-- 举一反三， 总结规律
var reverseKGroup = function (head, k) {
  // 翻转start -> end的链表
  function reverseList(start, end) {
    let [pre, cur] = [start, start.next];
    const first = cur;
    while (cur !== end) {
      let next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
    }
    start.next = pre;
    first.next = cur;
    return first;
  }
  // 初始化一个傻瓜节点
  let dummy = new ListNode();
  dummy.next = head;
  let [start, end] = [dummy, dummy.next];
  let count = 0;
  while (end) {
    count++;
    if (count % k === 0) {
      start = reverseList(start, end.next);
      end = start.next;
    } else {
      end = end.next;
    }
  }
  return dummy.next;
};
