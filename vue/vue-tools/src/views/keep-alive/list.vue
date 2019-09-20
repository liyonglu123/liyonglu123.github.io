<template>
    <div>
        <i-input :value.sync="value" placeholder="请输入..." style="width: 300px"></i-input>
        <i-button type="primary" @click="goDetail">detail</i-button>
    </div>
</template>
<script>
    export default {
        name: 'list',
        data() {
            return {
                value: ''
            }
        },
        watch: {
            $route() {
            
            }
        },
        methods: {
            goDetail() {
                this.$router.push({
                    path:'/detail',
                    query: {
                        id: 666
                    }
                });
            }
        }
    }
</script>