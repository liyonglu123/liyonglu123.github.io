//  https://leetcode-cn.com/problems/sliding-window-maximum
/**
 * 滑动窗口最大值
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 1. 暴力法
var maxSlidingWindow = function (nums, k) {
  var n = nums.length;
  if (n === 0) {
    return [];
  }
  var res = [];
  for (var i = 0; i < n - k + 1; i++) {
    var max = Number.MIN_SAFE_INTEGER;
    for (var j = i; j < i + k; j++) {
      max = Math.max(max, nums[j]);
    }
    res.push(max);
  }
  return res;
};

// // 2. 滑动窗口+双端队列 O(n)， O(n)
// var maxSlidingWindow = function (nums, k) {
//   var n = nums.length;
//   class SlideWindow {
//     constructor() {
//       this.data = [];
//     }
//     push(val) {
//       var data = this.data;
//       while (data.length > 0 && data[data.length - 1] < val) {
//         data.pop();
//       }
//     }
//     pop(val) {
//       var data = this.data;
//       if (data.length > 0 && data[0] >= val) {
//         data.shift();
//       }
//     }
//     max() {
//       return this.data[0];
//     }
//   }
//   var res = [];
//   var window = new SlideWindow();
//   for (var i = 0; i < n; i++) {
//     if (i < k - 1) {
//       window.push(nums[i]);
//     } else {
//       window.push(nums[i]);
//       res.push(window.max());
//       window.pop(nums[i - k + 1]);
//     }
//   }
//   return res;
// };

// 3. 单调队列
var maxSlidingWindow = function (nums, k) {
  const n = nums.length;
  const q = [];
  for (let i = 0; i < k; i++) {
    while (q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    q.push(i);
  }
  const ans = [nums[q[0]]];
  for (let i = k; i < n; i++) {
    while (q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    q.push(i);
    while (q[0] <= i - k) {
      q.shift();
    }
    ans.push(nums[q[0]]);
  }
  return ans;
};

var maxSlidingWindow = function (nums, k) {
  const q = []; // stores *indices*
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    while (q && nums[q[q.length - 1]] <= nums[i]) {
      q.pop();
    }
    q.push(i);
    // remove first element if it's outside the window
    if (q[0] === i - k) {
      q.shift();
    }
    // if window has k elements add to results (first k-1 windows have < k elements because we start from empty window and add 1 element each iteration)
    if (i >= k - 1) {
      res.push(nums[q[0]]);
    }
  }
  return res;
};
