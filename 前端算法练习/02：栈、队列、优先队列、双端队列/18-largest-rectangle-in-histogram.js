// https://leetcode-cn.com/problems/largest-rectangle-in-histogram
/**
 * @param {number[]} heights
 * @return {number}
 */
// 1. 暴力枚举， 时间复杂度：O(n^3) 空间复杂度：O(1)
var largestRectangleArea = function (heights) {
  var maxArea = 0;
  for (var i = 0; i < heights.length; i++) {
    for (var j = i; j < heights.length; j++) {
      var minHeight = Number.MAX_SAFE_INTEGER;
      for (var k = i; k < j; k++) {
        minHeight = Maht.min(minHeight, heights[k]);
      }
      maxArea = Math.max(maxArea, minHeight * (j - i + 1));
    }
  }
  return maxArea;
};

// 2. 暴力优化版本 时间复杂度：O(n^2) 空间复杂度：O(1)
var largestRectangleArea = function (heights) {
  var maxArea = 0;
  for (var i = 0; i < heights.length; i++) {
    var minHeight = Number.MAX_SAFE_INTEGER;
    for (var j = i; j < heights.length; j++) {
      minHeight = Maht.min(minHeight, heights[j]);
      maxArea = Math.max(maxArea, minHeight * (j - i + 1));
    }
  }
  return maxArea;
};

//
var largestRectangleArea = function (heights) {
  let maxArea = 0,
    n = heights.length,
    left,
    right;

  for (let i = 0; i < heights.length; i++) {
    left = i - 1;
    right = i + 1;
    while (left >= 0 && heights[left] >= heights[i]) left--;
    while (right < n && heights[right] >= heights[i]) right++;
    maxArea = Math.max(heights[i] * (right - left - 1), maxArea);
  }
  return maxArea;
};

// 3. 分治法 时间复杂度：O(nlogn),最坏情况下数组有序为O(n^2) 空间复杂度：O(n)
var largestRectangleArea = function (heights) {
  function calcArea(start, end) {
    if (start > end) {
      return 0;
    }
    var minIndex = start;
    for (var i = start; i <= end; i++) {
      if (heights[minIndex] > heights[i]) {
        minIndex = i;
      }
    }
    return Math.max(
      heights[minIndex] * (end - start + 1),
      Math.max(calcArea(start, minIndex - 1), calcArea(minIndex + 1, end))
    );
  }
  return calcArea(0, heights.length - 1);
};

// 4. 栈解 时间复杂度：O(n) 空间复杂度：O(n)

var largestRectangleArea = function (heights) {
  var maxArea = 0;
  var stack = [];
  heights.push(0);
  heights.unshift(0);
  for (var i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
      maxArea = Math.max(
        maxArea,
        heights[stack.pop()] * (i - stack[stack.length - 1] - 1)
      );
    }
    stack.push(i);
  }
  return maxArea;
};
