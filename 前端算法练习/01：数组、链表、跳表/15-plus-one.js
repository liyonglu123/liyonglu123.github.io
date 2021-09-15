// https://leetcode-cn.com/problems/plus-one/
// 1. 数组的api, 没有考虑到最后以为添加的时候是否超过10
var plusOne = function (digits) {
  // 数值6145390195186705544超出Number基本类型的容纳范围，改用BigInt基本类型
  let num = BigInt(digits.join(""));
  // BigInt基本类型进行数学操作时，需要在数字字面量后加个n
  let string = String(num + 1n);
  let ary = string.split("");
  return ary.map((str) => Number(str));
};

// 2. 分类讨论思想 对10 取余, 找重复性
var plusOne = function (digits) {
  var len = digits.length;
  for (var i = len - 1; i >= 0; i--) {
    digits[i]++;
    digits[i] %= 10;
    if (digits[i] != 0) {
      return digits;
    }
  }
  digits.unshift(1);
  return digits;
};
