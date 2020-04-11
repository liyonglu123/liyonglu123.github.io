// 类型别名
type PlusType = (a: number, b: number) => number
function sum(a: number, b:number): number {
    return a + b
}
const total:PlusType = sum

// 联合类型 
type NameResolve = () => string
type NameOrResolve = string | NameResolve
function getName(n: NameOrResolve): string {
    if (typeof n === "string") {
        return n
    } else {
        return n()
    }
}



//  type assertion  类型断言

function getLength(input: string | number): number {
    // 方式一
    // const str = input as string 
    // if (str.length) {
    //     return str.length
    // } else {
    //     const number = input as number
    //     return number.toString().length
    // }
    // 方式二
    if ((<string>input).length) {
        return (<string>input).length
    }else {
        return input.toString().length
    }

}