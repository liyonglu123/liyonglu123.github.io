// https://leetcode-cn.com/problems/climbing-stairs/
/**
 * 枚举，数学归纳法
 * 边界条件
 * 1： 1
 * 2： 2
 * 3： 1 + 2 = 3  f(3) = f(1) + f(2)
 */
// 1. 有很多重复的计算
var climbStairs = function (n) {
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  if (n > 2) {
    return climbStairs(n - 1) + climbStairs(n - 2);
  }
};

// TODO: 如何进行记忆搜索存储
var climbStairs = function (n, menu = []) {
  if (n <= 2) {
    return n;
  }
  if (!menu[n]) {
    menu[n] = climbStairs(n - 1) + climbStairs(n - 2);
  }
  if (n > 2) {
    return menu[n - 1] + menu[n - 2];
  }
};

// 有效的只是相邻的三个元素
var climbStairs = function (n) {
  var prev = 0;
  var cur = 1;
  var temp;
  for (var i = 0; i < n; i++) {
    temp = prev;
    prev = cur;
    cur += temp;
  }
  return cur;
};

// 动态规划
var climbStairs = function (n) {
  var dp = [];
  dp[1] = 1;
  dp[2] = 2;
  for (var i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
