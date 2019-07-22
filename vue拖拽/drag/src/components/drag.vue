<template>
    <div id="drag-container" @mousemove="getMousePos" @mousedown="move">
        <!-- <button @click="getRect">矩形</button> -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                posX: 0,
                posY: 0,
                moveX: 0, // 开始移动的x点
                moveY: 0, // 开始移动的y点
                mouseX: 0, // 获取鼠标的全局位置
                mouseY: 0,
                direction: "center",
            }
        },
        created() {

        },
        mounted() {
            // let drag = document.getElementById("drag-container");
            // console.log(drag);
            // this.$nextTick(() => {
            //     window.addEventListener('mouseenter', this.getMousePos(e));
            // })
        },
        methods: {
            getMousePos() {
                var e = event || window.event;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                var x = e.pageX || e.clientX + scrollX;
                var y = e.pageY || e.clientY + scrollY;
                let odiv = e.target;
                let rectObj = odiv.getBoundingClientRect();
                let disX = e.clientX - odiv.offsetLeft;
                let disY = e.clientY - odiv.offsetTop;
                console.log(odiv.offsetLeft);
                console.log(odiv.offsetTop);
                console.log(disX, rectObj.width)
                console.log(disY, rectObj.height)
                if (disX >= rectObj.width - 10 && disY < rectObj.height - 10) {
                    this.direction = "left";
                    console.log("left");
                    odiv.style.cursor = "e-resize";
                }
                if(disX < rectObj.width - 10){
                    this.direction = "center";
                    console.log("center");
                    odiv.style.cursor = "move";
                }
                if(disY >= rectObj.height - 10){
                     this.direction = "bottom";
                    odiv.style.cursor = "s-resize";
                  
                }
                if(disY < rectObj.height - 10 && disX < rectObj.width - 10){
                   this.direction = "center";
                   console.log("center");
                    odiv.style.cursor = "move";
                }
                if(disX >= rectObj.width - 10 && disY >= rectObj.height - 10) {
                     this.direction = "cross";
                    odiv.style.cursor = "se-resize";
                   
                }
                // else {
                //     this.moveFlag = true;
                //     this.horizontalFlag = false;
                //     this.verticalFlag = false;
                //     this.crossFlag = false;
                // }
                return { 'x': x, 'y': y };
            },
            getRect() {

            },
            move(e) {
                let odiv = e.target; //获取目标元素
                // console.log(odiv.offsetLeft,odiv.offsetTop)
                //算出鼠标相对元素的位置
                let disX = e.clientX - odiv.offsetLeft;
                let disY = e.clientY - odiv.offsetTop;
                let rectObj = odiv.getBoundingClientRect();
                let x = rectObj.x;
                let y = rectObj.y;

                document.onmousemove = (e) => { //鼠标按下并移动的事件
                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    //绑定元素位置到positionX和positionY上面
                    this.posX = top;
                    this.posY = left;
                    // 水平縮放
                    if(this.direction =="left") {
                        odiv.style.left = x + 'px';
                        odiv.style.top = y + 'px';
                        odiv.style.width =  e.clientX + 'px';  
                    };
                    // 垂直缩放
                    if(this.direction =="bottom") {
                        odiv.style.height =  e.clientY + 'px'; 
                    };
                    // 同时缩放
                    if(this.direction =="cross") {
                        odiv.style.width =  e.clientX + 'px'; 
                        odiv.style.height =  e.clientY + 'px'; 
                    };
                    //移动当前元素
                    if(this.direction =="center") {
                        odiv.style.left = left + 'px';
                        odiv.style.top = top + 'px';
                    }
                };
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        }
    }
</script>
<style>
    #drag-container {
        /* cursor: move; */
        /* cursor: e-resize; */
        /* cursor: s-resize; */
        /* cursor: se-resize; */
        position: relative;
        /*定位*/
        top: 10px;
        left: 10px;
        width: 200px;
        height: 200px;
        background: #666;
        cursor: move;
    }
</style>