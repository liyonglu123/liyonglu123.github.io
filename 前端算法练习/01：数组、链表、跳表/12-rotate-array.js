// https://leetcode-cn.com/problems/rotate-array
// 优先使用数组本身的API去实现
// 1. O(n)
var rotate = function (nums, k) {
  var len = nums.length;
  var result = [];
  for (var i = 0; i < nums.length; i++) {
    // if (i + k <= len) {
    //   result[i + k] = nums[i];
    // } else {
    //   result[i + k - len - 1] = nums[i];
    // }
    // or
    result[(i + k) % len] = nums[i];
  }
  for (var i = 0; i < len; i++) {
    nums[i] = result[i];
  }
  return nums;
};

//2. TODO: 环状替换 -- 没有理解

var rotate = function (nums, k) {
  const gcd = (x, y) => (y ? gcd(y, x % y) : x);
  const n = nums.length;
  k = k % n;
  let count = gcd(k, n);
  for (let start = 0; start < count; ++start) {
    let current = start;
    let prev = nums[start];
    do {
      const next = (current + k) % n;
      const temp = nums[next];
      nums[next] = prev;
      prev = temp;
      current = next;
    } while (start !== current);
  }
};

// 3. 反转数组
var rotate = function (nums, k) {
  var reverse = function (nums, start, end) {
    while (start < end) {
      var temp = nums[start];
      nums[start] = nums[end];
      nums[end] = temp;
      start++;
      end--;
    }
  };
  k %= nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
};
