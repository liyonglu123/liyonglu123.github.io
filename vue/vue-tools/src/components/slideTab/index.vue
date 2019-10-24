<template>
    <div class="tab-container">
        <div class="tab-wrapper">
            <div class="tab-item" v-for="(item, index) in tabList" :key="index" @click="click(item, index, $event)">
                <span class="title">{{ item.title }}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tabList: [
                {
                    title: "第一个",
                    value: "0"
                },
                {
                    title: "第二个fsefewfe",
                    value: "1"
                },
                {
                    title: "第三个",
                    value: "3"
                },
                {
                    title: "第四个服务管理",
                    value: "4"
                },
                {
                    title: "第五个",
                    value: "5"
                },
                {
                    title: "第六个",
                    value: "6"
                },
                {
                    title: "第七个",
                    value: "7"
                }]
            }
        },
        methods: {
            click(item, index, $event) {
                // 当每一个tab的宽度相等的时候  ===  当不想等的时候  存入数组中进行循环计算

                // childHeight * ( j + 1 ) - parentNodeHeight / 2 // 核心代码
                let ele = $event.currentTarget;
                let parent = ele.parentNode;
                let parentNodeWidth = parent.offsetWidth;
                let childWidth = $event.currentTarget.offsetWidth;
                
                // if (tx > parentNodeWidth / 2) {
                //     // parent.style.left = `-${tx}px`;
                //     parent.style.scrollLeft = `${tx}px`
                // }
                // debugger
                // let count = 0;
                // let duration = 2000;
                // let from = parent.scrollLeft;
                let to = childWidth * (index + 1) - parentNodeWidth / 2;
                // const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16);
                // function animate() {
                //     if (++count < frames) {
                //          parent.scrollLeft += (to - from) / frames;
                //     }
                // }
                // animate();
                // 自己添加动画实现即可
                // setTimeout(animate, 16);
                parent.scrollLeft = to;
                // parent.style.transform =  `translateX(-${tx}px) translateX(-50%); transition-duration: 0.3s;`

                // if(left > width /2) {
                //     console.log("666");
                //     // let s = left - width /2 + self/2;
                //     let s = left - width /2;
                //     // width: 35px; transform: translateX(528px) translateX(-50%); transition-duration: 0.3s;
                //     ele.style.transform =  `translateX(-${s}px) translateX(-50%); transition-duration: 0.3s;`

                // }
            }
        }
    }
</script>
<style lang="less" scoped>
    .tab-container {
        position: relative;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: red;
        overflow: hidden;

        .tab-wrapper {

            position: relative;
            box-sizing: content-box;
            padding-bottom: 10px;
            display: flex;
            width: 100%;
            min-width: 0;
            overflow: hidden;
            overflow-x: auto;
            height: 40px;
            background: #fff;
            -webkit-overflow-scrolling: touch;
            transition: all 1s;

            &:after {
                position: absolute;
                box-sizing: border-box;
                content: ' ';
                pointer-events: none;
                top: -50%;
                right: -50%;
                bottom: -50%;
                left: -50%;
                border: 0 solid #ebedf0;
                -webkit-transform: scale(0.5);
                transform: scale(0.5);
            }

            // transform: translateX(0);
            .tab-item {
                position: relative;
                flex: auto;
                box-sizing: border-box;
                color: #7d7e80;
                min-width: 0;
                font-size: 14px;
                line-height: 44px;
                text-align: center;
                min-width: 100px;
                // flex-shrink: 0;
                padding: 0 20px;
                transform: translateX(0);
                cursor: pointer;

                .title {
                    display: block;
                    height: 38px;
                    line-height: 38px;
                    border: 1px solid red;
                }
            }
        }
    }
</style>