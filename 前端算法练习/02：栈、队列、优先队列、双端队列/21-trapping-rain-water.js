// https://leetcode-cn.com/problems/trapping-rain-water/
// 接雨水
/**
 * @param {number[]} height
 * @return {number}
 */
// 0. 暴力解法- 超时
var trap = function (height) {
  let res = 0;
  for (let i = 0; i < height.length; i++) {
    let max_left = 0;
    let max_right = 0;
    // 以当前位置为基准，找出左边的边界的最大值，找出右边边界的最大值
    for (let j = i; j >= 0; j++) {
      max_left = Math.max(max_left, height[j]);
    }
    for (let j = i; j < height.length; j++) {
      max_right = Math.max(max_right, height[j]);
    }
    res += Math.min(max_left, max_right) - height[i];
  }
  return res;
};

//  O(n), O(n)
var trap = function (height) {
  let max = 0;
  let volumn = 0;
  const leftMax = [];
  const rightMax = [];

  for (let i = 0; i < height.length; i++) {
    leftMax[i] = max = Math.max(height[i], max);
  }

  max = 0;

  for (let i = height.length - 1; i >= 0; i--) {
    rightMax[i] = max = Math.max(height[i], max);
  }

  for (let i = 0; i < height.length; i++) {
    volumn = volumn + Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return volumn;
};

// 1. 单调栈 O(n), O(n)
var trap = function (height) {
  let ans = 0;
  const stack = [];
  const n = height.length;
  for (let i = 0; i < n; i++) {
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop();
      if (!stack.length) {
        break;
      }
      const left = stack[stack.length - 1];
      const currWidth = i - left - 1;
      const currHeight = Math.min(height[left], height[i]) - height[top];
      ans += currWidth * currHeight;
    }
    stack.push(i);
  }
  return ans;
};

// 2. 双指针 时间复杂度：O(n) 空间复杂度：O(1)
var trap = function (height) {
  let ans = 0;
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);
    if (height[left] < height[right]) {
      ans += leftMax - height[left];
      ++left;
    } else {
      ans += rightMax - height[right];
      --right;
    }
  }
  return ans;
};

// TODO: 4. 动态规划
