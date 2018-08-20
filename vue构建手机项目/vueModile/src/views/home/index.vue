<template>
    <transition name="fade" enter-active-class="animated rotateIn" leave-active-class="animated bounce" :duration="200">
        <div>
            <h3 v-if="flag">我是home页</h3>
            <span class="hvr-float-shadow">jfjiegih</span>
            <button class="hvr-shutter-out-horizontal">点我</button>
            <div class="ceshi">测试bounce.js</div>
        </div>
    </transition>
</template>
<script>
    export default {
        data() {
            return {
                flag: true
            }
        }
    }
</script>

<style lang="less" scoped>
    .ceshi {
        width: 200px;
        height: 200px;
        background: red;
    }
</style>