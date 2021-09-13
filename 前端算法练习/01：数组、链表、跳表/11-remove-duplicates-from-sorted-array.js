// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array
// 1. O(n)
var removeDuplicates = function (nums) {
  var result = [];
  for (var i = 0; i < nums.length; i++) {
    if (!result.includes(nums[i])) {
      result.push(nums[i]);
    }
  }
  return result;
};

// 2. map
var removeDuplicates = function (nums) {
  var map = new Map();
  for (var i = 0; i < nums.length; i++) {
    if (!map.has(nums[i])) {
      map.set(nums[i]);
    }
  }
  return map.keys();
};

// 3. 双指针
var removeDuplicates = function (nums) {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  let fast = 1,
    slow = 1;
  while (fast < n) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast];
      ++slow;
    }
    ++fast;
  }
  return slow;
};

// 4. 同上
var removeDuplicates = function (nums) {
  if (!nums.length) return 0;
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
};
