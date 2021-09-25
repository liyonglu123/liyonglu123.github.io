/**
 * new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例
 * 1. 创建一个空的简单JavaScript对象（即{}）；
 * 2. 为步骤1新创建的对象添加属性__proto__，将该属性链接至构造函数的原型对象 ；
 * 3. 将步骤1新创建的对象作为this的上下文 ；
 * 4. 如果该函数没有返回对象，则返回this。
 */

// 实现new

function myNew() {
  // Constructor => animal, 剩余的 arguments 就是其他的参数
  let Constructor = [].shift.call(arguments);
  //   console.log(Constructor, arguments);
  let obj = {}; // 返回的结果
  obj.__proto__ = Constructor.prototype;
  let r = Constructor.apply(obj, arguments);
  return r instanceof Object ? r : obj;
}

// 测试

// function Animal(type) {
//   this.type = type;
// }

// Animal.prototype.say = function () {
//   console.log("say");
// };

// let animal = myNew(Animal, "哺乳类");
// console.log(animal.type);
// animal.say();

function Animal(type) {
  this.type = type;
  return { name: "dog" };
}

Animal.prototype.say = function () {
  console.log("say");
};

let animal = myNew(Animal, "哺乳类");
console.log(animal);
