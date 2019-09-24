<template>
    <i-form class="form" :model="formData" :rules="rules" :label-width="80">
        <div v-drag-exchange v-for="(item, index) in formList" :key="index" class="item" >
            <item :item='item' :data="formData"></item>
            <!-- <Icon class="del-icon" :size="10" color="red" type="close-circled" @click="deleteItem(item, formList)"></Icon> -->
            <div class="del-icon" @click="deleteItem(item, formList)"></div>
        </div>
    </i-form>
</template>
<script>
    import Item from './item'
    export default {
        data() {
            return {
                list: [],
                rules: {}
            }
        },
        props: {
            // 動態表單的數據
            formList: {
                type: Array,
                default () {
                    return null
                }
            },
            formData: {
                type: Object,
                default () {
                    return null
                }
            }
        },
        watch: {
            formData: {
                handler(newVal, oldVal) {},
                deep: true
            },
            formList :{
                handler(newVal, oldVal) {
                },
                deep: true
            },
        },
        components: {
            Item
        },
        mounted() {
           
        },
        created() {
        },
        methods: {
            // 删除节点
            deleteItem(item, formList) {
                formList.forEach((listItem,index) => {
                    if(item.key === listItem.key) {
                        formList.splice(index, 1);
                    }
                });
                this.formList = formList;
                console.log(this.formList);
            },
        }
    }
</script>
<style lang="less">
    .form {
        position: relative;
        width: 435px;
        height: 580px;
        margin: 10px auto;
        padding: 10px 5px 10px 10px;
        border: 1px solid #ccc;
    }

    .item {
        float: left;
        // position: absolute;
        width: 200px;
        height: 40px;
        line-height: 40px;
        background: #ccc;
        border: 1px solid #999;
        .del-icon {
            position: absolute;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            background: red;
        }
    }

    .hig {
        width: 200px;
        height: 40px;
        border: 2px dashed blue;
    }
</style>