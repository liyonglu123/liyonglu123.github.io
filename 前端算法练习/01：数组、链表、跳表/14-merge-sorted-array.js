// https://leetcode-cn.com/problems/merge-sorted-array/
// 1. 使用数组本身的API
var merge = function (nums1, m, nums2, n) {
  return nums1.concat(nums2).sort((a, b) => a - b);
};

var merge = function (nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - 1, ...nums2);
  nums1.sort((a, b) => a - b);
};

// 2. 利用数组的有序性--》 双指针
var merge = function (nums1, m, nums2, n) {
  var p1 = 0;
  var p2 = 0;
  var result = new Array(m + n).fill(0);
  var cur;
  while (p1 < m || p2 < n) {
    if (p1 === m) {
      cur = nums2[p2++];
    } else if (p2 === n) {
      cur = nums1[p1++];
    } else if (nums1[p1] < nums2[p2]) {
      cur = nums1[p1++];
    } else {
      cur = nums2[p2++];
    }
    result[p1 + p2 - 1] = cur;
  }
  for (var i = 0; i != m + n; ++i) {
    nums1[i] = result[i];
  }
};

// 3. 逆向双指针
var merge = function (nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let tail = m + n - 1;
  var cur;
  while (p1 >= 0 || p2 >= 0) {
    if (p1 === -1) {
      cur = nums2[p2--];
    } else if (p2 === -1) {
      cur = nums1[p1--];
    } else if (nums1[p1] > nums2[p2]) {
      cur = nums1[p1--];
    } else {
      cur = nums2[p2--];
    }
    nums1[tail--] = cur;
  }
};

// 4. 比对
var merge = function (nums1, m, nums2, n) {
  var insertPos = m + n - 1;
  m--;
  n--;
  while (n >= 0) {
    nums1[insertPos--] = nums1[m] > nums2[n] ? nums1[m--] : nums2[n--];
  }
};

console.log(merge(nums1, m, nums2, n));
