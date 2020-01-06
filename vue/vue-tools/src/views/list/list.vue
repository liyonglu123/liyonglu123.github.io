<template>
    <div>
        <scroll class="wrapper" :data="data" :pulldown="pulldown" @pulldown="loadData">
            <!-- 这里必须用一个父元素进行包裹 否则选第一个元素 -->
            <div class="bscroll-container">
                <!-- 刷新提示信息 -->
                <div class="pulldown-wrapper">
                    <div v-show="beforePullDown">
                        <span>Pull Down and refresh</span>
                    </div>
                    <div v-show="!beforePullDown">
                        <div v-show="isPullingDown">
                            <span>Loading...</span>
                        </div>
                        <div v-show="!isPullingDown"><span>Refresh success</span></div>
                    </div>
                </div>
                <!-- 内容列表 -->
                <ul class="content">
                    <li class="item" v-for="(item, index) in data" :key="index" @click="clickHandler(item)">{{item}}</li>
                </ul>
                <!-- 底部提示信息 -->
                <!-- <div class="bottom-tip" v-show="pullupFlag">
                    <span class="loading-hook">{{pullupMsg}}</span>
                </div> -->
            </div>
        </scroll>
    </div>
</template>
<script>
    import scroll from "@/components/scroll/scroll"
    export default {
        data() {
            return {
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                pulldown: true,
                beforePullDown: true,
                isPullingDown: false,
            }
        },
        created() {
            // this.loadData();
        },
        methods: {
            loadData() {
                this.beforePullDown = false;
                this.isPullingDown = true;
                setTimeout(() => {
                    this.isPullingDown = false;
                    this.beforePullDown = true;
                    this.data = this.data.concat(this.data);
                   
                }, 2000)
            },
            clickHandler(item) {
                console.log(item);
            }
        },
        components: {
            scroll
        }
    }
</script>
<style lang="less" scoped>
    .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .content {

            .item {
                height: 100px;
                list-style: none;
                border-bottom: 1px solid red;
            }
        }

        .loading-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background: #eee;
            text-align: center;
        }

        .pulldown-wrapper {
            position: absolute;
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            transform: translateY(-100%) translateZ(0);
            text-align: center;
            color: #999
        }
    }
</style>