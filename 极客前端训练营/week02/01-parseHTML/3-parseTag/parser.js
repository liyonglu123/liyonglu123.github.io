const EOF = Symbol("EOF"); // End Of File, 使用Symbol的唯一性进行处理

function data(c) {
  if (c == "<") {
    return tagOpen;
  } else if (c === EOF) {
    return;
  } else {
    // 文本节点
    return data;
  }
}

function tagOpen(c) {
  if (c === "/") {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    return tagName(c);
  } else {
    return;
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    return tagName(c);
  } else if (c === ">") {
  } else if (c === EOF) {
  } else {
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    return tagName;
  } else if (c === ">") {
    return data;
  } else {
    return tagName;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === ">") {
    return data;
  } else if (c === "=") {
    return beforeAttributeName;
  } else {
    return beforeAttributeName;
  }
}

function selfClosingStartTag(c) {
  if (c === ">") {
    currentToken.isSelfClosing = true;
    return data;
  } else if (c === EOF) {
  } else {
  }
}

module.exports.parseHTML = function parseHTML(html) {
  console.log(html);
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF); // HTML最后有一个文件终结，文本节点可能仍处于未结束的状态，额外给一个字符，不能是有效的字符
};
