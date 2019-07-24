export default class Drag {
    constructor(opt) {
        this.ele = document.querySelector(opt.ele);
        this.animateObj = null
    }
    config() {
        let obj = {
            animate: true
        }
        return  obj
    };
    getOriginalStyle() {

    };
    resizable(options) {
        // 执行动画
        if(this.config.animate){
            this.scale(this.config.animate);
        }else {
            this.scale();
        }
    };
    scale(animateFlag) {
        let _this = this;
        _this.ele.onmousedown= function (ev) {
            let oDiv = _this.ele;
            var pos = {
                'w': oDiv.offsetWidth,
                'h': oDiv.offsetHeight,
                'x': ev.clientX,
                'y': ev.clientY
            };
            document.onmousemove=function(ev){
              // 设置图片的最小缩放为30*30
              let w = Math.max(30, ev.clientX - pos.x + pos.w)
              let h = Math.max(30, ev.clientY - pos.y + pos.h)
              // console.log(w,h)
              // 设置图片的最大宽高
              w = w >= document.offsetWidth - oDiv.offsetLeft ? document.offsetWidth - oDiv.offsetLeft : w
              h = h >= document.offsetHeight - oDiv.offsetTop ? document.offsetHeight - oDiv.offsetTop : h
              oDiv.style.width = w + 'px';
              oDiv.style.height = h + 'px';
            };
            document.onmouseup=function(){
                let el =  document.querySelector('.ceshi');
                el.style.width = oDiv.style.width;
                el.style.height = oDiv.style.height;
                document.onmousemove=null;
                document.onmouseup=null;
            };
        }
    }
}