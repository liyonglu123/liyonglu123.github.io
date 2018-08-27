var oC = document.getElementById('fish');
var gd = oC.getContext('2d');
var oImg = new Image();
oImg.src = "https://img-blog.csdn.net/20171230163702723?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzI1MTQwNDM=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast";
oImg.onload=function(){
    var w = 59;
    var h = 77;
    var sx = 0;
    var sy = 0;
    var x = 300;
    setInterval(function(){
        gd.clearRect(0,0,oC.width,oC.height);//先清除画布

        gd.save();//先保存下绘制前画布的状态

        gd.translate(x,0);//画布X轴位移300
        gd.rotate(d2a(90));//画布旋转90deg (角度转换成弧度)

        gd.drawImage(
            oImg,
            sx,sy,w,h,
            0,0,w,h
        );

        gd.restore();//每绘制完一帧之后，恢复到画布之前的状态
    },30);
    setInterval(function(){
        sx+=59;//图片上的x坐标，每次下移一条鱼的距离，当大于等于第四条鱼的时候恢复到第一条鱼的位置
        if(sx>=w*4){
            sx = 0;
        }
    },120);
};
//角度转弧度的公式
function d2a(n){
    return n*Math.PI/180;
}