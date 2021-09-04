// 在一个字符串中找到字符 “a”

// 时间复杂度 O(n)
function match(string) {
  for (let item of string) {
    if (item === "a") {
      return true;
    }
  }
  return false;
}

console.log(match("I am lisi"));
