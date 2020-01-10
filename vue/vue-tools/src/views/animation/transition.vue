<template>
    <div class="transition">
        <!-- css过渡 -->
        <!-- <button @click="clickHandler">toggle</button> -->
        <div class="container" @click="clickHandler">
            <div class="footer">
                <span>45456456</span>
            </div>
        </div>
        <transition name="fold">
            <div class="content" v-show="showFlag">
                <div class="title">fadsgsgsgfadsgsgsgfadsgsgsgfadsgsgsgfadsgsgsgfadsgsgsg</div>
            </div>
        </transition>
    </div>
</template>
<script>
    // import CusTransition from "@/components/functional/functional"
    export default {
        data() {
            return {
                showFlag: false,
                flag: false
            }
        },
        methods: {
            clickHandler() {
                this.showFlag = !this.showFlag;
                this.flag = !this.flag;
            }
        },
    }
</script>
<style lang="less" scoped>
    // @import "../../common/transition.less";
    .transition {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 48px;
        z-index: 50;
        background: #000;
    }
    .container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 50;
        background: #000;
        z-index: 100;
    }

    .content {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: -10;
        padding: 0 0 48px 0;
        .title {
            min-height: 200px;
        }
    }

    .fold-enter-active,
    .fold-leave-active {
        transition: all 0.5s;
        // transform: translate3d(0,0,0);
    }

    .fold-enter,
    .fold-leave-to {
        transform: translate3d(0, 100%, 0);
    }
</style>