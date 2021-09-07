// 移动零 https://leetcode-cn.com/problems/move-zeroes/

/**
 * 输入: [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 * 1. loop 先添加非0,在添加0
 * 2. loop 前后添加
 * 3. 改变索引
 *
 */
var moveZeroes1 = function (nums) {
  var result = [];
  var zeroNum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      result.push(nums[i]);
    } else {
      zeroNum++;
    }
  }
  if (zeroNum) {
    for (let j = 0; j < zeroNum; j++) {
      result.push(0);
    }
  }
  return result;
};

var moveZeroes2 = function (nums) {
  var result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      result.push(nums[i]);
    }
  }
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] === 0) {
      result.push(0);
    }
  }
  return result;
};

// 最优解
var moveZeroes3 = function (nums) {
  var j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j] = nums[i];
      if (i != j) {
        nums[i] = 0;
      }
      j++;
    }
  }
  return nums;
};

var moveZeroes4 = function (nums) {
  var pos = 0;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[pos++] = nums[i];
    }
  }
  for (i = pos; i < nums.length; i++) {
    nums[i] = 0;
  }
  return nums;
};

var moveZeroes5 = function (nums) {
  var idx = 0;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[idx] = nums[i];
      nums[i] = idx === i ? nums[i] : 0;
      idx++;
    }
  }
  return nums;
};

var moveZeroes = function (nums) {
  for (var i = nums.length; i--; ) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      nums.push(0);
    }
  }
};

console.log(moveZeroes([0, 1, 0, 3, 12]));
