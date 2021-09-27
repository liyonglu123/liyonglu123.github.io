// https://leetcode-cn.com/problems/valid-anagram/description/
// 有效的字母异位词
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 1. 排序比对， 时间复杂度：O(nlogn)， 空间复杂度：O(logn)
var isAnagram = function (s, t) {
  return (
    s.length === t.length && [...s].sort().join("") === [...t].sort().join("")
  );
};

// 2. 哈希表
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }
  const table = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    table[s.codePointAt(i) - "a".codePointAt(0)]++;
  }
  console.log(table);
  for (let i = 0; i < t.length; i++) {
    table[t.codePointAt(i) - "a".codePointAt(0)]--;
    if (table[t.codePointAt(i) - "a".codePointAt(0)] < 0) {
      return false;
    }
  }
  return true;
};

console.log(isAnagram("anagram", "anagram"));
