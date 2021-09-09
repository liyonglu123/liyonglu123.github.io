// https://leetcode-cn.com/problems/linked-list-cycle
// 1. js 语言的特性
var hasCycle = function (head) {
  try {
    // 不能进行循环引用
    JSON.stringify(head);
  } catch (error) {
    return true;
  }
  return false;
};

// 2. 迭代 标记法
var hasCycle = function (head) {
  if (head === null || head.next === null) {
    return false;
  }
  while (head) {
    if (head.visit) {
      return true;
    }
    head.visit = true;
    head = head.next;
  }
  return false;
};

// 3. 快慢指针-- 操场跑步总有相遇的时候
var hasCycle = function (head) {
  if (head === null || head.next === null) {
    return false;
  }
  var slow = head;
  var fast = head;
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
};
