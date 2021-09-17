// https://leetcode-cn.com/problems/valid-parentheses/

// 1. 暴力法, 字符串的replace方法
var isValid = function (s) {
  while (s.includes("()" || s.includes("[]") || s.includes("{}"))) {
    if (s.includes("()")) {
      s.replace("()", "");
    }
    if (s.includes("[]")) {
      s.replace("[]", "");
    }
    if (s.includes("{}")) {
      s.replace("{}", "");
    }
  }
  return s.length === 0;
};

// 2. 栈
var isValid = function (s) {
  const n = s.length;
  if (n % 2 === 1) {
    return false;
  }
  const pairs = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);
  const stk = [];
  for (let ch of s) {
    if (pairs.has(ch)) {
      if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
        return false;
      }
      stk.pop();
    } else {
      stk.push(ch);
    }
  }
  return !stk.length;
};

// 3. TODO: 递归如何实现
var isValid = function (s) {
  return;
};
