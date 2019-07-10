"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 一: 变量类型
// 1. number 类型
var num1 = 20;
var num2 = 175.5;
var a1 = Infinity; //正无穷大
var a2 = -Infinity; //负无穷小
var a3 = NaN;
// 注意：Infinity, -Infinity, NaN 也属于Number类型
// 2.undefined 类型
var un = undefined;
// 注意: undefined 类型的数据只能被赋值为 undefined
// 在 typescript中，已声明未初始化的值要直接访问的话，类型需要定义为undefined
// 3.null 类型
var nu = null;
// 注意：
// null 类型只能被被赋值为null
// null是一个空指针对象，undefined是未初始化的变量，所以，可以把undefined看成一个空变量，把unll看成一个空对象。
// 特别注意： 
// 默认情况下，undefined 和 null 类型，是所有其它类型的子类型，也可以说成，它俩可以给所有其他类型赋值。
// 4. string 类型
var str = "nihao!"; // 值类型
var str1 = new String("nihao!"); // 引用类型
// 5. boolean 类型
var boo = true;
var boo1 = false;
// 6. symbol 类型
var sy = Symbol("bar");
// 注意; symbol类型的值是通过Symbol构造函数创建的
// 7. 数组类型
// 字面量
var arr1 = [1, 2];
// 泛型 ----> 相当于数组中每个元素的类型
var arr2 = ["a", "b"];
// 构造函数
var arr3 = new Array("a", "s");
// 联合类型 ---> 意思是数组中的元素类型可以是number或者string
var arr4 = ["e", 3];
// 8. 元组类型 （tuple）
var tup = ["sfd", 23];
// 注意：
// 元组和数组看起来有点类似，但是，是有区别的
// 元组的长度是有限的，而且分别为每一个元素定义了类型
// 9. 枚举类型(enum) 
//  enum----> 组织收集一组相关变量的方式
// 数字枚举
var REN;
(function (REN) {
    // nan = 1 ----->初始化下标
    REN[REN["nan"] = 0] = "nan";
    REN[REN["nv"] = 1] = "nv";
    REN[REN["yao"] = 2] = "yao";
})(REN || (REN = {}));
console.log(REN.nan);
console.log(REN.nv);
console.log(REN.yao);
// //使用数字枚举时，TS 会为枚举成员生成反向映射
console.log(REN[2]); // yao
// 注意：
// 数字的枚举---->下标从0开始,也可以自行设置枚举成员的初始值，它们会依次递增
// 字符串枚举
var SIJI;
(function (SIJI) {
    SIJI["chun"] = "\u6625";
    SIJI["xia"] = "\u590F";
    SIJI["qiu"] = "\u79CB";
    SIJI["dong"] = "\u51AC";
})(SIJI || (SIJI = {}));
console.log(SIJI.chun); //春
console.log(SIJI.xia); //夏
console.log(SIJI.qiu); //秋
console.log(SIJI.dong); //冬
// 注意：
// 字符串枚举类型允许使用字符串来初始化枚举成员，可以是一个字符串字面量或者另一个字符串的枚举成员
// 字符串枚举类型不支持成员自增长，每个成员必须初始化，另外字符串枚举不会为成员生成发向映射
// 10. void 类型
// void 类型--->表示没有任何返回值，一般用于定义方法时方法没有返回值
function fn1() {
    console.log('void类型');
}
// 注意：
// 这里你也可以指定返回值类型为 undefined。因为 JS 中，如果函数没有返回值，则会默认返回 undefind。不过，使用 void 类型可以使表意更清晰
// 11. any类型
// 注意： 其他类型都是any类型的子类型 ，any类型的值可以被赋值为任何类型的值
var an = 'any 类型';
console.log(an); //any 类型
an = 25;
console.log(an); //25
// 注意：对于any 需要注意两点
// 如果在声明变量时，没有声明其类型，也没有初始化，（因为类型推断会自动判断类型），那么它就会被判断为any类型
var an1;
an1 = '没有声明其类型，也没有初始化';
console.log(an1); //没有声明其类型，也没有初始化
an1 = 25;
console.log(an1); //25
// 复制代码在any类型变量上可以访问任何属性，即使它不存在
var something = 42;
something.mayExist(); // 没问题，因为其可能在运行时存在
something.toFixed(); // 没问题，虽然确实存在，但是编译器并不会去检查
// 12. never 类型
// 注意：
// never 表示永远不会存在的值的类型， never 是任何类型的子类型，但是 没有任何类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
// never 类型常用于两种情况
// 用于描述从不会有返回值的函数---》返回never的函数必须存在无法达到的终点
function f5() {
    while (true) {
        // do something
    }
}
// 复制代码用于描述总抛出错误的函数
function f2(msg) {
    throw new Error(msg);
}
// 13. 日期类型
var da = new Date();
console.log(da);
// 14. 正则表达式类型
//构造函数声明法
var reg1 = new RegExp('ljy', 'gi');
console.log(reg1);
//字面量的声明法
var reg2 = /ljy/gi;
console.log(reg2);
// 二. 函数
//  1. 函数定义    
// 定义函数有函数声明和函数表达式两种形式。定义函数的参数和返回值可以指定其类型；当调用函数时，传入参数类型必须与定义函数参数类型保持一致。
// 函数的声明定义
//            参数类型    返回值类型
function f(age) {
    return "\u627E\u5230\u4E86" + age + "\u7684\u5C0F\u54E5\u54E5";
}
var age = 22;
var res = f(age);
console.log(res);
// 函数表达式定义
var f1 = function (age) {
    return "\u627E\u5230\u4E86" + age + "\u7684\u5C0F\u54E5\u54E5";
};
var age1 = 21;
var res1 = f1(age1);
console.log(res1);
// 注意：表达式定义完以后，必须调用函数
// 函数表达式还有一种写法： 函数表达式：指定变量fn的类型
// 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
// let fn: (x: Type, y: Type) => Type = (x, y) => {}
//例子
var run3 = function (x, y) {
    return 'run3';
};
console.log(run3(1, 2));
//当给变量run3指定类型的时候，应该是函数的参数和返回值的约束类型。如果用后面学到的ts类型推论，可以简写为：
var run4 = function (x, y) {
    // 类型推论可以确定函数的参数和返回值类型，也就可以省略类型指定
    return 'run4';
};
console.log(run4(1, 2));
// 2. 函数没有返回值可以使用void类型值定返回值
function f3() {
    console.log('没有返回值');
}
f3();
// 3. 可选参数的函数  注意：可选参数一定要放在参数的最后面
function f4(age, cm) {
    //cm为可选参数，可传可不传
    if (cm) {
        return "\u53EF\u9009\u53C2\u6570------\u8EAB\u9AD8\u4E3A" + cm + "\u5398\u7C73";
    }
    else {
        return "\u53EF\u9009\u53C2\u6570-----\u5E74\u9F84" + age + "\u5C81";
    }
}
console.log(f4(12));
console.log(f4(24, 175));
// 4. 有默认值参数的函数
// 注意：ts会将添加了默认值的参数识别为可选参数，有默认值的参数的位置不受【可选参数必须放在后面】的限制
function f51(age, cm) {
    if (cm === void 0) { cm = 188; }
    return "\u9ED8\u8BA4\u53C2\u6570----\u5E74\u9F84\u4E3A" + age + "\u5C81---\u8EAB\u9AD8\u4E3A" + cm + "cm";
}
console.log(f51(25));
// 5. 剩余参数的函数
//当有很多参数的时候，或者参数个数不确定，可以用三点运算符
function f6() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    return rest.slice();
}
console.log(f6(1, 2, 3, 4, 5, 6, 7, 8, 9));
function f7(a, b) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return [a, b].concat(rest);
}
console.log(f7(100, 200, 1, 2, 3, 4, 5, 6));
// 上面定义函数的格式，下面定义函数的具体实现
function f8(x, y) {
    return x + y;
}
f8(1, 2);
f8('a', 'b');
// 三， 类
// 1. 访问修饰符
// public：公共修饰符
// 注意：
// 表示属性或方法都是公有的，在类的内部，子类的内部，类的实例都能被访问,默认情况下，为public
var People = /** @class */ (function () {
    function People(name) {
        this.name = name;
    }
    People.prototype.say = function () {
        console.log('你好');
    };
    return People;
}());
// private 私有修饰符
// 注意：
// 表示在当前类中可以访问，子类，外部类不可以访问
var People1 = /** @class */ (function () {
    function People1(name) {
        this.name = name;
    }
    People1.prototype.say = function () {
        console.log('你好');
    };
    return People1;
}());
// protected 保护类型
// 注意：
// 表示在当前类中和子类中可以访问，外部类不可以访问
var People3 = /** @class */ (function () {
    function People3(name) {
        this.name = name;
    }
    People3.prototype.say = function () {
        console.log('你好');
    };
    return People3;
}());
// 注意：
// TypeScript 只做编译时检查，当你试图在类外部访问被 private 或者 protected 修饰的属性或方法时，TS 会报错，但是它并不能阻止你访问这些属性或方法。
// readonly 只读修饰符
// 注意：
// 表示某个属性是只读的，不能被修改
var People4 = /** @class */ (function () {
    function People4(name) {
        this.name = name;
    }
    return People4;
}());
// 2. 声明类
var People5 = /** @class */ (function () {
    function People5(name, age) {
        this.name = name;
        this.age = age;
    }
    People5.prototype.say = function () {
        console.log('你好');
    };
    return People5;
}());
var HH = new People5('含含', 21);
console.log(HH.name);
console.log(HH.age);
HH.say();
// 3. 类的继承
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age, cm) {
        var _this = _super.call(this, name, age) //super 继承父类的构造函数，并向构造函数传参，super必须写在第一行
         || this;
        _this.cm = cm;
        return _this;
    }
    Student.prototype.work = function () {
        console.log('学习');
    };
    return Student;
}(People5));
var stu1 = new Student('liu', 22, 175);
console.log(stu1.name);
console.log(stu1.age);
console.log(stu1.cm);
stu1.say();
stu1.work();
//4. 静态属性和静态方法
// 注意：
// 静态方法和静态属性必须使用类名调用
// 静态属性和静态方法在实例化之前就已经存在
var People6 = /** @class */ (function () {
    function People6() {
    }
    People6.say = function () {
        console.log('静态方法');
    };
    People6.name1 = '静态属性';
    return People6;
}());
console.log(People6.name1);
People6.say();
// 注意：静态方法调用不了实例化方法和实例化属性，因为静态域加载是在解析阶段，而实例化是在初始化阶段，（java原理），所以静态方法里面不能调用本类的方法和属性，可以调用静态属性和静态方法
// 5. 多态
// 多态---->重写方法
// 父类定义一个方法不去实现，让继承它的子类去实现，每个子类的该方法有不同的表现
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.eat = function () {
        //让它的子类去实现不同的eat方法
    };
    return Animal;
}());
var Laohu = /** @class */ (function (_super) {
    __extends(Laohu, _super);
    function Laohu(name) {
        return _super.call(this, name) || this;
    }
    Laohu.prototype.eat = function () {
        console.log(this.name + "\u5403\u8089\uFF01");
    };
    return Laohu;
}(Animal));
var Laoshu = /** @class */ (function (_super) {
    __extends(Laoshu, _super);
    function Laoshu(name) {
        return _super.call(this, name) || this;
    }
    Laoshu.prototype.eat = function () {
        console.log(this.name + "\u5403\u7CAE\u98DF\uFF01");
    };
    return Laoshu;
}(Animal));
var laohu = new Laohu('老虎');
laohu.eat();
var laoshu = new Laoshu('老鼠');
laoshu.eat();
var Playy = /** @class */ (function () {
    function Playy() {
    }
    Playy.prototype.plays = function (difang) {
        console.log("\u6211\u4EEC\u8981\u53BB" + difang + "\u73A9\uFF01\uFF01\uFF01");
    };
    return Playy;
}());
var pl = new Playy();
pl.plays('北京');
// 注意：类和接口的区别
// 类可以实现（implement）多个接口，但只能扩展（extends）自一个抽象类。
// 抽象类中可以包含具体实现，接口不能。
// 抽象类在运行时是可见的，可以通过 instanceof判断。接口则只在编译时起作用。
// 接口只能描述类的公共（public）部分，不会检查私有成员，而抽象类没有这样的限制。
// 7. 抽象类和抽象方法
// 注意：
// 用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类(抽象类的子类)中实现
// 抽象类：它是提供其他类继承的基类，不能直接被实例化，子类继承可以被实例化
// abstract修饰的方法(抽象方法)只能放在抽象类里面
// 抽象类和抽象方法用来定义标准(比如定义标准为：抽象类Animal有抽象方法eat，要求它的子类必须包含eat方法)
var People8 = /** @class */ (function () {
    function People8(name) {
        this.name = name;
    }
    return People8;
}());
var Stud1 = /** @class */ (function (_super) {
    __extends(Stud1, _super);
    //抽象类的子类必须实现抽象类中的抽象方法
    function Stud1(name) {
        return _super.call(this, name) || this;
    }
    Stud1.prototype.eat = function (food) {
        console.log("\u6211\u7231\u5403" + food);
    };
    return Stud1;
}(People8));
var stu11 = new Stud1('liu');
stu11.eat('面条');
function fn8(peop) {
    //name age 必须传递
    console.log(peop);
}
var obj = {
    name: 'liu',
    age: 25
};
fn8(obj);
var play = function (difang, todo) {
    return "\u6211\u4EEC\u53BB" + difang + "\u5403" + todo;
};
console.log(play('灞桥', '吃烧烤'));
var arr = ['a', 'b'];
console.log(arr);
var obj1 = { 2: 1, 3: 4 };
console.dir(obj1);
//类实现接口要用implements , 子类必须实现接口里面声明的属性和方法
var Laoshu1 = /** @class */ (function () {
    function Laoshu1(name) {
        this.name = name;
    }
    Laoshu1.prototype.eat = function (food) {
        console.log(this.name + "\u5403" + food);
    };
    return Laoshu1;
}());
var lao = new Laoshu1('老鼠');
lao.eat('粮食');
//继承并实现接口
var XiaoLaoHu = /** @class */ (function () {
    function XiaoLaoHu(name) {
        this.name = name;
    }
    XiaoLaoHu.prototype.eat = function (food) {
        console.log(this.name + "\u5403" + food);
    };
    XiaoLaoHu.prototype.say = function (sa) {
        console.log(this.name + "\u8BF4" + sa);
    };
    return XiaoLaoHu;
}());
var xiao = new XiaoLaoHu('老虎');
xiao.eat('肉');
xiao.say('你好');
// 五， 泛型
// 注意：
// 很多时候，类型是写死的，不利于复用，泛型可以简单的理解为给类型的这种值设置变量，解决类，接口
// 方法的复用性，以及对不特定数据类型的支持
// 语法 : <类型变量名> 一般是单字母大写
// 1. 泛型函数
// 函数再调用时，指定泛型T的类型
function f9(value) {
    //传入参数类型为T，返回值的类型也为T
    console.log("\u6211\u4F20\u5165\u4E86" + value);
    return value;
}
f9(10);
function f10(value) {
    //传入参数的类型为T，返回任意类型的值
    console.log("\u6211\u8FD4\u56DE\u4E86" + value);
    return "\u6211\u8FD4\u56DE\u4E86" + value;
}
console.log(f10('我是ljy'));
// 2. 泛型类
// 泛型类，使用 < > 跟在类名后面
var Ni = /** @class */ (function () {
    function Ni(name) {
        this.name = name;
    }
    Ni.prototype.say = function (value) {
        return this.name + "\u8BF4" + value;
    };
    return Ni;
}());
var ni1 = new Ni('ljy'); //实例化类，指定类的类型是string
console.log(ni1.say('你好'));
var ni2 = new Ni(20); //实例化类，指定类的类型是number
console.log(ni2.say(23));
var fff = function (value) {
    return "\u6211\u4F20\u5165\u4E86" + value;
};
console.log(fff(25));
console.log(fff('ljy'));
function setDataTwo(value) {
    return value;
}
var setDataTwoFn = setDataTwo;
setDataTwoFn('name');
// 六，命名空间
var Shuaige;
(function (Shuaige) {
    var DeHua = /** @class */ (function () {
        function DeHua() {
            this.name = '刘德华';
        }
        DeHua.prototype.say = function () {
            console.log("\u6211\u662F" + this.name);
        };
        return DeHua;
    }());
    Shuaige.DeHua = DeHua;
})(Shuaige || (Shuaige = {}));
var Bajie;
(function (Bajie) {
    var DeHua = /** @class */ (function () {
        function DeHua() {
            this.name = '马德华';
        }
        DeHua.prototype.say = function () {
            console.log("\u6211\u662F" + this.name);
        };
        return DeHua;
    }());
    Bajie.DeHua = DeHua;
})(Bajie || (Bajie = {}));
var de = new Shuaige.DeHua();
de.say();
var de1 = new Bajie.DeHua();
de1.say();
//七, 联合类型
// 联合类型表示一个值可以是几种类型之一，我们使用（ | ）分隔每个类型
// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里面共有的成员
var ddd;
ddd = 'nihao';
console.log(ddd.length); //ddd被推断成了 string，访问它的 length 属性不会报错
console.log("\u8054\u5408\u7C7B\u578B" + ddd);
ddd = 255;
console.log("\u8054\u5408\u7C7B\u578B" + ddd);
console.log(ddd.length); //报错 ddd被推断成了 number，访问它的 length 属性时就报错了
//ddd = false                   err
//console.log(`联合类型${ddd}`)  err
// 1. 访问联合类型的属性或方法
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
function f11(name, age) {
    console.log(age.length); //报错
}
f11('ljy', '21');
// 报错：Property 'length' does not exist on type 'string | number'.Property 'length' does not exist on type 'number'.
// 上例中，length 不是 string 和 number 的共有属性，所以会报错。所以只能访问类型的共有的属性或方法
function f12(name, age) {
    console.log(age.toString);
}
f12('ljy', 21);
// 八， 类型断言
// 注意：类型断言（Type Assertion）可以用来手动指定一个值的类型。
// 语法：
// <类型>值
//  或
// 值 as 类型
// 复制代码类型断言的用法如上，在需要断言的变量前加上  即可
// 就刚才上边TypeScript 不确定一个联合类型的变量到底是哪个类型的时候来说
function f13(name, age) {
    if (age.length) { //报错
        console.log(age.length); //报错
    }
    else {
        console.log(age.toString);
    }
}
f13('ljy', 21); //Property 'length' does not exist on type 'string |number'.Property 'length' does not exist on type 'number'
// 此时可以使用类型断言，将 age 断言成 string
function f14(name, age) {
    if (age.length) { //断言
        console.log(age.length); //断言
    }
    else {
        console.log(age.toString);
    }
}
f14('ljy', 21);
// 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：
function toBoolean(something) {
    return something;
}
// Type 'string | number' cannot be converted to type 'boolean'
