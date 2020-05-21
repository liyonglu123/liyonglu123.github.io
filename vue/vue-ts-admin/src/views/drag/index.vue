<template>
  <div class="drag-container">
    <h5-drag></h5-drag>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import H5Drag from '@/components/H5Drag/list.vue'
@Component({
  name: 'Drag',
  components: {
    H5Drag
  }
})
export default class Drag extends Vue {}
</script>

<style lang="scss" scoped></style>
