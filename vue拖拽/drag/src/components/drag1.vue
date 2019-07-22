<template>
    <div class="ceshi" :class="curClass" @mouseenter="mouseenter" @mousemove="mousemove" @mousedown="mousedown">

    </div>
</template>
<script>
    import Drag from '@/utils/drag'
    import { getEleRect } from "@/utils/tool"
    export default {
        data() {
            return {
                drag: null,
                curClass: '',
                direction: "center",
                left: 0,
                top: 0,
            }
        },
        created() {

        },
        mounted() {
            this.drag = new Drag({
                el: ".ceshi"
            });
            this.drag.captureMouse(this.drag.el, this.mouseenter, this.mousemove, this.mousedown);
            // el.init();
            // console.log(el);

        },
        methods: {
            mouseenter(event) {},
            mousemove(event) {
                if (event && event.point) {
                    let odiv = this.drag.el;
                    let mouseX = event.point.x;
                    let mouseY = event.point.y;
                    let obj = getEleRect('.ceshi');
                    let x = obj.x;
                    let y = obj.y;
                    let width = obj.width;
                    let height = obj.height;
                    console.log(mouseX, width);
                    // 条件判断
                    if (mouseX >= width - 10 && mouseY < height - 10) {
                        this.curClass = "e-resize";
                        this.direction = "left";
                        console.log("left");
                    }
                    if (mouseX < width - 10 && mouseY < height - 10) {
                        this.curClass = "move-resize";
                        this.direction = "center";
                        console.log("center");
                        odiv.style.left = this.left + 'px';
                        odiv.style.top = this.top + 'px';
                    }
                    if (mouseY >= height - 10 && mouseX < width - 10) {
                        this.curClass = "s-resize";
                        this.direction = "bottom";
                        console.log("bottom");
                    }
                    if (mouseY >= height - 10 && mouseY <= height && mouseX >= width - 10 && mouseX <= width) {
                        this.curClass = "se-resize";
                        this.direction = "cross";
                        console.log("cross");
                    }
                    
                }
            },
            mousedown(event) {
                if (event && event.point) {
                    let odiv = this.drag.el;
                    let mouseX = event.point.x;
                    let mouseY = event.point.y;
                    let obj = getEleRect('.ceshi');
                    let x = obj.x;
                    let y = obj.y;
                    let width = obj.width;
                    let height = obj.height;
                    this.left = event.clientX - mouseX;
                    this.top = event.clientY - mouseY;
                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    // document.onmousemove((e) => {
                    //     debugger
                    //     let left = e.clientX - mouseX;
                    //     let top = e.clientY - mouseY;
                    //     // 移动
                    //     if (this.direction == 'center') {
                    //         odiv.style.left = left + 'px';
                    //         odiv.style.top = top + 'px';
                    //     }
                    //     // 水平
                    //     if (this.direction == 'left') {
                    //         odiv.style.x = mouseX + 'px';
                    //     }
                    //     // 垂直
                    //     if (this.direction == 'bottom') {
                    //         odiv.style.y = mouseY + 'px';
                    //     }
                    //     // 对角线
                    //     if (this.direction == 'cross') {
                    //         odiv.style.x = mouseX + 'px';
                    //         odiv.style.y = mouseY + 'px';
                    //     }
                    // })
                    // document.onmouseup = (e) => {
                    //     document.onmousemove = null;
                    //     document.onmouseup = null;
                    // };

                }
            }
        },
    }
</script>
<style scoped>
    .ceshi {
        /* cursor: move; */
        /* cursor: e-resize; */
        /* cursor: s-resize; */
        /* cursor: se-resize; */
        position: relative;
        padding: 20px;
        /*定位*/
        top: 10px;
        left: 10px;
        width: 200px;
        height: 200px;
        background: #666;
        cursor: move;
    }

    .e-resize {
        cursor: e-resize;
    }

    .s-resize {
        cursor: s-resize;
    }

    .move-resize {
        cursor: move;
    }

    .se-resize {
        cursor: se-resize;
    }
</style>