<template>
  <div class="child-wrap">
    <span>ohter</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Child'
})
export default class extends Vue {}
</script>
<style lang="scss" scoped></style>
