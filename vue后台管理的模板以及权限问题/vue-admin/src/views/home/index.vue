<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
        {{name}}
  </div>
</template>

<script>
import { getUserName } from 'api/user.js'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
export default {
  name: 'App',
  data(){
    return{
      name: ''
    }
  },
  created(){
    this.getName();
  },
  methods:{
    getName(){
      NProgress.start();
      var that = this;
      getUserName().then((res)=>{
        that.name = res.data.data.name;
        NProgress.done();
      })
    }
  }
}
</script>

<style>

</style>
