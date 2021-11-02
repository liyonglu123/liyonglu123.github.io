/**
 * 字符串转二进制
 */

function charToBinary(text) {
  let code = "";
  for (let i of text) {
    // 字符编码, 转为二进制
    let number = i.charCodeAt().toString(2);
    console.log(number);
    // 1 bytes = 8 bit, 将 number 不足8位的使用0补上
    for (let a = 0; a <= 8 - number.length; a++) {
      number = 0 + number;
    }
    code += number;
  }
  return code;
}

console.log(charToBinary("abc"));
