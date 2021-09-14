// https://leetcode-cn.com/problems/merge-two-sorted-lists/
// 1. 递归 O(m+n)
var mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};

// 2. 迭代
var mergeTwoLists = function (l1, l2) {
  var dummy = new ListNode();
  cur = dummy;
  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  // 最终只要一个为空
  cur.next = l1 === null ? l2 : l1;
  return dummy.next;
};
