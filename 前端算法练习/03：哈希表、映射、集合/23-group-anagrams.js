// https://leetcode-cn.com/problems/group-anagrams/
// 字母异位词分组
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// 1. 排序
var groupAnagrams = function (strs) {
  const map = new Map();
  for (let str of strs) {
    let array = Array.from(str);
    array.sort();
    let key = array.toString();
    let list = map.get(key) ? map.get(key) : new Array();
    list.push(str);
    map.set(key, list);
  }
  return Array.from(map.values());
};

// 2. 计数
var groupAnagrams = function (strs) {
  const map = new Map();
  for (let s of strs) {
    const count = new Array(26).fill(0);
    for (let c of s) {
      count[c.charCodeAt() - "a".charCodeAt()]++;
    }
    map[count] ? map[count].push(s) : (map[count] = [s]);
  }
  console.log(map);
  return Object.values(map);
};

//
var groupAnagrams = function (strs, m = {}) {
  for (const str of strs) {
    const k = str.split("").sort().join("");
    (m[k] || (m[k] = [])).push(str);
  }
  return Object.values(m);
};

var groupAnagrams = function (strs) {
  /* sort each string, use that as key in map and when new sorted string matches a key we add it to that */
  const map = {};

  for (const str of strs) {
    const sorted = str.split("").sort().join("");

    if (!map[sorted]) {
      map[sorted] = [str];
    } else {
      map[sorted].push(str);
    }
  }

  return Object.values(map);
};
