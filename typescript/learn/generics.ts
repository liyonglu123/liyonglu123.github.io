// 泛型  占位符
function echo<T>(arg: T): T {
    return arg
}
const arg = echo(true)

// tuple

function swap<T, U>(tuple: [T, U]): [U, T]{
    return [tuple[1], tuple[0]]
}
const re = swap(["s", 100]);

// 泛型约束 
function echoWithArr<T>(arg: T) :T {
    // console.log(arg.length)
    return arg
}
function echoWithArr1<T>(arg: T[]) :T[] {
    console.log(arg.length)
    return arg
}
// const s = echoWithArr1([1,2,1])
// const s1 = echoWithArr1("aaa")

// 约束
interface ILength{
    length: number
}
function echoWithLength<T extends ILength>(arg: T): T {
    console.log(arg.length)
    return arg
}

const string1 = echoWithLength("aaa")
const array1 = echoWithLength([1,2,3])
const object1 = echoWithLength({length: 10, width: 100})

// const number1 = echoWithLength(100)

// 泛型 -- 类和接口

class Queue<T> {
    private data = [];
    push(item: T) {
        return this.data.push(item)
    }
    pop():T {
        return this.data.shift()
    }
}
const queue = new Queue<number>()
queue.push(1)
console.log(queue.pop().toFixed())

const queue1 = new Queue<string>()
queue1.push("a")
console.log(queue1.pop().length)

// 接口

interface KeyPair<T, U> {
    key: T;
    value: U;
}
let k1:KeyPair<number, string> =  {key : 1, value: "aa"}
let k2:KeyPair<string, number> =  {key : "a", value: 1}


// 数组
let array2: number[] = [1,2,3]
let array3: Array<number> = [1,2,3]


// 函数
interface IPlus<T> {
    (a: T, b:T): T
}
function plus(a: number, b:number): number {
    return a + b
}

function connect(a: string, b:string): string {
    return a + b
}
const fn = plus
const fn0: IPlus<number> = plus;
const fn00: IPlus<string> = connect;
// 创建声明文件 xxx.d.ts  
// 使用第三方的声明文件  jQuery("#avx")  @types/jquery






