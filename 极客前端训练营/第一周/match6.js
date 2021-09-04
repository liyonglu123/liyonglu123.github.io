//  TODO: 使用状态机，在一个字符串中，找到字符串“ababax”
function match(string) {
  let state = start;
  for (let item of string) {
    state = state(item);
  }
  return state === end;
}

function start(c) {
  if (c === "a") {
    return foundA;
  } else {
    return start;
  }
}

/**
 * 一个trap, 一个陷阱，一旦进入end状态永远返回end
 * @param {*} c
 */
function end(c) {
  return end;
}

function foundA(c) {
  if (c === "b") {
    return foundB;
  } else {
    return start(c);
  }
}
function foundB(c) {
  if (c === "c") {
    return foundC;
  } else {
    return start(c);
  }
}

function foundC(c) {
  if (c === "a") {
    return foundA2;
  } else {
    return start(c);
  }
}

function foundA2(c) {
  if (c === "b") {
    return foundB2;
  } else {
    return start(c);
  }
}

function foundB2(c) {
  if (c === "x") {
    return end(c);
  }
  return foundB(c);
}

// reConsume 处理
console.log(match("abcabcabx"));
