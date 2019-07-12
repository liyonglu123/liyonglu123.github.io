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

// 枚举 enum
// enum Status {// 这里你的TSLint可能会报一个：枚举声明只能与命名空间或其他枚举声明合并。这样的错误，这个不影响编译，声明合并的问题我们在后面的小节会讲。
//     Uploading,
//     Success,
//     Failed
// }
// console.log(Status.Uploading); // 0
// console.log(Status["Success"]); // 1
// console.log(Status.Failed); // 2
// 修改起始编号
// enum Color {
//     Red = 2,
//     Blue,
//     Yellow
//   }
//   console.log(Color.Red, Color.Blue, Color.Yellow); // 2 3 4
//   // 指定任意字段的索引值
//   enum Status {
//     Success = 200,
//     NotFound = 404,
//     Error = 500
//   }
//   console.log(Status.Success, Status.NotFound, Status.Error); // 200 404 500
//   // 指定部分字段，其他使用默认递增索引
//   enum Status {
//     Ok = 200,
//     Created,
//     Accepted,
//     BadRequest = 400,
//     Unauthorized
//   }
//   console.log(Status.Created, Status.Accepted, Status.Unauthorized); // 201 202 401
// 数字枚举  使用计算和常量的时候 紧接着的变量必须设置默认初始值
//   const getValue = () => {
//     return 0;
//   };
//   enum ErrorIndex {
//     a = getValue(),
//     b, // error 枚举成员必须具有初始化的值
//     c
//   }
//   enum RightIndex {
//     a = getValue(),
//     b = 1,
//     c
//   }
//   const Start = 1;
//   enum Index {
//     a = Start,
//     b, // error 枚举成员必须具有初始化的值
//     c
//   }
// 数字枚举的 方向映射  == 字符串不支持哦
// enum Status {
//     Success = 200,
//     NotFound = 404,
//     Error = 500
//   }
//   console.log(Status["Success"]); // 200
//   console.log(Status[200]); // 'Success'
//   console.log(Status[Status["Success"]]); // 'Success'
// 下面的处理方式可以实现双向的实现
//   {
//     200: "Success",
//     404: "NotFound",
//     500: "Error",
//     Error: 500,
//     NotFound: 404,
//     Success: 200
// }

// 字符串枚举
// enum Message {
//     Error = "Sorry, error",
//     Success = "Hoho, success"
//   }
//   console.log(Message.Error); // 'Sorry, error'

//   enum Message {
//     Error = "error message",
//     ServerError = Error,
//     ClientError = Error
//   }
//   console.log(Message.Error); // 'error message'
//   console.log(Message.ServerError); // 'error message'

// 异构枚举
// enum Result {
//     Faild = 0,
//     Success = "Success"
//   }
// 枚举成员类型和联合枚举类型
// 1. 枚举成员类型
// enum Animal {
//     Dog = 1,
//     Cat = 2
//   }
//   interface Dog {
//     type: Animal.Dog; // 这里使用Animal.Dog作为类型，指定接口Dog的必须有一个type字段，且类型为Animal.Dog
//   }
//   interface Cat {
//     type: Animal.Cat; // 这里同上
//   }
//   let cat1: Cat = {
//     type: Animal.Dog // error [ts] 不能将类型“Animal.Dog”分配给类型“Animal.Cat”
//   };
//   let dog: Dog = {
//     type: Animal.Dog
//   };
// 2. 联合枚举类型
// enum Status {
//     Off,
//     On
//   }
//   interface Light {
//     status: Status;
//   }
//   enum Animal {
//     Dog = 1,
//     Cat = 2
//   }
//   const light1: Light = {
//     status: Animal.Dog // error 不能将类型“Animal.Dog”分配给类型“Status”
//   };
//   const light2: Light = {
//     status: Status.Off
//   };
//   const light3: Light = {
//     status: Status.On
//   };
// 运行是的枚举
// enum E {
//     A,
//     B
//   }
//   const getIndex = (enumObj: { A: number }): number => {
//     return enumObj.A;
//   };
//   console.log(getIndex(E)); // 0
// const enum  ts1.4 新增的 编译的时候不回生成对象只是取值的问题
// enum Status {
//     Off,
//     On
//   }
//   const enum Animal {
//     Dog,
//     Cat
//   }
//   const status = Status.On;
//   const animal = Animal.Dog; 
// 类型断言  == 有点像类型转换
// const getLength = target => {
//     if (target.length) {
//       return target.length;
//     } else {
//       return target.toString().length;
//     }
//   };

// const getLength = (target: string | number): number => {
//     if (target.length) { // error 报错信息看下方
//       return target.length; // error 报错信息看下方
//     } else {
//       return target.toString().length;
//     }
//   };
  const getStrLength = (target: string | number): number => {
    if ((<string>target).length) { // 这种形式在JSX代码中不可以使用，而且也是TSLint不建议的写法
      return (target as string).length; // 这种形式是没有任何问题的写法，所以建议大家始终使用这种形式
    } else {
      return target.toString().length;
    }
  };