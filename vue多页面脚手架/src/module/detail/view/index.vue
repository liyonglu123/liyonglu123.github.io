<template>
    <div class="detail">
        <!-- <router-link to="/">返回</router-link> -->
        <div class="container">详情页</div>
        id:<span>{{ id }}</span>
    </div>
</template>
<script>
import { parseURL } from 'utils/tool'
    export default {
        data() {
            return {
               id:''
            }
        },
        components: {
            
        },
        created () {
            this.id = parseURL(window.location.href).id;
            // this.id = parseURL(window.location.href)
        },
        mounted () {
            console.log(window.location.href);
        }
    }
</script>
<style lang="less" scoped>
   
</style>