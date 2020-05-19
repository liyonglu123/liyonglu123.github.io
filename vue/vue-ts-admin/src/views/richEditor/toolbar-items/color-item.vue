<template>
  <div
    class="color-item-container"
    :class="{ disabled: disabled }"
    @click="toolsBarClick"
  >
    <span>{{ item.cnName }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import ToolbarMixins from '../mixins/toolbar'
@Component({ name: 'ColorItem' })
export default class ColorItem extends Mixins(ToolbarMixins) {
  toolsBarClick() {
    console.log(this.disabled)
    if (!this.disabled && window.tinymce && window.tinymce.activeEditor) {
      window.tinymce.activeEditor.execCommand(this.item.name, false, 'red')
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  color: #ccc;
  cursor: not-allowed !important;
}
</style>
