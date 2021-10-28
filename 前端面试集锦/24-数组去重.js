/**
 * 数组去重
 */
// 1. filter 方法可以过滤掉不符合条件的元素，并返回一个新数组，任何不符合条件的数组都将不在过滤后的数组中
var arr = ["banana", "apple", "orange", "lemon", "apple", "lemon"];
// function removeRepeat(arr) {
//   return arr.filter((item, index) => arr.indexOf(item) === index);
// }

// // 找出重复的值
// function findRepeat(arr) {
//   return arr.filter((item, index) => arr.indexOf(item) !== index);
// }
// console.log(removeRepeat(arr));
// console.log(findRepeat(arr));

// 2. es6的 Set, es6的新对象类型，用于创建唯一key集合
// var arr = ["banana", "apple", "orange", "lemon", "apple", "lemon"];
// function removeRepeat(arr) {
//   return [...new Set(arr)];
// }
// console.log(removeRepeat(arr));

// 3. 使用forEach方法， forEach 方法可以遍历数组中的元素，如果该元素不在数组中，就将该元素push到数组中。
var arr = ["banana", "apple", "orange", "lemon", "apple", "lemon"];

// function removeRepeat(arr) {
//   let result = [];
//   arr.forEach((item) => {
//     if (!result.includes(item)) {
//       result.push(item);
//     }
//   });
//   return result;
// }
// console.log(removeRepeat(arr));

//4. 使用reduce方法
var arr = ["banana", "apple", "orange", "lemon", "apple", "lemon"];

// function removeRepeat(arr) {
//   return arr.reduce((prev, current) => {
//     if (prev.indexOf(current) < 0) {
//       prev.push(current);
//     }
//     return prev;
//   }, []);
// }

// function removeRepeat(arr) {
//   return arr.reduce(
//     (prev, current) => (prev.includes(current) ? prev : [...prev, current]),
//     []
//   );
// }

// console.log(removeRepeat(arr));

// 5. 在数组原型上添加去重方法
// var arr = ["banana", "apple", "orange", "lemon", "apple", "lemon"];

// Array.prototype.unique = function () {
//   let result = [];
//   for (var i = 0; i < this.length; i++) {
//     if (!result.includes(this[i])) {
//       result.push(this[i]);
//     }
//   }
//   return result;
// };

// console.log(arr.unique());

// 6. Array.from+ es6 Set
// var arr = ["banana", "apple", "orange", "lemon", "apple", "lemon"];
// function removeRepeat(arr) {
//   return Array.from(new Set(arr));
// }

// console.log(removeRepeat(arr));

// 7. 从对象数组找那个删除重复的对象， 我们需要通过属性的名称从对象数据中删除重复的对象，我们可以使用 Map 来实现
var users = [
  { id: 1, name: "susan", age: 25 },
  { id: 2, name: "cherry", age: 28 },
  { id: 3, name: "cindy", age: 27 },
  { id: 2, name: "cherry", age: 28 },
  { id: 1, name: "susan", age: 25 },
];

// function uniqueByKey(data, key) {
//   return [...new Map(data.map((x) => [key(x), x])).values()];
// }
// console.log(uniqueByKey(users, (item) => item.id)); map中key进行覆盖处理
// 使用reduce实现
function uniqueByKey(data, key) {
  const obj = {};
  return data.reduce((prev, next) => {
    obj[next[key]] ? "" : (obj[next[key]] = true && prev.push(next));
    return prev;
  }, []);
}
console.log(uniqueByKey(users, "id"));
