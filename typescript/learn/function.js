// 函数声明
// ? 可选,   默认值 z:number = 10
function add(x, y, z) {
    if (typeof z === "number") {
        return x + y + z;
    }
    else {
        return x + y;
    }
}
var result = add(2, 3);
// 函数表达式
// 类型推断
var add2 = function (x, y, z) {
    if (z === void 0) { z = 10; }
    if (typeof z === "number") {
        return x + y + z;
    }
    else {
        return x + y;
    }
};
// const add3: string = add2  
var add3 = add2; // 类型一致
