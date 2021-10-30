/**
 * 实现单例模式
 * 全局只有一个实例对象，并提供一个访问它的全局访问点，如线程池，全局缓存，window对象等
 */

// 1. 常规实现
// 单例构造函数
function CreateSingleton(name) {
  this.name = name;
  this.getName();
}

// 获取实例的名字
CreateSingleton.prototype.getName = function () {
  console.log(this.name);
};

// 单例对象
let Singleton = (function () {
  let instance;
  return function (name) {
    if (!instance) {
      instance = new CreateSingleton(name);
    }
    return instance;
  };
})();

// 创建实例对象1
// let a = new Singleton("a");
// let b = new Singleton("b");

// console.log(a === b); // true

// 2. 使用闭包和Proxy属性拦截实现
const singleton = (className) => {
  return new Proxy(className.prototype.constructor, {
    instance: null,
    construct: (target, argumentList) => {
      if (!this.instance) {
        this.instance = new target(...argumentList);
      }
      return this.instance;
    },
  });
};

class MyClass {
  constructor(msg) {
    this.msg = msg;
  }

  printMsg() {
    console.log(this.msg);
  }
}

MySingletonClass = singleton(MyClass);
const myObj1 = new MySingletonClass("first");
myObj1.printMsg();
const myObj2 = new MySingletonClass("second");
myObj2.printMsg();
