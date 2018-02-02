// js 数据类型
/**
 * 
 * https://www.cnblogs.com/shiyou00/p/6379170.html
 * es5 
 * 简单数据类型： Number String Boolean undefine
 * 复杂数据类型: Object Array
 * 简单数据类型赋值操作， 复杂数据类型是引用操作
 */
var arr = [1,2,3];
var arr2 = arr;
arr2.push(4);
console.log(arr);   // [1,,2,3,4]  指向的是内存地址
// 深浅拷贝
// 浅复制：只会将对象的各个属性进行依次复制，并不会进行递归复制，而js存储对象都是存地址的，
// 所以浅复制会导致obj.c和shallowCopy.c 指向同一块内存地址；会导致引用。
var obj = {a:1,b:2,c:[1,3]};
function shallow(obj) {
    var shallowObj = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            shallowObj[key] = obj[key];       
        }
    }
    return shallowObj

}
var shallowCopy = shallow(obj);
// console.log(shallowCopy);
shallowCopy.a = 33;
// console.log(obj);
// shallowCopy.c=[];
// console.log(obj);
obj.c[1]= 8;
// console.log(shallowCopy);

// 对象的
var aObj = {a:33,b:'22'};
var bObj = {a:44,b:[1]};
aObj = bObj;
console.log(aObj)

/**
 * 深复制：它不仅将原对象的各个属性逐个复制出去，
 * 而且将原对象各个属性所包含的对象也依次采用深复制的方法递归复制到新对象上。
 * 这就不会存在上面obj和shallowCopy的c属性指向同一个对象的问题。
 * （待会贴出深复制的代码，这是个复杂的问题）
 * 总结：需要注意的是，如果对象比较大，层级也比较多，深复制会带来性能上的问题。在遇到需要采用深复制的场景时，
 * 可以考虑有没有其他替代方案，在实际的引用场景中，也是浅复制更为常用。 
 */
// 序列化的偷懒式的实现 深复制
// this.form =JSON.parse(JSON.stringify(this.formInit))  //这里可以避免的问额
// 它能正确处理的对象只有 Number, String, Boolean, Array, 扁平对象，即那些能够被 json 直接表示的数据结构。

//  思想式递归的
function deepCopy(obj) {
    var newObj = obj.constructor === Array? []:{};
    if (typeof obj !== 'object') {
        return
    } else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key]=typeof obj[key] === 'object' ? deepCopy(obj[key]) :obj[key];         
            }
        }
    }
    return newObj
}
// http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/ 深入了解
// 结合underscore lodash jquery 
// underscore:  _.clone  jquery: $.extend()

