// 动画的实现
const raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60); //每帧1000/60ms
    };
/**
 * 地图类
 */
function Map() {

}
Map.prototype.init = function (options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.width = options.width;
    this.height = options.height;
}
Map.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
}
Map.prototype.render = function () {
    this.clear();
    // this.ctx.fillStyle = "black";
    // this.ctx.fillRect(0, 0, this.width, this.height);
    var oImg = new Image();
    oImg.src = "https://img-blog.csdn.net/20171230163702723?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzI1MTQwNDM=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast";
    var me = this;
    oImg.onload=function(){
        me.ctx.drawImage(oImg,0,0);
    }
}

const canvas = document.getElementById('world');
// 获取屏幕的高度和宽度
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var map = new Map();
map.init({
    canvas,
    width: window.innerWidth,
    height: window.innerHeight
});

(function animate() {
    map.render();
    raf(animate);
})();