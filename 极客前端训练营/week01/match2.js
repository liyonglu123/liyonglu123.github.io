// 在一个字符串中，找到字符串“ab”
function match(string) {
  let foundA = false;
  for (let item of string) {
    if (item === "a") {
      foundA = true;
    } else if (foundA && item === "b") {
      return true;
    } else {
      foundA = false;
    }
  }
  return false;
}

console.log(match("I am ab"));
