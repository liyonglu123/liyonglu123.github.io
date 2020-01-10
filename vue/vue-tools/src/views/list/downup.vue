<template>
    <div class="container">
        <downuplist></downuplist>
    </div>
</template>
<script>
import downuplist from "@/components/downUpList/downUpList"
export default {
    data() {
        return {

        }
    },
    components: {
        downuplist
    }
}
</script>
<style lang="less" scoped>
    .container {
        height: 80vh;
    }
</style>