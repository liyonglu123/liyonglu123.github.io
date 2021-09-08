// https://leetcode-cn.com/problems/3sum/

// 1. TODO: 暴力法 3层循环，但是需要进行去重的比对--- 舍弃
var threeSum = function (nums) {
  var len = nums.length;
  var result = [];
  if (len < 3) {
    return [];
  } else {
    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        for (var z = j + 1; z < len; z++) {
          if (nums[i] + nums[j] + nums[z] === 0) {
            var a = result.push([nums[i], nums[j], nums[z]]);
          }
        }
      }
    }
  }
  return result;
};

// TODO:  2. map a+b+c = 0 --> a+b = -c 去重问题,  O(n^3)
var threeSum = function (nums) {
  var len = nums.length;
  if (len < 3) {
    return [];
  }
  var resArr = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len; i++) {
    if (i !== 0 && nums[i] === nums[i - 1]) continue;
    const map = new Map();
    for (let j = i + 1; j < len; j++) {
      if (map.has(-nums[i] - nums[j])) {
        resArr.push([nums[i], nums[j], -nums[i] - nums[j]]);
        while (j + 1 < len && nums[j] === nums[j + 1]) j++;
      }
      map.set(nums[j]);
    }
  }
  return resArr;
};

// 3. 排序+ 双指针
var threeSum = function (nums) {
  var len = nums.length;
  var result = [];
  if (len < 3) {
    return [];
  }
  // 排序
  nums.sort((a, b) => a - b);
  for (var i = 0; i < len; i++) {
    // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
    if (nums[i] > 0) {
      break;
    }
    // 去重
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    var left = i + 1;
    var right = len - 1;
    while (left < right) {
      var sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++; // 去重
        while (left < right && nums[right] === nums[right - 1]) right--; // 去重
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      }
    }
  }
  return result;
};
