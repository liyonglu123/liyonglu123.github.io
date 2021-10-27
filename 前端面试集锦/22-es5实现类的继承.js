/**
 * 使用ES5实现类的继承
 * 最好的方案是 寄生式组合继承， babel对es6继承的转化也是使用的改方式
 */
// ---------- 1. 构造函数继承: 缺点是继承不到父类原型上的属性和方法---------
function Parent() {
  this.name = "parent";
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  Parent.call(this);
  this.type = "child";
}

// var child = new Child();
// console.log(child);
// console.log(child.getName());

// ------------------2. 原型链继承 -------------
function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}
Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  this.type = "child";
}

// 子类的原型对象指向父类的实例
Child.prototype = new Parent();
// 根据原型链的规则，绑定constructor，这一步不影响继承，只是在用到constructor的时候需要
Child.prototype.constructor = Child;

// var child1 = new Child();
// console.log(child.name);
// console.log(child.getName());

// var child2 = new Child();

// child1.play.push(4);
// 两个实例引用的是同一个原型对象
// 1. 由于Child实例原型都指向同一个Parent实例，因此某个Child实例的父类引用类型变量修改会影响所有Child实例
// 2. 在创建子类实例时无法向父类构造传参，即没有实现super()功能
// console.log(child1.play, child2.play);

// --------------- 3.组合式继承 ----------------
function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  // 构造函数继承
  Parent.call(this);
  this.type = "child";
}

// 原型链继承
Child.prototype = new Parent();
// 如果不指定 Child.prototype.constructor 为 Child，根据原型链规则会默认向上查找，最后会指向 Parent
Child.prototype.constructor = Child;

// var child1 = new Child();
// var child2 = new Child();
// console.log(child1); // Child { name: 'parent', play: [ 1, 2, 3 ], type: 'child' }
// console.log(child1.getName()); // parent

// child1.play.push(4);
// console.log(child1.play, child2.play); // [ 1, 2, 3, 4 ] [ 1, 2, 3 ]
// 缺点：Parent的构造函数会多执行一次 Child.prototype = new Parent(); 虽然不影响父类的继承，但子类创建实例时，原型中会存在两份
// 相同的属性和方法

// ------------4. 寄生式组合继承 ，将指向父类实例改为指向父类原型----------------

function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  Parent.call(this);
  this.type = "child";
}

// 将指向父类实例改为指向父类原型
Child.prototype = Parent.prototype;
Child.prototype.constructor = Child;

// var child1 = new Child();
// var child2 = new Child();
// console.log(child1); // Child { name: 'parent', play: [ 1, 2, 3 ], type: 'child' }
// console.log(child1.getName()); // parent

// child1.play.push(4);
// console.log(child1.play, child2.play); // [ 1, 2, 3, 4 ] [ 1, 2, 3 ]
// 缺点： Child.prototype = Parent.prototype; 子类原型和父类原型指同一个对象，对子类原型的操作会
// 会影响到父类原型，需要给 Parent.prototype做一个浅拷贝

// ------- 5. 最终方案 --------
function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child() {
  Parent.call(this);
  this.type = "child";
}

// 给 Parent.prototype做一个浅拷贝
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

var child1 = new Child();
var child2 = new Child();
console.log(child1); // Child { name: 'parent', play: [ 1, 2, 3 ], type: 'child' }
console.log(child1.getName()); // parent

child1.play.push(4);
console.log(child1.play, child2.play); // [ 1, 2, 3, 4 ] [ 1, 2, 3 ]
