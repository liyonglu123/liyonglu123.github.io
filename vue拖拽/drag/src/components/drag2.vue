<template>
    <div>
        <div id="father">
            <div :class="'box-'+index" :style="{width:item.width + 'px', height:item.height + 'px', position: 'absolute', top: item.top + 'px', left: item.left + 'px', cursor: 'move', backgroundColor: item.color }" @mousedown="contentMousedown($event, item, index)" v-for="(item, index) in list" :key="index">
                <div class="aim">
                    {{ item.content }}
                </div>
                    <div id="scale" :class="'scale-'+index" @mousedown="scaleMousedown($event, item, index)"></div>
                </div>
            </div>
            <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="标签类型">
                        <el-select v-model="form.type" placeholder="请选择标签类型">
                            <el-option label="div" value="div"></el-option>
                            <el-option label="input" value="input"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标签内容">
                        <el-input v-model="form.content"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="addEle">添加</el-button>
            </div>
        </div>


</template>
<script>
    import { deepCopy, getRandom } from "@/utils/tool"
    export default {
        data() {
            return {
                list: [],
                form: {
                    type: "",
                    content: "",
                }
            }
        },
        mounted() {},
        methods: {
            // 添加元素
            addEle() {
                let form = {
                    width: 150,
                    height: 100,
                    top: getRandom(0, 400),
                    left: getRandom(0, 450),
                    color: 'red'
                }
                let list = deepCopy(this.list);
                form = Object.assign({}, form, this.form);
                console.log(form);
                list.push(form);
                this.list = list;
                // if (this.list && this.list.length == 0) {
                //     this.list.push(this.form);
                // }
                // if(this.list && this.list.length > 0) {
                //      let arr = Object.keys(this.form).map
                //      (key=> this.form[key])
                //      this.list.concat(arr);
                // }
                console.log(this.list.length);
            },
            contentMousedown(ev, item, index) {
                let fa = document.getElementById("father");
                let className = `.box-${index}`;
                let box = document.querySelector(className);
                let oEvent = ev;
                // 浏览器有一些图片的默认事件,这里要阻止
                oEvent.preventDefault();
                let disX = oEvent.clientX - box.offsetLeft;
                let disY = oEvent.clientY - box.offsetTop;
                fa.onmousemove = function (ev) {
                    oEvent = ev;
                    oEvent.preventDefault();
                    let x = oEvent.clientX - disX;
                    let y = oEvent.clientY - disY;
                    // 图形移动的边界判断
                    x = x <= 0 ? 0 : x;
                    x = x >= fa.offsetWidth - box.offsetWidth ? fa.offsetWidth - box.offsetWidth : x;
                    y = y <= 0 ? 0 : y;
                    y = y >= fa.offsetHeight - box.offsetHeight ? fa.offsetHeight - box.offsetHeight : y;
                    box.style.left = x + 'px';
                    box.style.top = y + 'px';
                }
                // 图形移出父盒子取消移动事件,防止移动过快触发鼠标移出事件,导致鼠标弹起事件失效
                fa.onmouseleave = function () {
                    fa.onmousemove = null;
                    fa.onmouseup = null;
                }
                // 鼠标弹起后停止移动
                fa.onmouseup = function () {
                    fa.onmousemove = null;
                    fa.onmouseup = null;
                }
            },
            // 图片缩放效果
            scaleMousedown(e, item, index) {
                let fa = document.getElementById("father");
                let className = `.box-${index}`;
                let box = document.querySelector(className);
                // 阻止冒泡,避免缩放时触发移动事件
                e.stopPropagation();
                e.preventDefault();
                var pos = {
                    'w': box.offsetWidth,
                    'h': box.offsetHeight,
                    'x': e.clientX,
                    'y': e.clientY
                };
                fa.onmousemove = function (ev) {
                    ev.preventDefault();
                    // 设置图片的最小缩放为30*30
                    let w = Math.max(30, ev.clientX - pos.x + pos.w)
                    let h = Math.max(30, ev.clientY - pos.y + pos.h)
                    // console.log(w,h)
                    // 设置图片的最大宽高
                    w = w >= fa.offsetWidth - box.offsetLeft ? fa.offsetWidth - box.offsetLeft : w
                    h = h >= fa.offsetHeight - box.offsetTop ? fa.offsetHeight - box.offsetTop : h
                    box.style.width = w + 'px';
                    box.style.height = h + 'px';
                    // console.log(box.offsetWidth,box.offsetHeight)
                }
                fa.onmouseleave = function () {
                    fa.onmousemove = null;
                    fa.onmouseup = null;
                }
                fa.onmouseup = function () {
                    fa.onmousemove = null;
                    fa.onmouseup = null;
                }
            }
        }
    }
</script>
<style scoped>
    #box {
        width: 100px;
        height: 100px;
        background-color: aquamarine;
        position: absolute;
        cursor: move;
    }

    #father {
        width: 50%;
        height: 500px;
        background-color: rgb(226, 117, 184);
        position: relative;
    }

    img {
        width: 100%;
        height: 100%;
        cursor: move;
    }

    .aim {
        width: 100%;
        height: 100%;
    }

    #scale {
        width: 10px;
        height: 10px;
        overflow: hidden;
        cursor: se-resize;
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: rgb(122, 191, 238);
    }
</style>