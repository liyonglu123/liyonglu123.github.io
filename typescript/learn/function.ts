// 函数声明
// ? 可选,   默认值 z:number = 10
function add(x: number, y: number, z?: number): number {
    if(typeof z === "number") {
        return x + y + z
    }else {
        return x + y
    }
}

let result = add(2, 3)

// 函数表达式
// 类型推断
const add2 = function(x: number, y: number, z: number = 10): number {
    if(typeof z === "number") {
        return x + y + z
    }else {
        return x + y
    }
}

// const add3: string = add2  
const add3:(x: number, y: number, z?: number) => number = add2  // 类型一致
