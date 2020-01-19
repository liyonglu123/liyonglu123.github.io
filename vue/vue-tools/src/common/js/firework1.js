/** 
 * 实现思路:
 * 一束烟花从地面发射
 * 烟花以一定的加速度向某个方向飞去
 * 飞行一定时间后爆炸
 * 爆炸产生一定数量的小火花
 * 小火花向四周散开，并逐渐变暗最后消失等等
 */
var firework = function (canvas, config) {
    // 变量定义省略
    var conf = {},
        ctx = canvas.getContext('2d')
    cw = window.innerWidth,
        ch = window.innerHeight,
        fireworks = [],
        particles = [],
        timerTick = 51,
        timerTotal = 50
    mouseX,
    mouseY,
    mouseDown = false,
        limiterTick = 0,
        limiterTotal = 8;
    canvas.width = cw;
    canvas.height = ch;
    conf['startX'] = cw / 2;
    conf['startY'] = ch;
    conf['endX'] = random(0, cw);
    conf['endY'] = random(0, ch / 2);
    conf['hue'] = 100;

    // 合并数据
    $.extend(conf, config);
    var ctx = canvas.getContext('2d');

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function calculateDistance(p1x, p1y, p2x, p2y) {
        var xDistance = p1x - p2x,
            yDistance = p1y - p2y;

        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    function Firework() {
        // 烟花的开始位置
        this.sx = conf['startX'];
        this.sy = conf['startY'];

        // 烟花的结束位置
        this.ex = conf['endX'];
        this.ey = conf['endY'];

        // 烟花的当前位置
        this.x = this.sx;
        this.y = this.sy;

        // 烟花发射的角度，计算烟花速度水平和垂直分量时有用
        this.angle = Math.atan2(this.ey - this.sy, this.ex - this.sx);
        this.distanceToTarget = calculateDistance(conf['startX'], conf['startY'], conf['endX'], conf['endY']);
        this.speed = conf['speed'] || 15;
        this.acceleration = conf['acceleration '] || 1.05;
        this.coordinates = [];
        this.coordinatesCount = conf['coordinatesCount'] || 3;

        while (this.coordinatesCount--) {
            this.coordinates.push([this.sx, this.sy]);
        }
        // 色相
        this.hue = conf['hue'] || 120;
        // 明亮度
        this.lightness = conf['lightness'] || random(50, 70)
    }
    Firework.prototype.draw = function () {
        ctx.beginPath();
        // 移动到最早记录的那个位置
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1], );
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = 'hsl(' + this.hue + ', 100%, ' + this.lightness + '%)';
        ctx.stroke();
    }
    Firework.prototype.update = function (index) {
        // 从用于实现烟花尾巴的队列中移除最早的位置
        this.coordinates.pop();
        // 记录当前位置
        this.coordinates.unshift([this.x, this.y]);

        // 计算当前速度
        this.speed *= this.acceleration;

        // 计算烟花此时速度在水平和垂直方向上的分量，其实就是从上一帧到这一帧之间烟花移动的水平和垂直方向上的距离
        var vx = Math.cos(this.angle) * this.speed,
            vy = vy = Math.sin(this.angle) * this.speed;

        // 计算烟花已经移动的距离，当距离超出最大距离时，产生爆炸
        this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

        if (this.distanceTraveled >= this.distanceToTarget) {
            // 产生爆炸
            var particleCount = random(10, 20); // 随机生成爆炸后产生的粒子数量
            while (particleCount--) {
                particles.push(new Particle(x, y));
            }
            // 销毁当前烟花
            fireworks.splice(index, 1);
        } else { // 更新当前位置
            this.x += vx;
            this.y += vy;
        }
    }

    function Particle(x, y) {
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
    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = 'hsla(' + this.hue + ', 100%' + this.brightness + '%, ' + this.alpha + ')';
        ctx.stroke();
    }
    Particle.prototype.update = function () {
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
            particles.splice(index, 1);
        }
    }

    canvas.addListener('mousedown', function (e) {});
    canvas.addListener('mouseup', function (e) {});

    !frameUpdate() {}();
}

//   $.fn.firework = function (config) {
//     var canvas = document.getElementById('firework-canvas');
//     if ('undefined' == canvas) {
//       $('body').append( '<canvas id=\"firework-canvas\" />' );
//       canvas = document.getElementById('firework-canvas');
//     }

//     return this.each( function () {
//       if($(this).data('firework')) return;
//       $(this).data('firework', new firework(canvas, config));
//     } );
//   }
export default firework