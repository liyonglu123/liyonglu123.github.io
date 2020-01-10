<template>
    <div id="animated-number-demo">
        请输入数字: <input v-model.number="number" type="number" step="20">
        <p>{{ animatedNumber }}</p>
    </div>
</template>
<script>
    import { TweenLite } from "gsap"
    export default {
        data() {
            return {
                number: 0,
                tweenedNumber: 0
            }
        },
        computed: {
            animatedNumber: function () {
                return this.tweenedNumber.toFixed(0);
            }
        },
        watch: {
            number: function (newValue) {
                TweenLite.to(this.$data, 0.5, { tweenedNumber: newValue });
            }
        }
    }
</script>
<style lang="less">

</style>