window.onload = function () {
    var canvas = document.getElementById('canvas');
    canvas.height = 728;
    canvas.width = 1024;
    // canvas.getContext 可以进行进一步的判断优化
    var context = canvas.getContext('2d');
    context.fillStyle = "red";
    context.beginPath();
    context.arc(800,300,30,0,2*Math.PI,true);
    context.closePath();
    context.fill();
    setInterval(function(){
        run(context);
    }, 50);
}
var speed = 0;
var startPoint = 800;
function run(cxt) {
    speed = -7;
    cxt.clearRect(0,0,1024,728); // 清楚之前的内容  不断的清楚和重绘的过程哦
    startPoint+=speed;
    cxt.beginPath();
    cxt.arc(startPoint,300,30,0,2*Math.PI,true);
    cxt.closePath();
    cxt.fill();
}