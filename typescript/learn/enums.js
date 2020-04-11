// 默认从零开始递增  可以进行修改， 从修改出进行递增
console.log("LEFT" /* Left */);
// console.log(Direction[0])
var value = "UP";
if ("UP" /* Up */ === value) {
    console.log("go up");
}
var Direction1;
(function (Direction1) {
    Direction1["Up"] = "UP";
    Direction1["Down"] = "DOWN";
    Direction1["Left"] = "LEFT";
    Direction1["Right"] = "RIGHT";
})(Direction1 || (Direction1 = {}));
// 默认从零开始递增  可以进行修改， 从修改出进行递增
// console.log(Direction[0])
var value1 = "UP";
if (Direction1.Up === value1) {
    console.log("go up");
}
// 默认情况
var Direction2;
(function (Direction2) {
    Direction2[Direction2["Up"] = 0] = "Up";
    Direction2[Direction2["Down"] = 1] = "Down";
    Direction2[Direction2["Left"] = 2] = "Left";
    Direction2[Direction2["Right"] = 3] = "Right";
})(Direction2 || (Direction2 = {}));
// 默认从零开始递增  可以进行修改， 从修改出进行递增
