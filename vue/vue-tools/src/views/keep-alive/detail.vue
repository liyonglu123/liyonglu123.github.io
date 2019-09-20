<template>
    <div>
        <i-input :value.sync="value" placeholder="请输入..." style="width: 300px"></i-input>
        <i-button type="primary" @click="goList">list</i-button>
    </div>
</template>
<script>
    export default {
        name: 'detail',
        data() {
            return {
                value: '',
                id: ''
            }
        },
        created() {
            // this.id = this.$route.query.id || '';
            // if (this.id !== this.$route.query.id) {
            //     // 销毁事例  从零开始
            //     this.$destroy();   // 存在下次再进来的时候不能进行缓存了  - $destroy()销毁后就永远不会被缓存了 
            // }
            // this.id = this.$route.query.id;
            // console.log(this.id);
        },
        methods: {
            goList() {
                // 方式一: 直接写在需要的页面中
                let include = 'list';
                if(!this.$store.state.includes.includes(include)) {
                    this.$store.dispatch('setIncludes', include);
                }
                this.$router.push({
                    path: '/list'
                });
            }
        }
    }
</script>