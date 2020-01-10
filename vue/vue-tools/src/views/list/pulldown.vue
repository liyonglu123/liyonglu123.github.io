<template>
    <div class="pulldown">
        <div ref="bsWrapper" class="pulldown-bswrapper">
            <div class="pulldown-scroller">
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
                <ul class="pulldown-list">
                    <li v-for="(item, index) in dataList" :key="index" class="pulldown-list-item">
                        {{ `I am item ${item} ` }}
                    </li>
                </ul>
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
    // let STEP = 0

    export default {
        data() {
            return {
                beforePullDown: true,
                isPullingDown: false,
                bscroll: null,
                dataList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        created() {

        },
        mounted() {
            this.initBscroll();
        },
        methods: {
            initBscroll() {
                if (!this.$refs.bsWrapper) {
                    return;
                }
                this.bscroll = new BScroll(this.$refs.bsWrapper, {
                    probeType: 3,
                    click: true,
                    scrollY: true,
                    bounceTime: TIME_BOUNCE,
                    pullDownRefresh: {
                        threshold: THRESHOLD,
                        stop: STOP
                    }
                })
                console.log(this.bscroll);
                this.bscroll.on('pullingDown', this.pullingDownHandler)
                // this.bscroll.on('scroll', this.scrollHandler)
            },
            scrollHandler(pos) {
                console.log(pos.y)
            },
            pullingDownHandler() {
                this.beforePullDown = false;
                this.isPullingDown = true;
                setTimeout(() => {
                    this.dataList = this.dataList.concat(this.dataList);
                    this.isPullingDown = false
                    this.finishPullDown()
                }, 1000)

            },
            // 完成下拉刷新
            finishPullDown() {
                setTimeout(() => {
                    this.bscroll.finishPullDown()
                    setTimeout(() => {
                        this.beforePullDown = true
                        this.bscroll.refresh()
                    }, TIME_BOUNCE)
                }, TIME_STOP)


            }
        }
    }
</script>

<style lang="less" scoped>
    .pulldown {
        height: 100%;

        .pulldown-bswrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 0 10px;
            border: 1px solid #ccc;
            overflow: hidden;

            .pulldown-list {
                padding: 0;

                .pulldown-list-item {
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

        }
    }
</style>