<template>
    <div ref="listWrapper" class="list-wrapper">
        <!-- 下拉刷新,上拉加载 -->
        <div class="list-container">
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
            <ul class="list">
                <li v-for="(item, index) in dataList" :key="index" class="list-item">
                    {{ `I am item ${item} ` }}
                </li>
            </ul>
            <div class="pullup-wrapper">
                <div v-if="!isPullUpLoad" class="before-trigger">
                    <span class="pullup-txt">Pull up and load more</span>
                </div>
                <div v-else class="after-trigger">
                    <span class="pullup-txt">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    const TIME_BOUNCE = 800
    const TIME_STOP = 600
    const THRESHOLD = 70
    const STOP = 56
    export default {
        data() {
            return {
                beforePullDown: true,
                isPullingDown: false,
                isPullUpLoad: false,
                bscroll: null,
                dataList: [1, 2, 3,4,5,6,7,8,9,10],
                // dataList: [1, 2, 3]

            }
        },
        created() {},
        mounted() {
            this.initBscroll();
        },
        methods: {
            initBscroll() {
                if (!this.$refs.listWrapper) {
                    return;
                }
                this.bscroll = new BScroll(this.$refs.listWrapper, {
                    probeType: 1,
                    // scrollbar: true, // 滚动条显示与否
                    click: true,
                    // scrollY: true,
                    bounceTime: TIME_BOUNCE,
                    pullDownRefresh: {
                        threshold: THRESHOLD,
                        stop: STOP
                    },
                    pullUpLoad: true
                });
                // this._verticalScroll();
                console.log(this.bscroll);
                console.log(this.bscroll.wrapper.firstChild);
                this.bscroll.on('pullingDown', this.pullingDownHandler);
                this.bscroll.on('pullingUp', this.pullingUpHandler);
            },
            // 当数据量少的时候如何出现滚动
            //判断当content高度小于wrapper高度时设置可以下拉 手动进行设置的问题
            _verticalScroll() {
                if (this.bscroll.scrollerHeight >= this.bscroll.wrapper.firstChild.clientHeight) {
                    this.bscroll.hasVerticalScroll = true;
                }
            },
            // 下拉刷新
            pullingDownHandler() {
                this.beforePullDown = false;
                this.isPullingDown = true;
                setTimeout(() => {
                    this.dataList = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
                    this.isPullingDown = false
                    this.finishPullDown()
                }, 1000)
            },
            // 下拉完毕
            finishPullDown() {
                setTimeout(() => {
                    this.bscroll.finishPullDown()
                    setTimeout(() => {
                        this.beforePullDown = true
                        this.bscroll.refresh()
                    }, TIME_BOUNCE)
                }, TIME_STOP)
            },
            // 上拉加载
            pullingUpHandler() {
                // 当内容超过一屏的时候出现滚动
                // if (this.bscroll.wrapper.firstChild.clientHeight >= this.bscroll.scrollerHeight + 50) {
                    this.isPullUpLoad = true;
                    // 异步获取数据
                    setTimeout(() => {
                        this.dataList = this.dataList.concat(this.dataList);
                        this.bscroll.finishPullUp()
                        this.bscroll.refresh()
                        this.isPullUpLoad = false
                    }, 1000)
                // }

            }

        }
    }
</script>
<style lang="less" scoped>
    .list-wrapper {
        // position: relative;
        // height: 100%;
        // padding: 0 10px;
        // border: 1px solid #ccc;
        // overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;

        .list {
            height: 100%;
            padding: 0;

            .list-item {
                height: 80px;
                padding: 10px 0;
                list-style: none;
                border-bottom: 1px solid #ccc;
            }
        }

        .pulldown-wrapper {
            position: absolute;
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            transform: translateY(-100%) translateZ(0);
            text-align: center;
            color: #999;
        }

        .pullup-wrapper {
            padding: 20px;
            text-align: center;
            color: #999;
        }
    }
</style>