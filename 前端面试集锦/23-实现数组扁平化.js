/**
 * 数组扁平化
 * [1, [2, 3, [4, 5]]]  ------>    [1, 2, 3, 4, 5]
 */

// 1. es6 的 flat()
// var arr = [1, [2, 3, [4, 5]]];
// console.log(arr.flat(Infinity));

// 2. 序列后使用正则
// var arr = [1, [2, 3, [4, 5]]];
// var str = JSON.stringify(arr).replace(/(\[|\])/g, "");
// str = "[" + str + "]";
// console.log(JSON.parse(str));

// 3. 递归处理
// var arr = [1, [2, 3, [4, 5]]];
// function flat(arr) {
//   let result = [];
//   for (const item of arr) {
//     item instanceof Array
//       ? (result = result.concat(flat(item)))
//       : result.push(item);
//   }
//   return result;
// }

// console.log(flat(arr));

// 4. reduce处理， 遍历数组每一项，如果是数组递归遍历，否则直接累加
// var arr = [1, [2, 3, [4, 5]]];
// function flat(arr) {
//   return arr.reduce((prev, current) => {
//     return prev.concat(current instanceof Array ? flat(current) : current);
//   }, []);
// }
// console.log(flat(arr));

// 5. 迭代+扩展运算符。 es6扩展运算符能将二位数组变成一维
var arr = [1, [2, 3, [4, 5]]];
// console.log(...arr)
// 每次while都会合并一层的元素，然后arr.some判断数组中是否存在数组
// 如果存在，继续进入第二次循环合并
while (arr.some(Array.isArray)) {
  arr = [].concat(...arr);
}
console.log(arr);
