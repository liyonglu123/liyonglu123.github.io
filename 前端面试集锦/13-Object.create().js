/**
 * Object.create()
 * Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
 * Object.create(proto，[propertiesObject])
 * 返回值：一个新对象，带着指定的原型对象和属性。
 * 构造出的对象是干净的
 */

// let demo = {
//   c: "123",
// };
// let cc = Object.create(demo, { p: { value: "fwef" } });
// console.log(cc, cc.p);

// 实现Object.create()
function myCreate(proto, propertiesObject) {
  if (typeof proto != "object" && proto !== null) {
    throw new Error("the first param must be an object or null");
  }
  if (propertiesObject === null) {
    throw "TypeError";
  }
  function Fn() {}
  // 精Fn的prototype指向proto
  Fn.prototype = proto;
  const obj = new Fn();
  if (propertiesObject) {
    Object.defineProperties(obj, propertiesObject);
  }
  return obj;
}

// 测试
let demo = {
  c: "123",
};
// let cc = myCreate({}, { p: { value: "fwef" } });
let c = myCreate(null);
console.log(c);
