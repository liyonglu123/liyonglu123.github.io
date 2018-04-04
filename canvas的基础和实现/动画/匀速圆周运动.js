window.onload=function(){
    var canvas=document.getElementById('canvas');
    canvas.height=728;
    canvas.width=1024;
    var context=canvas.getContext('2d');
    drawNotChange(context);
    context.fillStyle='blue';
    context.beginPath();
    context.arc(500,550,30,0,2*Math.PI,true);
    context.closePath();
    context.fill();
    setInterval(function(){
        run(context);
    }, 50);
};
var time=0;//定义运动的执行次数
function run(cxt){

    cxt.clearRect(0,0,1024,728);   
    drawNotChange(cxt);
    cxt.save();//将当前以左上角坐标为(0,0)的上下文环境进行保存，这样是为了在接下来中要进行画布偏移后，可以进行还原当前的环境
    cxt.translate(500,400);
    cxt.rotate(time*8*Math.PI/180);//设定每次旋转的度数
    cxt.fillStyle='blue';
    cxt.beginPath();
    cxt.arc(0,150,30,0,2*Math.PI,false);
    cxt.closePath();
    cxt.fill();
    cxt.restore();//将当前为(500,400)的点还原为（0,0）,其实在save中就是将上下文环境保存到栈中，在restore下面对其进行还原
    time+=1;
}

//绘制不变因素
function drawNotChange(context){
    context.fillStyle='red';
    context.beginPath();
    context.arc(500,400,30,0,2*Math.PI,true);
    context.closePath();
    context.fill();
    context.beginPath();
    context.arc(500,400,150,0,2*Math.PI,true);
    context.closePath();
    context.stroke();
}