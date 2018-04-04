// 物理中的基本公式  物理学中的基本的公式问题
window.onload=function(){
    var canvas=document.getElementById('canvas');
    canvas.height=728;
    canvas.width=1024;
    var context=canvas.getContext('2d');
    context.fillStyle='red';
    context.beginPath();
    context.arc(800,300,30,0,2*Math.PI,true);
    context.closePath();
    context.fill();
    setInterval(function(){
        run(context);
    }, 50);
};
var v0=0;//初始速度
var a=0;//加速度
var v=0;//变化的速度
var time=0;//时间
var x=0;//位移量
var startPoint=800;//起始点
// V=V0+at
// x=v0t+1/2at^2
// v^2-V^2=2ax
function run(cxt){
    time+=0.05;
    a=10;
    x=-(0.5*a*(time*time));//位移公式代入
    startPoint+=x;
    cxt.clearRect(0,0,1024,728);
    cxt.beginPath();
    cxt.arc(startPoint,300,30,0,2*Math.PI,true);
    cxt.closePath();
    cxt.fill();
}