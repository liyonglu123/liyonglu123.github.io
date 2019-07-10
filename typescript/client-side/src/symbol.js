// const s = Symbol();
// console.log(typeof s); // 'symbol'
// const s1 = Symbol("lison");
// const s2 = Symbol("lison");
// console.log(s1 === s2); // false
// // 补充：这里第三行代码可能会报一个错误：This condition will always return 'false' since the types 'unique symbol' and 'unique symbol' have no overlap.
// // 这是因为编译器检测到这里的s1 === s2始终是false，所以编译器提醒你这代码写的多余，建议你优化。

// const s3 = Symbol("lison");
// console.log(s3.toString()); // 'Symbol(lison)'

// // 不能和其他类型的值进行运算, 但是可以转化为字符串和布尔类型
// let s4 = Symbol("lison");
// console.log(s4.toString()); // 'Symbol(lison)'
// console.log(Boolean(s4)); // true
// console.log(!s4); // false

// // 作为属性名
// // let prop = "name";
// // const obj = {
// //   [prop]: "Lison"
// // };
// // console.log(obj.name); // 'Lison'
// // let name = Symbol();
// // let obj = {
// //   [name]: "lison"
// // };
// // console.log(obj); // { Symbol(): 'lison' }
// // console.log(obj[name]); // 'lison'
// // console.log(obj.name); // undefined

// // 属性名的遍历
// const name = Symbol("name");
// const obj = {
//   [name]: "lison",
//   age: 18
// };
// for (const key in obj) {
//   console.log(key);
// }
// // => 'age'
// console.log(Object.keys(obj));
// // ['age']
// console.log(Object.getOwnPropertyNames(obj));
// // ['age']
// console.log(JSON.stringify(obj));
// // '{ "age": 18 }'
// const SymbolPropNames = Object.getOwnPropertySymbols(obj);
// console.log(SymbolPropNames);
// // [ Symbol(name) ]
// console.log(obj[SymbolPropNames[0]]);
// // 'lison'
// // 如果最后一行代码这里报错提示：元素隐式具有 "any" 类型，因为类型“{ [name]: string; age: number; }”没有索引签名。 那可能是在tsconfig.json里开启了noImplicitAny。因为这里我们还没有学习接口等高级类型，所以你可以先忽略这个错误，或者关闭noImplicitAny。
// console.log(Reflect.ownKeys(obj)); // Reflect es6提供的reflect对象的静态方法, 可以返回所有类型的属性名
// [ 'age', Symbol(name) ]

// Symbol.for() 和 Symbol.keyFor()
const s1 = Symbol("lison");
const s2 = Symbol("lison");
const s3 = Symbol.for("lison");
const s4 = Symbol.for("lison");
s3 === s4; // true
s1 === s3; // false
// 这里还是会报错误：This condition will always return 'false' since the types 'unique symbol' and 'unique symbol' have no overlap.还是我们说过的，因为这里的表达式始终是true和false，所以编译器会提示我们


// 注册范围包含当前页面以及页面中包含iframe ,以及service sorker 
const iframe = document.createElement("iframe");
iframe.src = String(window.location);
document.body.appendChild(iframe);

iframe.contentWindow.Symbol.for("lison") === Symbol.for("lison"); // true
// 注意：如果你在JavaScript环境中这段代码是没有问题的，但是如果在TypeScript开发环境中，可能会报错：类型“Window”上不存在属性“Symbol”。
// 因为这里编译器推断出iframe.contentWindow是Window类型，但是TypeScript的声明文件中，对Window的定义缺少Symbol这个字段，所以会报错，所以你可以这样写：
// (iframe.contentWindow as Window & { Symbol: SymbolConstructor }).Symbol.for("lison") === Symbol.for("lison")
// 这里用到了类型断言和交叉类型，SymbolConstructor是内置的类型。

const sym = Symbol.for("lison");
console.log(Symbol.keyFor(sym)); // 'lison'

// Symbol 11 个内置的值
// 1. Symbol.hasInstance
const obj = {
    [Symbol.hasInstance](otherObj) {
      console.log(otherObj);
    }
};
  console.log({ a: "a" } instanceof obj); // false
  // 注意：在TypeScript中这会报错，"instanceof" 表达式的右侧必须属于类型 "any"，或属于可分配给 "Function" 接口类型的类型。
  // 是要求你instanceof操作符右侧的值只能是构造函数或者类，或者类型是any类型。这里你可以使用类型断言，将obj改为obj as any
// 2. Symbol.isConcatSpreadable
let arr = [1, 2];
console.log([].concat(arr, [3, 4])); // 打印结果为[1, 2, 3, 4]，length为4
let arr1 = ["a", "b"];
console.log(arr1[Symbol.isConcatSpreadable]); // undefined
arr1[Symbol.isConcatSpreadable] = false;
console.log(arr1[Symbol.isConcatSpreadable]); // false
console.log([].concat(arr1, [3, 4])); // 打印结果如下：
/*
 [ ["a", "b", Symbol(Symbol.isConcatSpreadable): false], 3, 4 ]
 最外层这个数组有三个元素，第一个是一个数组，因为我们设置了arr1[Symbol.isConcatSpreadable] = false
 所以第一个这个数组没有被扁平化，第一个元素这个数组看似是有三个元素，但你在控制台可以看到这个数组的length为2
 Symbol(Symbol.isConcatSpreadable): false不是他的元素，而是他的属性，我们知道数组也是对象，所以我们可以给数组设置属性
 你可以试试如下代码，然后看下打印出来的效果：
  let arr = [1, 2]
  arr.props = 'value'
  console.log(arr)
 */
// 3.  Symbol.species
class C extends Array {
    getName() {
      return "lison";
    }
  }
  const c = new C(1, 2, 3);
  const a = c.map(item => item + 1);
  console.log(a); // [2, 3, 4]
  console.log(a instanceof C); // true
  console.log(a instanceof Array); // true
  console.log(a.getName()); // "lison"

//　只让衍生的数组是Array类型
class C extends Array {
    static get [Symbol.species]() {
      return Array;
    }
    getName() {
      return "lison";
    }
  }
  const c = new C(1, 2, 3);
  const a = c.map(item => item + 1);
  console.log(a); // [2, 3, 4]
  console.log(a instanceof C); // false
  console.log(a instanceof Array); // true
  console.log(a.getName()); // error a.getName is not a function
// 4. Symbol.match Symbol.replace Symbol.search Symbol.split
let obj = {
    [Symbol.match](string) {
      return string.length;
    }
  };
  console.log("abcde".match(obj)); // 5
// 5. Symbol.iterator
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
console.log(iterator);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); 
// 6. Symbol.toPrimitive
let obj = {
    [Symbol.toPrimitive](type) {
      console.log(type);
    }
  };
  // const b = obj++ // number
  const a = `abc${obj}`; // string
// 7. Symbol.toStringTag
let obj = {
    [Symbol.toStringTag]: "lison"
  };
  obj.toString(); // "[object lison]"
  let obj2 = {
    get [Symbol.toStringTag]() {
      return "haha";
    }
  };
  obj2.toString(); // "[object haha]"
// 8. Symbol.unscopables
const obj = {
    a: "a",
    b: "b"
  };
  with (obj) {
    console.log(a); // "a"
    console.log(b); // "b"
  }
  // 如果是在TypeScript开发环境中，这段代码可能with会报错：不支持 "with" 语句，这是因为在严格模式下，是不允许使用with的。
  console.log(Array.prototype[Symbol.unscopables]);
/*
{
    copyWithin: true
    entries: true
    fill: true
    find: true
    findIndex: true
    includes: true
    keys: true
    values: true
}
*/