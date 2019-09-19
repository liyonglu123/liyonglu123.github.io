<template>
    <Form-item :label="item.label" :prop="item.key">
            <i-input v-if="item.type == 'input'" :value.sync="val" :placeholder="item.placeholder"></i-input>
            <i-select v-if="item.type == 'select'" :model.sync="val" :laceholder="item.placeholder">
                <i-option v-for="(item, index) in item.options" :key="index" :value="item.value">{{ item.label}}</i-option>
            </i-select>
    </Form-item>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: {
        item: {
            type: Object,
            default() {
                return null
            }
        },
        data: {
            type: Object,
            default() {
                return null
            }
        },
    },
    computed: {
        key() {
         return this.item.key;
        },
        val: {
            get() {
                // 根据传入的data进行处理
                // this.key
               return this.data[this.key]; 
            },
            set(val) {
                console.log(val);
                debugger
                this.data[this.key] = val; 
            }
        }
    }
}
</script>
<style lang="less">
    
</style>