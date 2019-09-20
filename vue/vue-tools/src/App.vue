<template>
    <div id="app">
        <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
        <!-- 方式一 名称 -->
        <!-- <keep-alive> -->
        <keep-alive :include="includes">
            <router-view />
        </keep-alive>

        <!-- 方式二 -->
        <!-- <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view> -->

        <!-- 方式三 第三方插件实现 -->
        <!-- <navigation>
            <router-view></router-view>
        </navigation> -->
        <!-- 方式四 统一的store进行管理 -->
    </div>
</template>
<script>
    // import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                includes: []
            }
        },
        computed: {
            // ...mapGetters([
            //     'includes'
            // ])
        },
        watch: {
            $route() {
                this.includes = this.$store.state.includes;
            }
        },
        created() {

        },
    }
</script>
<style lang="less">
    // #app {
    //   font-family: 'Avenir', Helvetica, Arial, sans-serif;
    //   -webkit-font-smoothing: antialiased;
    //   -moz-osx-font-smoothing: grayscale;
    //   text-align: center;
    //   color: #2c3e50;
    // }
    // #nav {
    //   padding: 30px;
    //   a {
    //     font-weight: bold;
    //     color: #2c3e50;
    //     &.router-link-exact-active {
    //       color: #42b983;
    //     }
    //   }
    // }
</style>