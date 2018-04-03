<template>
  <div>hello {{ name }}</div>
</template>
<script>
export default {
  data(){
      return {
          name: "vue.js"
      }
  }
}
</script>
<style scoped>
  div{
      font-size: 24px;
      color: blue;
  }
</style>

