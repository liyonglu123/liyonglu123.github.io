<template>
    <div class="fireworksFieldWrap">
        fireworks
        <!-- <canvas id="canvas"></canvas> -->
        <button @click="shotClick">发射</button>
    </div>
</template>
<script>
    import Fireworks from "@/common/js/firework.js"
    export default {
        data() {
            return {

            }
        },
        mounted() {
            this.canvas = document.getElementById("canvas");
        },
        methods: {
            shotClick() {
                
                let fireworks = new Fireworks({
                    opacity: 0.9,
                    width: '100%',
                    height: '100%'
                });
                console.log(fireworks, fireworks.clear());
                // setTimeout(fireworks.clear.call(fireworks), 5000)
            }
        }
    }
</script>
<style lang="less">

</style>