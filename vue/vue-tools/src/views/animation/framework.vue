<template>
    <div class="framework">
        <!-- 使用animate.css自定义动画 -->
        <button @click="clickHandler">toggle</button>
        <transition 
            name="custom-classes-transition"
            :appear= appear
            enter-active-class="animated heartBeat"
            leave-active-class="animated bounceOutRight"
        >
            <div class="content" v-show="showFlag">
                framework
            </div>
        </transition>

        <!-- 过渡和动画同时使用 -->
    <button @click="toggle">切换</button>

        <transition
            type="transition"
            appear
            enter-active-class="animated swing active"
            leave-active-class="animated bounceOutDown leave"
            appear-class="animated swing"
            :duration="{enter:3000,leave:5000}">
        <p v-if="show">过渡和动画同时使用</p>
    </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showFlag: true,
            appear: true,
            show: true,
        }
    },
    methods: {
        clickHandler() {
            this.showFlag = !this.showFlag;
        },
        toggle() {
            this.show=!this.show;
        }
    }
}
</script>
<style lang="less" scoped>
    @import "../../common/index";
    .v-enter,.v-leave-to{
    opacity: 0;
    color: #000;
}
.active,.leave{
    color:deepskyblue;
    transition: all 3s;
}
</style>