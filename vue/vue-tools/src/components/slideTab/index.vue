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
                let ele = $event.currentTarget;
                let self = $event.currentTarget.offsetWidth
                let left = ele.offsetLeft;
                let width = window.screen.width;
                if(left > width /2) {
                    console.log("666");
                    // let s = left - width /2 + self/2;
                    let s = left - width /2;
                    // width: 35px; transform: translateX(528px) translateX(-50%); transition-duration: 0.3s;
                    ele.style.transform =  `translateX(-${s}px) translateX(-50%); transition-duration: 0.3s;`

                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .tab-container {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: red;
        overflow: hidden;
    
        .tab-wrapper {
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
            .tab-item {
                flex: auto;
                box-sizing: border-box;
                color: #7d7e80;
                min-width: 0;
                font-size: 14px;
                line-height: 44px;
                text-align: center;
                flex-shrink: 0;
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