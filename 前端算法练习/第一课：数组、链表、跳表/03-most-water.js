// https://leetcode-cn.com/problems/container-with-most-water/
// [1,8,6,2,5,4,8,3,7]
// 1. 暴力法 容易超时
var maxArea = function (height) {
  var max = 0;
  for (var i = 0; i < height.length; i++) {
    for (var j = i + 1; j < height.length; j++) {
      var cur = (j - i) * Math.min(height[i], height[j]);
      max = cur > max ? cur : max;
    }
  }
  return max;
};

// 双指针
var maxArea = function (height) {
  var left = 0;
  var right = height.length - 1;
  var max = 0;
  while (left < right) {
    var currentArea = Math.min(height[right], height[left]) * (right - left);
    max = Math.max(currentArea, max);
    if (height[left] <= height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return max;
};
