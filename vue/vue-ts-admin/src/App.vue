<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
@Component({ name: 'App' })
export default class App extends Vue {
  mounted() {}
}
</script>
<style lang="scss" scoped>
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
