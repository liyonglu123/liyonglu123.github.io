<template>
  <div class="tool-bar-container">
    <div
      class="tool-bar-item mce-tool-bar"
      v-for="(item, index) in toolbarList"
      :key="index"
      @click="toolsBarClick(item)"
    >
      <span>{{ item.cnName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import ToolbarMixins from './mixins/toolbar'
@Component({ name: 'Toolbar' })
export default class Toolbar extends Mixins(ToolbarMixins) {
  toolsBarClick(item) {
    if (window.tinymce && window.tinymce.activeEditor) {
      window.tinymce.activeEditor.execCommand(item.name, false, 'red')
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-bar-container {
  height: 36px;
  line-height: 36px;
  padding: 0 20px;
  background: #bec8c8;
  display: flex;
  justify-content: center;
  .tool-bar-item {
    cursor: pointer;
  }
}
</style>
