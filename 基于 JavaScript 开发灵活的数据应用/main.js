// console.log("hello world!");

// ============================= '' ,"" , ``之间的区别和联系=========================
// 
// const str1 = 'string 1'
// const str2 = "string 2"
// const str3 = `string 3`

// const target = 'World'
// const word = `Hello ${target}` //=> Hello World
// const str = `  
// Hello
// World
// ` // 多行字符串
// ================================ 分割字符串 ====================================
// 案例： 一段英文中 词出现的频数，去掉标点符号，大小写的转化
// 1. 去除文中的标点符号  使用 ASCII 码进行甄别  string.charCodeAt()   ;ASCII 码转换为对应字符 String.fromCharCode(code)
// const originalText = 'Hey dude, how is it going?'

// let wordOnlyText = ''

// // 数值变量 i 使用表达式 ++i 的意义为将其数值加 1，并将其结果作为该表达式的值；
// // 而表达式 i++ 则为将其数值加 1，但返回 i 的原值。
// for (let i = 0; i < originalText.length; ++i) {
//   const letter = originalText[i]
//   const asciiCode = letter.charCodeAt()

//   if ((asciiCode >= 65 && asciiCode <= 90) || (asciiCode >= 97 && asciiCode <= 122) || asciiCode === 32) {
//     wordOnlyText += letter
//   }
// }

// console.log(wordOnlyText) //=> "Hey dude how is it going"


// // 2.将所有大写字母转换为小写字母 (另一种方法进行相差 32 )
// let lowerCaseText = ''

// for (let i = 0; i < wordOnlyText.length; ++i) {
//   const letter = wordOnlyText[i]
//   const asciiCode = letter.charCodeAt()
  
//   if (asciiCode >= 65 && asciiCode <= 90) {
//     lowerCaseText += String.fromCharCode(asciiCode + 32)
//   } else {
//     lowerCaseText += letter
//   }
// }

// console.log(lowerCaseText) //=> "hey dude how is it going"

// string.toLowerCase()。
// const lowerCaseText = wordOnlyText.toLowerCase();

// 分割字符串 ==== 后面有正则表达式进行处理哦

// var originalText = `Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE`
// let wordOnlyText = ''

// for (let i = 0; i < originalText.length; ++i) {
//   const letter = originalText[i]
//   const asciiCode = letter.charCodeAt()

//   if ((asciiCode >= 65 && asciiCode <= 90) || (asciiCode >= 97 && asciiCode <= 122) || asciiCode === 32) {
//     wordOnlyText += letter
//   }
// }

// const lowerCaseText = wordOnlyText.toLowerCase()

// /*---------------------------------------------------------------------*/

// const words = lowerCaseText.split(' ')

// console.log(words.length) //=> 163

// =======================  组装字符串 =================================

const str1 = 'Hello'
const str2 = 'World'

console.log(str1 + ' ' + str2) //=> "Hello World"
// 当信息量大的时候就需要使用模板引擎来处理了== 这里就是使用字符串模板特效来处理了

const name = 'Will Wen Gunn'
const level = 'Gold'

const message = `
Hello, ${name}.
Here is Turing Airline, you are the ${level} member of our Privilege Club.
`
console.log(message)

//  ==================== 正则表达式 =========================
const originalText = 'Hey dude, how is it going?'

const words = originalText.toLowerCase().match(/\w+/g)

console.log(words.length) //=> 6

// ============================= 数字========================
// 四则运算
const a = 3
const b = 4

a + b //=> 7
b - a //=> 1
a * b //=> 12
a / b //=> 0.75
// 优先级
console.log(2 + 3 * 4) //=> 14
console.log((2 + 3) * 4) //=> 20
// 幂运算
const V1 = 3 * 3 * 3
console.log(V1) //=> 27

const V2 = Math.pow(3, 3)
console.log(V2) //=> 27

const calcCubeVolume = function(sideLength) {
  return Math.pow(sideLength, 3)
}
console.log(calcCubeVolume(3)) //=> 27

// 对数运算  换底公式

function getBaseLog(base, x) {
    return Math.log(x) / Math.log(base)
  }
  
console.log(getBaseLog(2, 1024)) //=> 10

// 求和

let S = 0
const L = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
const n = L.length

for (let i = 0; i < n; ++i) {
  S += L[i]
}

console.log(S) //=> 55
// 求余
5 % 2 == 1
4 % 2 == 0

// 练习： 
// 1. 用JS求1+(1+2)+(1+2+3)+(1+2+3+4)+...(1+2+3+..+10)的和  前n项的计算
function sum(val) {
    var total = 0;
    var part = 0;
    for(var i=1;i<=val;i++)
    {
        part+=i;
        total+=part;
    }
    return total;
    // console.log(total);
}
// sum(3); 10 
//  2. 使用javascript 实现 1 + (2 + 3) * 4 \ 5 - (6 + 7)
// 优先级的计算顺序的问题





