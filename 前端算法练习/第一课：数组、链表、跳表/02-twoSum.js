// https://leetcode-cn.com/problems/two-sum/

// 1. 暴力 O(n^2)
var twoSum = function (nums, target) {
  for (var i = 0; i < nums.length; i++) {
    for (var j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
};

// 2. map
var twoSum = function (nums, target) {
  var map = {};
  for (var i = 0; i < nums.length; i++) {
    if (map.hasOwnProperty(target - nums[i])) {
      return [map[target - nums[i]], i];
    }
    map[nums[i]] = i;
  }
  return [];
};
