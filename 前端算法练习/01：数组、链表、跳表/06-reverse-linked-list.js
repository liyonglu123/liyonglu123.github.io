// https://leetcode-cn.com/problems/reverse-linked-list
/**
 *  单向链表的特点是，val, next用于指向下一个节点
 */
// 1. 迭代 O(n) 双指针
var reverseList = function (head) {
  var prev = null;
  var cur = head;
  while (cur) {
    var next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
};

// 2. 递归
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  var newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};
