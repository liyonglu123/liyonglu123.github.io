const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
var Fireworks = function (options) {

    // 初始化变量
    this.options = {
        startX: 100,
        startY: 0,
        endX: 100,
        endY: 500,
        opacity: 0.8
    }
    // 合并options
    var extentOptions = function (options) {
        let newOptions = options || {};
        for (const key in newOptions) {
            this.ptions[key] = newOptions[key];
        }
    }
    // 创建canvas 
    var canvas = document.createElement('canvas');
    canvas.id = 'fireworksWrapper';
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    canvas.style.width = SCREEN_WIDTH + 'px';
    canvas.style.height = SCREEN_HEIGHT + 'px';
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.opacity = options.opacity;
    var context = canvas.getContext('2d');

    // 粒子类
    class Particle {
        constructor() {
            this.pos = {
                x: pos ? pos.x : 0,
                y: pos ? pos.y : 0
            };
            this.vel = {
                x: 0,
                y: 0
            };
            this.shrink = 0.97;
            this.size = 2;
            this.resistance = 1;
            this.gravity = 0;
            this.flick = false;
            this.alpha = 1;
            this.fade = 0;
            this.color = 0;
        }
        update() {
            // apply resistance
            this.vel.x *= this.resistance;
            this.vel.y *= this.resistance;
            // gravity down
            this.vel.y += this.gravity;
            // update position based on speed
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
            // shrink
            this.size *= this.shrink;
            // fade out
            this.alpha -= this.fade;
        }
        render(c) {
            if (!this.exists()) {
                return;
            }
            c.save();
            c.globalCompositeOperation = 'lighter';
            var x = this.pos.x,
                y = this.pos.y,
                r = this.size / 2;
            var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
            gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
            gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
            gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");
            c.fillStyle = gradient;
            c.beginPath();
            c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
            c.closePath();
            c.fill();
            c.restore();
        }
        exists() {
            return this.alpha >= 0.1 && this.size >= 1;
        }
    }
    var loop = function(){
        
    }
}

export default Fireworks