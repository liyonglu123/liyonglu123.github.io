<template>
    <div class="animation">
        <!-- css?? -->
        <button @click="clickHandler">toggle</button>
        <transition name="bounce">
            <div class="content" v-show="showFlag">
                animation
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showFlag: false
        }
    },
    methods: {
        clickHandler() {
            this.showFlag = !this.showFlag;
        }
    }
}
</script>
<style lang="less" scoped>
    @import "../../common/index";
    .content {
        width: 200px;
        height: 200px;
        background: red;
    }

</style>