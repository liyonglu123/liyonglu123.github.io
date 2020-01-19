// 粒子
// 随机数字
function random(min, max) {
    return Math.random() * (max - min) + min;
}
// 计算两点距离
function calculateDistance(p1x, p1y, p2x, p2y) {
    var xDistance = p1x - p2x,
        yDistance = p1y - p2y;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
class Particle {
    constructor(x, y) {
        // 粒子的初始位置
        this.x = x;
        this.y = y;
        this.coordinates = [];
        this.coordinateCount = 6;
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
        this.angle = random(0, Math.PI * 2);
        this.speed = random(1, 10);
        this.friction = 0.98;
        this.gravity = 1.2;
        this.alpha = 1; // 初始时不透明
        this.decay = random(0.005, 0.05);
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = 'hsla(' + this.hue + ', 100%' + this.brightness + '%, ' + this.alpha + ')';
        ctx.stroke();
    }
    update() {
        // 从用于实现粒子尾巴的队列中移除最早的位置
        this.coordinates.pop();
        // 记录粒子的当前位置
        this.coordinates.unshift([this.x, this.y]);

        // 计算粒子此时的速度
        this.speed *= this.fraction;

        // 计算粒子移动后的水平和垂直方向的位置
        this.x += Math.sin(this.angle) * this.speed;
        this.y += Math.cos(this.angle) * this.speed + this.gravity;

        // 计算粒子的颜色透明度
        this.alpha -= this.decay;

        // 判断粒子是否消亡
        if (this.alpha < this.decay) {
            // 从粒子集合中销毁粒子
        }
    }
}