import Particle from "./particle1";
import Fireworks from "./firework";

class Rocket extends Particle {
    constructor(x) {
        super({
            x: x,
            y: new Fireworks().SCREEN_HEIGHT
        });
        this.explosionColor = 0;
        this.context = new Fireworks().context;
    };
    explode() {
        if (options.sound) {
            let randomNumber = function (min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }(0, 2);
        }

        let count = Math.random() * 10 + 80;

        for (let i = 0; i < count; i++) {
            let particle = new Particle(this.pos);
            let angle = Math.random() * Math.PI * 2;

            // emulate 3D effect by using cosine and put more particles in the middle
            let speed = Math.cos(Math.random() * Math.PI / 2) * 15;

            particle.vel.x = Math.cos(angle) * speed;
            particle.vel.y = Math.sin(angle) * speed;

            particle.size = 10;

            particle.gravity = 0.2;
            particle.resistance = 0.92;
            particle.shrink = Math.random() * 0.05 + 0.93;

            particle.flick = true;
            particle.color = this.explosionColor;

            particles.push(particle);
        }
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
        gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.alpha + ")");
        gradient.addColorStop(1, "rgba(0, 0, 0, " + this.alpha + ")");
        this.context.fillStyle = gradient;
        this.context.beginPath();
        this.context.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size / 2 + this.size / 2 : this.size, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
        this.context.restore();
    }
   
}
export default Rocket