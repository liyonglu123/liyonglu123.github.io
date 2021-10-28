/**
 * 实现数组的交集，并集以及补集
 */

// 1. 取交集
// includes实现
// var a = [1, 2, 3];
// var b = [2, 4, 5];
// var intersection = a.filter((item) => b.includes(item));
// console.log(intersection);

// Array.form
// var a = [1, 2, 3];
// var b = [2, 4, 5];
// var aSet = new Set(a);
// var bSet = new Set(b);
// var intersection = Array.from(new Set(a.filter((v) => bSet.has(v))));
// console.log(intersection);

// indexOf
// var a = [1, 2, 3];
// var b = [2, 4, 5];
// var intersection = a.filter((v) => b.indexOf(v) > -1);
// console.log(intersection);

// 2. 取并集
// includes
// var a = [1, 2, 3];
// var b = [2, 4, 5];
// var union = a.concat(b.filter((v) => !a.includes(v)));

// Array.form
// var a = [1, 2, 3];
// var b = [2, 4, 5];
// var aSet = new Set(a);
// var bSet = new Set(b);
// let union = Array.from(new Set(a.concat(b)));

// indexOf
// var a = [1, 2, 3];
// var b = [2, 4, 5];
// var union = a.concat(b.filter((v) => a.indexOf(v) === -1));
// console.log(union);

// 3. 取差集
// includes
// var a = [1, 2, 3];
// var b = [2, 4, 5];

// var difference = a.concat(b).filter((v) => !a.includes(v) || !b.includes(v));
// console.log(difference);

// Array.from
// var a = [1, 2, 3];
// var b = [2, 4, 5];
// var aSet = new Set(a);
// var bSet = new Set(b);

// var difference = Array.from(
//   new Set(a.concat(b).filter((v) => !aSet.has(v) || !bSet.has(v)))
// );
// console.log(difference);

// indexOf
var a = [1, 2, 3];
var b = [2, 4, 5];
// var difference = a
//   .concat(b)
//   .filter((v) => a.indexOf(v) === -1 || b.indexOf(v) === -1);

var difference = a
  .filter((v) => b.indexOf(v) === -1)
  .concat(b.filter((v) => a.indexOf(v) === -1));

console.log(difference);
