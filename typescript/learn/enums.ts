// 枚举  
// 常量枚举 添加const  优化编译
// 计算枚举   见后面章节
const enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}
// 默认从零开始递增  可以进行修改， 从修改出进行递增
console.log(Direction.Left)
// console.log(Direction[0])

const value = "UP"

if (Direction.Up === value) {
    console.log("go up")
}

enum Direction1 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}
// 默认从零开始递增  可以进行修改， 从修改出进行递增
// console.log(Direction[0])

const value1 = "UP"

if (Direction1.Up === value1) {
    console.log("go up")
}


// 默认情况

enum Direction2 {
    Up,
    Down,
    Left,
    Right
}
// 默认从零开始递增  可以进行修改， 从修改出进行递增

