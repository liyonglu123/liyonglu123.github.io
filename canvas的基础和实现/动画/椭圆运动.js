// 椭圆运动 x=a+cos(t)  y=b+sin(t) 三角函数公式进行使用
var a = 200,
    b = 100,
    radius = 30;
time = 0; //循环的次数
window.onload = function () {
    var canvas = document.getElementById('canvas');
    canvas.height = 768;
    canvas.width = 1024;
    var cxt = canvas.getContext('2d');
    centerPoint(cxt);
    arcRoute(cxt, 300, 300, a, b, radius);
    setInterval(function () {
        arcRoute(cxt, 300, 300, a, b, radius);
    }, 70);
};

//绘制原点
function centerPoint(cxt) {
    cxt.fillStyle = "black";
    cxt.beginPath();
    cxt.arc(300, 300, 10, 0, 2 * Math.PI, true)
    cxt.closePath();
    cxt.fill();
}
//椭圆路线绘制  参数方程法实现
function route(context, x, y, a, b) {
    var step = (a > b) ? 1 / a : 1 / b;
    context.beginPath();
    context.moveTo(x + a, y); //从椭圆的左端点开始绘制
    for (var i = 0; i < 2 * Math.PI; i += step)
    {
        context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    context.closePath();
    context.stroke();
}

//椭圆上小球运动的实现
function arcRoute(context, x, y, a, b, r) {
    context.clearRect(0, 0, 1024, 768);
    route(context, x, x, a, b);
    centerPoint(context);
    var step = (a > b) ? 1 / a : 1 / b;
    context.fillStyle = "red";
    if (time == 0) {
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
    } else {
        context.beginPath();
        context.arc(x + a * Math.cos(time), y + b * Math.sin(time), r, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
    }
    time += 1;
}