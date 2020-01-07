<template>
    <div class="container">
        <!-- 方式一 -->
        <!-- <div class="wrapper clearfix">
            <div class="content">
                <p>测试sticky footer</p>
                <p>测试sticky footer</p>
                <p>测试sticky footer</p>
                <p>测试sticky footer</p>
                <p>测试sticky footer</p>
                <p>测试sticky footer</p>
                <p>测试sticky footer</p>
                <p>测试sticky footer</p>
                <p>测试sticky footer</p>
            </div>
        </div>
        <div class="footer">这是底部元素</div> -->
        <!-- 方式二 -->
        <div class="main">
            <p>测试sticky footer</p>
            <p>测试sticky footer</p>
            <p>测试sticky footer</p>
            <p>测试sticky footer</p>
            <p>测试sticky footer</p>
            <p>测试sticky footer</p>
            <p>测试sticky footer</p>
            <p>测试sticky footer</p>
            <p>测试sticky footer</p>
        </div>
        <div class="footer">这是底部元素</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        created() {


        }
    }
</script>
<style lang="less" scoped>
    // 方式一: -margin + padding-bottom 进行结合实现
    // .container{
    //     position: fixed;
    //     overflow: auto;
    //     width: 100%;
    //     height: 100%;
    //     .wrapper {
    //         min-height: 100%;
    //         width: 100%;
    //         background: red;
    //         .content {
    //             // margin-top: 60px;
    //             padding-bottom: 100px;
    //         }
    //     }
    //     .footer {
    //         margin: -100px auto 0 auto;
    //         font-size: 32px;
    //     }
    //     .clearfix{
    //         &::after {
    //             display: block;
    //             height: 0;
    //             content: '.';
    //             clear: both;
    //             visibility: hidden;
    //         }
    //     }
    // }

    // 方式二: flex 兼容性不够好
    .container {
        display: flex;
        flex-flow: column;
        min-height: 100vh;
        overflow: auto;
        .main {
            flex: 1
        }   
    }
</style>