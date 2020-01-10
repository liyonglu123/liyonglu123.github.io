<template>
    <div ref="wrapper">
        <!-- better-scroll 的组件化的封装实现 -->
        <slot></slot>
    </div>
</template>
<script>
    import BScroll from "better-scroll";
    export default {
        data() {
            return {

            }
        },
        props: {
            /**
             * 1 滚动的时候会派发scroll事件，会截流。
             * 2 滚动的时候实时派发scroll事件，不会截流。
             * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
             */
            probeType: {
                type: Number,
                default: 1
            },
            /**
             * 点击列表是否派发click事件
             */
            click: {
                type: Boolean,
                default: true
            },
            /**
             * 是否开启横向滚动
             */
            scrollX: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发滚动事件
             */
            listenScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 列表的数据
             */
            data: {
                type: Array,
                default: null
            },
            /**
             * 是否派发滚动到底部的事件，用于上拉加载
             */
            pullup: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发顶部下拉的事件，用于下拉刷新
             */
            pulldown: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发列表滚动开始的事件
             */
            beforeScroll: {
                type: Boolean,
                default: false
            },
            // 弹性时间
            bounceTime: {
                type: Number,
                default: 800
            },
            /**
             * 当数据更新后，刷新scroll的延时 在这个期间可以  transition-group 做动画效果，。
             */
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        mounted() {
            // 保证在DOM渲染完毕后初始化better-scroll
            setTimeout(() => {
                this._initScroll();
            }, 20)
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return;
                }
                // better-scroll的初始化
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click,
                    scrollX: this.scrollX,
                    scrollY: true,
                    bounceTime: this.bounceTime,
                    pullDownRefresh: {
                        threshold: 50,
                        stop: 50 //当下拉长度距离盒子顶部的高度超过10px的时候,就派发一个下拉刷新的事件
                    },
                });
                // 是否派发滚动事件
                if (this.listenScroll) {
                    this.scroll.on("scroll", (pos) => {
                        console.log("scroll");
                        this.$emit('scroll', pos);
                    });
                }
                // 是否派发滚动到底部事件，用于上拉加载
                if (this.pullup) {
                    this.scroll.on('scrollEnd', () => {
                        console.log("scrollEnd");

                        // 滚动到底部
                        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            this.$emit('scrollToEnd');
                        }
                    })
                }
                // 是否派发顶部下拉事件，用于下拉刷新 touchEnd 方法的名字不要写错了啊 
                if (this.pulldown) {
                    // this.scroll.on('touchEnd', (pos) => {
                    //     console.log("touchEnd");
                    //     // 下拉动作
                    //     if (pos.y > 50) {
                    //         this.$emit('pulldown');
                    //     }
                    // })
                    // this.scroll.on('pullingDown', (pos) => {
                    //     console.log("pullingDown");
                    //     // 下拉动作
                    //     if (pos.y > 50) {
                    //         this.$emit('pulldown');
                    //     }
                    // })
                }
                if (this.pulldown) {
                    this.scroll.on('pullingDown', () => {
                        console.log("pullingDown");
                        this.$emit('pulldown', this.scroll);
                        // this.scroll.finishPullDown();
                        // setTimeout(() => {
                        //     this.scroll.finishPullDown()
                        // }, 1000)
                    })
                    // this.scroll.on('pullingDown', (pos) => {
                    //     console.log("pullingDown");
                    //     // 下拉动作
                    //     if (pos.y > 50) {
                    //         this.$emit('pulldown');
                    //     }
                    // })
                }

                // 是否派发列表滚动开始的事件
                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        console.log("beforeScrollStart");
                        this.$emit('beforeScroll');
                    })
                }
            },
            disable() {
                // 代理better-scroll的disable方法
                this.scroll && this.scroll.disable()
            },
            enable() {
                // 代理better-scroll的enable方法
                this.scroll && this.scroll.enable()
            },
            refresh() {
                // 代理better-scroll的refresh方法
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                // 代理better-scroll的scrollTo方法
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                // 代理better-scroll的scrollToElement方法
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            //  监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
            data() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        },
    }
</script>
<style lang="less" scoped>

</style>