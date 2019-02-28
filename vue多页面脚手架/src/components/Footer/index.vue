<template>
    <div class="footer">
        <tabbar class="foot-tabbar" @on-index-change="onIndexChange">
            <tabbar-item selected @on-item-click="go('index')">
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item @on-item-click="go('more')">
                <span slot="label">更多</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>
<script>
    import {ViewBox , Tabbar, TabbarItem } from 'vux'
    export default {
        data() {
            return {

            }
        },
        components: {
            ViewBox,
            Tabbar,
            TabbarItem
        },
        methods: {
            onIndexChange(newIndex, oldIndex) {
                console.log(newIndex, oldIndex);
            },
            go(title) {
                window.location.href = `${title}.html` ;
            }
        }
    }
</script>
<style lang="less" scoped>
.foot-tabbar {
    position: fixed;
}
</style>
