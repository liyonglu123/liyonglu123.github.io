<template>
    <div class="pullup">
        <div ref="scroller" class="pullup-bswrapper">
            <div class="pullup-scroller">
                <ul class="pullup-list">
                    <li v-for="i of data" :key="i" class="pullup-list-item">
                        {{ i % 5 === 0 ? 'scroll up data' : `I am item ${i} `}}
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
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        data() {
            return {
                isPullUpLoad: false,
                data: 30,
                bscroll: null
            }
        },
        created() {},
        mounted() {
            this.initBscroll()
        },
        methods: {
            initBscroll() {
                if (!this.$refs.scroller) {
                    return;
                }
                this.bscroll = new BScroll(this.$refs.scroller, {
                    scrollY: true,
                    pullUpLoad: true
                })

                this.bscroll.on('pullingUp', this.pullingUpHandler)
            },
            pullingUpHandler() {
                this.isPullUpLoad = true
                // 异步获取数据
                setTimeout(()=> {
                    this.data += 20;
                    this.bscroll.finishPullUp()
                    this.bscroll.refresh()
                    this.isPullUpLoad = false
                },1000)
               
            }
        }
    }
</script>

<style lang="less">
    .pullup {
        height: 100vh;
        .pullup-bswrapper {
            position: relative;
            height: 100%;
            padding: 0 10px;
            border: 1px solid #ccc;
            overflow: hidden;

            .pullup-list {
                padding: 0;

                .pullup-list-item {
                    padding: 10px 0;
                    list-style: none;
                    border-bottom: 1px solid #ccc;
                }
            }

            .pullup-wrapper {
                padding: 20px;
                text-align: center;
                color: #999;
            }

        }
    }
</style>