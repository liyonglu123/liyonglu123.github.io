// 获取canvas对象
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = document.body.offsetWidth
canvas.height = document.body.offsetHeight;
// 画一个水池
ctx.fillStyle = "rgba(255,118,87,.6)"
ctx.beginPath()
ctx.moveTo(0, canvas.height / 2)
ctx.lineTo(canvas.width, canvas.height / 2)
ctx.lineTo(canvas.width, canvas.height)
ctx.lineTo(0, canvas.height)
ctx.lineTo(0, canvas.height / 2)
ctx.closePath()
ctx.fill();
// 让水动起来  正弦和余弦函数的实现问题

// let step = 0

// function loop() {
//     // 清空canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.fillStyle = "rgba(255,118,87,.6)"
//     step++

//     const angle = step * Math.PI / 180
//     const deltaHeight = Math.sin(angle) * 50

//     ctx.beginPath()
//     ctx.moveTo(0, canvas.height / 2 + deltaHeight)
//     ctx.lineTo(canvas.width, canvas.height / 2 + deltaHeight)
//     ctx.lineTo(canvas.width, canvas.height)
//     ctx.lineTo(0, canvas.height)
//     ctx.lineTo(0, canvas.height / 2 + deltaHeight)
//     ctx.closePath()
//     ctx.fill()

//     requestAnimationFrame(loop)
// }

// loop();

// 让水晃动起来 == 使左右顶点不同步即可让水面晃动起来，所以我们将左顶点的取值使用余弦函数即可。
// let step = 0

// function loop() {
//     //清空canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.fillStyle = "rgba(255,118,87,.6)"
//     step++

//     const angle = step * Math.PI / 180
//     const deltaHeight = Math.sin(angle) * 50
//     const deltaHeightRight = Math.cos(angle) * 50

//     ctx.beginPath()
//     ctx.moveTo(0, canvas.height / 2 + deltaHeight)
//     ctx.lineTo(canvas.width, canvas.height / 2 + deltaHeightRight)
//     ctx.lineTo(canvas.width, canvas.height)
//     ctx.lineTo(0, canvas.height)
//     ctx.lineTo(0, canvas.height / 2 + deltaHeight)
//     ctx.closePath()
//     ctx.fill()

//     requestAnimationFrame(loop)
// }

// loop();
// 制造波浪  === 实现原理 借助贝塞尔曲线将矩形的一边变为波浪。

// let step = 0

// function loop() {
//     //清空canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.fillStyle = "rgba(255,118,87,.6)"
//     step++

//     const angle = step * Math.PI / 180
//     const deltaHeight = Math.sin(angle) * 50
//     const deltaHeightRight = Math.cos(angle) * 50

//     ctx.beginPath()
//     ctx.moveTo(0, canvas.height / 2 + deltaHeight)
//     ctx.bezierCurveTo(canvas.width / 2, canvas.height / 2 + deltaHeight - 50, canvas.width / 2, canvas.height / 2 + deltaHeightRight - 50, canvas.width, canvas.height / 2 + deltaHeightRight)
//     ctx.lineTo(canvas.width, canvas.height)
//     ctx.lineTo(0, canvas.height)
//     ctx.lineTo(0, canvas.height / 2 + deltaHeight)
//     ctx.closePath()
//     ctx.fill()

//     requestAnimationFrame(loop)
// }

// loop();

// 制造多个波浪  === 将上面的波浪写成 for 循环多次渲染即可。
let step = 0
const lines = 3

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    step++
    for (let i = 0; i < lines; i++) {
        ctx.fillStyle = 'rgba(255,118,87,.3)'
        var angle = (step + i * 180 / lines) * Math.PI / 180
        var deltaHeight = Math.sin(angle) * 50
        var deltaHeightRight = Math.cos(angle) * 50
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2 + deltaHeight)
        ctx.bezierCurveTo(canvas.width / 2, canvas.height / 2 + deltaHeight - 50, canvas.width / 2, canvas.height / 2 + deltaHeightRight - 50, canvas.width, canvas.height / 2 + deltaHeightRight)
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.lineTo(0, canvas.height / 2 + deltaHeight)
        ctx.closePath()
        ctx.fill()
    }

    requestAnimationFrame(loop)
}

loop();