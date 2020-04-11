let isDone: boolean = false

let num: number = 20
let binaryNumber: number = 0b1111 // 八进制

let firstName: string = "zhangsan"
let message: string = `hello ${ firstName }, age is ${ num }`

let u: undefined = undefined
let n:null = null
let a: number = undefined //  Type 'undefined' is not assignable to type 'number'.
let b: number = null // Type 'null' is not assignable to type 'number'.

// any
let notSure: any = true
notSure= 222
notSure = "sss"
// 联合类型

let numOrString: number | string = 11
numOrString = "gdg"
// numOrString = false 不可取

// 数组 Array
let arrOfNumbers: number[] = [1,2,3]
arrOfNumbers.push(4)
// arrOfNumbers.push("d")

// 类数组 HTML  nodelist
function test() {
    console.log(arguments)
    // arguments.length 
    // arguments[0]
}

// 元数组  Tuple 确定元素的类型
let user: [number, string] = [1, "a"]