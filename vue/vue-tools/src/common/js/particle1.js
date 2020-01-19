import Fireworks from "./firework";
// 粒子类
class Particle {
    constructor(pos) {
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
        this.context = new Fireworks().context;
    };
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
    };
    render() {
        if (!this.exists()) {
            return;
        }

        this.context.save();

        this.context.globalCompositeOperation = 'lighter';

        let x = this.pos.x,
            y = this.pos.y,
            r = this.size / 2;

        let gradient = this.context.createRadialGradient(x, y, 0.1, x, y, r);
        gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
        gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
        gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");

        this.context.fillStyle = gradient;

        this.context.beginPath();
        this.context.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();

        this.context.restore();
    };
    exists() {
        return this.alpha >= 0.1 && this.size >= 1;
    }
}
export default Particle