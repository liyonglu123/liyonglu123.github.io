<template>
    <div class="list-container">
        <div class="list-wrapper" ref="wrapper" style="transform:translate(0,0)">
            <div class="pulldown-wrapper">
                下拉刷新
            </div>
            <ul class="list">
                <li class="list-item" v-for="(item, index) in list" :key="index">{{ item }}</li>
            </ul>
            <div class="pullup-wrapper">
                上拉加载
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        },
        created() {
            
        },
        mounted() {
            window.addEventListener("mousewheel", (e)=>{
                this.$refs.wrapper.style.transform =  `translate(0,${e.pageY}px)`;
                console.log(this.$refs.wrapper.style.transform);
                
            });
        },
        methods: {

        }
    }
</script>
<style lang="less">
    .list-container {
        position: relative;
        width: 100%;
        height: 100vh;
        background: #eee;
        overflow: hidden;
        .list-wrapper {
            // position: absolute;
            // top: 0;
            // bottom: 0;
            // width: 100%;
            // overflow: auto;
            
            .pulldown-wrapper {

            }
            .list {
                .list-item {
                    height: 100px;
                    line-height: 100px;
                    border-bottom: 1px solid #ccc;
                }
            }
            .pullup-wrapper {

            }
        }
    }
</style>