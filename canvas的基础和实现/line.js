/**
 * 构建直线模型
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 */

function Line(x1, y1, x2, y2) {
    this.x = 0;
    this.y = 0;
    this.x1 = (x1 === undefined) ? 0 : x1;
    this.y1 = (y1 === undefined) ? 0 : y1;
    this.x2 = (x2 === undefined) ? 0 : x2;
    this.y2 = (y2 === undefined) ? 0 : y2;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.lineWidth = 1;
}
// 绘制直线
/*绘制直线*/

Line.prototype.draw = function(context) {
    context.save();
    context.translate(this.x, this.y); //平移   
    context.rotate(this.rotation); // 旋转   
    context.scale(this.scaleX, this.scaleY);
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.closePath();
    context.stroke();
    context.restore();
};