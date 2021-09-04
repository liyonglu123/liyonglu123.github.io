// 在一个字符串中，找到字符串“abcdef”
function match(string) {
  let foundA = false;
  let foundB = false;
  let foundC = false;
  let foundD = false;
  let foundE = false;
  for (let item of string) {
    if (item === "a") {
      foundA = true;
    } else if (foundA && item === "b") {
      foundB = true;
    } else if (foundB && item === "c") {
      foundC = true;
    } else if (foundC && item === "d") {
      foundD = true;
    } else if (foundD && item === "e") {
      foundE = true;
    } else if (foundE && item === "f") {
      return true;
    } else {
      foundA = false;
      foundB = false;
      foundC = false;
      foundD = false;
      foundE = false;
    }
  }
  return false;
}

console.log(match("abcdef"));
