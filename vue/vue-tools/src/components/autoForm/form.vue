<template>
    <i-form :model="formData" :rules="rules" :label-width="80">
        <div v-for="(item, index) in formList" :key="index">
             <item :item='item' :data="formData"></item>
        </div>
    </i-form> 
</template>
<script>
import Item from './item'
export default {
    data() {
        return {
            list: [],
            data: null,
            rules: {}
        }
    },
    props:{
        // 動態表單的數據
        formList: {
            type: Array,
            default() {
                return null
            }
        },
        formData: {
            type: Object,
            default() {
                return null
            }
        }
    },
    components: {
        Item
    },
    mounted () {
    },
    created() {
        
    },
}
</script>
<style lang="less">
    
</style>