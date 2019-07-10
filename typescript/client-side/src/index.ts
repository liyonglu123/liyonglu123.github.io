// // index.ts
// // let a: number = 123;

// // const h1 = document.createElement("h1");
// // h1.innerHTML = "Hello, I am Lison";
// // document.body.appendChild(h1);
// // 变量: 类型
// // bool类型
// let bool: boolean = false;
// bool = true;
// // bool = 123; // error 不能将类型"123"分配给类型"boolean"
// let bool1: boolean = !!0;
// console.log(bool1); // false
// // 数值类型
// let num: number;
// num = 123;
// // num = "123"; // error 不能将类型"123"分配给类型"number"
// num = 0b1111011; //  二进制的123
// num = 0o173; // 八进制的123
// num = 0x7b; // 十六进制的123
// // 字符串
// let str: string = "Lison";
// str = "Li";
// const first = "Lison";
// const last = "Li";
// str = `${first} ${last}`;
// console.log(str); // 打印结果为:Lison Li
// // 字符串字面量类型
// let str1: "Lison";
// // str1 = "haha"; // error 不能将类型“"haha"”分配给类型“"Lison"”
// // 数组
// let list1: number[] = [1, 2, 3];
// let list2: Array < number > = [1, 2, 3];
// // bull和undefined
// let u: undefined = undefined; // 这里可能会报一个tslint的错误：Unnecessary initialization to 'undefined'，就是不能给一个值赋undefined，但我们知道这是可以的，所以如果你的代码规范想让这种代码合理化，可以配置tslint，将"no-unnecessary-initializer"设为false即可
// let n: null = null;
// // object
// let strInit = "abc";
// let strClone = strInit;
// strClone = "efg";
// console.log(strInit); // 'abc'

// let objInit = { a: "aa" };
// let objClone = objInit;
// console.log(objClone) // {a:"aa"}
// objInit.a = "bb";
// console.log(objClone); // { a: 'bb' }
// // 引用指针的作用问题
// // let obj: object;
// // obj = { name: 'Lison' };
// // obj = 123; // error 不能将类型“123”分配给类型“object”
// let obj: object;
// obj = { name: 'Lison' };
// // console.log(obj.name); // error 类型“object”上不存在属性“name”
// function getKeys(obj: object) {
//     return Object.keys(obj) // 会以列表的形式返回obj中的值
// }
// getKeys({ a: 'a' }) // ['a']
// // getKeys(123) // error 类型“123”的参数不能赋给类型“object”的参数

// // ===================== ts 引入的新类型
// // 元组
// let tuple: [string, number, boolean];
// tuple = ["a", 2, false];
// // tuple = [2, "a", false]; // error 不能将类型“number”分配给类型“string”。 不能将类型“string”分配给类型“number”。
// // tuple = ["a", 2]; // error Property '2' is missing in type '[string, number]' but required in type '[string, number, boolean]'
// tuple[1] = 3;
// tuple[0].split(":"); // right 类型"string"拥有属性"split"
// // tuple[1].split(":"); // error 类型“number”上不存在属性“split”
// // 枚举
// enum Roles {
//     SUPER_ADMIN = 0,
//         ADMIN = 1,
//         USER = 2
// };
// const superAdmin = Roles.SUPER_ADMIN;
// console.log(superAdmin); // 0
// // 这了可以赋值不同的顺序
// // any
// let value: any;
// value = 123;
// value = "abc";
// value = false;
// const array: any[] = [1, "a", true];
// // 不可以滥用any, 如果不知道类型 更安全的做法是 使用 unknown类型

// // void
// const consoleText = (text: string): void => {
//     console.log(text);
// };
// // never
// const errorFunc = (message: string): never => {
//     throw new Error(message);
// };
// const infiniteFunc = (): never => {
//     while (true) {}
// };
// let neverVariable = (() => {
//     while (true) {}
// })();
// // neverVariable = 123; // error 不能将类型"number"分配给类型"never"

// let value1: any
// console.log(value1.name)
// console.log(value1.toFixed())
// console.log(value1.length)
// // unknown  不可以进行操作的
// // 交叉类型 &
// const merge = < T,U > (arg1: T, arg2: U): T & U => {
//         let res = < T & U > {}; // 这里指定返回值的类型兼备T和U两个类型变量代表的类型的特点
//         res = Object.assign(arg1, arg2); // 这里使用Object.assign方法，返回一个合并后的对象；
//         // 关于该方法，请在例子下面补充中学习
//         return res;
//     };
// const info1 = {
//     name: "lison"
// };
// const info2 = {
//     age: 18
// };
// const lisonInfo = merge(info1, info2);
// // console.log(lisonInfo.address); // error 类型“{ name: string; } & { age: number; }”上不存在属性“address”
// // 联合类型 | 
// const getLength = (content: string | number): number => {
//     if (typeof content === "string") return content.length;
//     else return content.toString().length;
// };
// console.log(getLength("abc")); // 3
// console.log(getLength(123)); // 3

// // 使用Symbol
// let sym: symbol = Symbol();
// const key1: unique symbol = Symbol(); // 只能用 const
// let key2: symbol = Symbol();
// const obj = {
//     [key1]: 'value1',
//     [key2]: 'value2'
// };
// console.log(obj[key1]);
// console.log(obj[key2]); // error 类型“symbol”不能作为索引类型使用。
