const EOF = Symbol("EOF"); // End Of File, 使用Symbol的唯一性进行处理

function data(c) {}
module.exports.parseHTML = function parseHTML(html) {
  console.log(html);
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF); // HTML最后有一个文件终结，文本节点可能仍处于未结束的状态，额外给一个字符，不能是有效的字符
};
