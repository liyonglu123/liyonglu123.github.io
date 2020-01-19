const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
class Fireworks {
    constructor(options) {
        this.initOptions();
        this.extentOptions(options);
        this.createCanvas();
    }
    // 初始化变量
    initOptions() {
        this.options = {
            startX: 100,
            startY: 0,
            endX: 100,
            endY: 500,
            opacity: 0.8
        }
    }
    // 合并options
    extentOptions(options) {
        let newOptions = options || {};
        for (const key in newOptions) {
            this.options[key] = newOptions[key];
        }
    }
    // 创建canvas 
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'fireworksWrapper';
        this.canvas.width = SCREEN_WIDTH;
        this.canvas.height = SCREEN_HEIGHT;
        this.canvas.style.width = SCREEN_WIDTH + 'px';
        this.canvas.style.height = SCREEN_HEIGHT + 'px';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0px';
        this.canvas.style.left = '0px';
        this.canvas.style.opacity = this.options.opacity;
        this.context = this.canvas.getContext('2d');
    }
    
}
export default Fireworks