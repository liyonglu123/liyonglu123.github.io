/**
 * instanceof
 * instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
 * object instanceof constructor
 * 实例对象            构造函数
 * 沿着原型链的向上查找，直到找到原型的最顶端，也就是Object.prototype。
 * 查找构造函数的 prototype 属性是否出现在某个实例对象的原型链上，如果找到了返回 true，没找到返回 false。
 */

// console.log([] instanceof Array); // true
// console.log([] instanceof Object); // true

// // 相当于
// console.log([].__proto__ === Array.prototype); // true
// console.log([].__proto__.__proto__ === Object.prototype); // true

// 实现instanceof, 链需要进行loop处理
function myInstanceof(left, right) {
  left = left.__proto__;
  while (true) {
    if (left === null) {
      return false;
    }
    if (left === right.prototype) {
      return true;
    }
    left = left.__proto__;
  }
}

// 测试
class A {}
const a = new A();
console.log(myInstanceof(a, A)); // true
console.log(myInstanceof(a, Object)); // true
console.log(myInstanceof(a, Array)); // false
