// https://leetcode-cn.com/problems/swap-nodes-in-pairs
// 1234 ---> 2143  == 树形结合思想
// 1. 递归一
var swapPairs = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  var newHead = head.next;
  head.next = swapPairs(newHead.next);
  newHead.next = head;
  return newHead;
};

// 递归二
var swapPairs = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  var v1 = head;
  var v2 = head.next;
  var v3 = v2.next;
  v2.next = v1;
  v1.next = swapPairs(v3);
  return v2;
};

// 2. 迭代
var swapPairs = function (head) {
  var dummyHead = new ListNode(0);
  dummyHead.next = head;
  var temp = dummyHead;
  while (temp.next !== null && temp.next.next !== null) {
    var node1 = temp.next;
    var node2 = temp.next.next;
    temp.next = node2;
    node1.next = node2.next;
    node2.next = node1;
    temp = node1;
  }
  return dummyHead.next;
};
