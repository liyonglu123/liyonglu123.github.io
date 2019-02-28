<template>
    <div class="home">
        <div class="container">首页</div>
        <!-- 引入子组件 -->
        <child></child>
        <!-- 使用vux组件 -->
        <group>
            <!-- <cell :link="host+ '/detail.html'" :title="title" :value="value"> -->
            <cell :title="title" :value="value" @click.native="goDetail(value)">
                <!-- <a href="/detail.html"></a> -->
            </cell>
            <calendar title="title" v-model="date"></calendar>
        </group>
    </div>
</template>
<script>
    import Child from "./child"
    // 这是局部注册
    import { Group, Cell, Calendar } from 'vux'
import { debuglog } from 'util';
    export default {
        data() {
            return {
                host: '',
                title: 'vux表单',
                value: '111',
                date: ''
            }
        },
        created () {
            this.host = window.location.host;
        },
        mounted () {
            
        },
        methods: {
            goDetail(id) {
                window.location.href = `detail.html?id=${id}`;
            } 
        },
        components: {
            Child,
            Group,
            Cell,
            Calendar
        }
    }
</script>
<style lang="less" scoped>
    .home {
        .container {
            width: 2rem;
            height: 2rem;
            background: red;
        }
    }
</style>