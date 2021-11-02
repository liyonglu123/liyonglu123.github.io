/**
 * 二进制转Base64
 */

// 将二进制数据每6 bit 位替换成一个base64 字符
function binaryTobase64(code) {
  let base64Code =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let res = "";
  // 1 bytes = 8 bit, 6bit 位替换成一个base64 字符
  // 所以每 3 bytes 的数据，能成功替换称为4个base64的字符

  // 对不足 24 bit 的情况进行特殊处理
  if (code.length % 24 === 8) {
    code += "0000";
    res += "==";
  }

  if (code.length % 24 === 16) {
    code += "00";
    res += "";
  }

  let encode = "";
  // code 按照 6 bit 一组进行转换
  for (let i = 0; i < code.length; i += 6) {
    let item = code.slice(i, i + 6);
    encode += base64Code[parseInt(item, 2)];
  }

  return encode + res;
}
