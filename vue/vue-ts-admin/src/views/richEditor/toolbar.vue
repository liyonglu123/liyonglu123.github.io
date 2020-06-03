<template>
  <!-- 如果使用tabindex=-1值时，onfocus与onblur事件仍被启动 -->
  <div class="tool-bar-container" tabindex="-1">
    <div
      class="tool-bar-item mce-tool-bar"
      tabindex="-1"
      v-for="(item, index) in toolbarList"
      :key="index"
      :item="item"
      :is="item.element"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ClickItem, ColorItem, FontNameItem } from './toolbar-items'
import { toolbarList } from './mixins/toolbar-config'
@Component({
  name: 'Toolbar',
  components: {
    ClickItem,
    ColorItem,
    FontNameItem
  }
})
export default class Toolbar extends Vue {
  // TODO： 之后会进行特殊处理
  get toolbarList() {
    return toolbarList
  }
  created() {
    document.addEventListener('editorNodeChange', () => {})
  }
}
</script>

<style lang="scss" scoped>
.tool-bar-container {
  height: 36px;
  line-height: 36px;
  padding: 0 20px;
  background: #ddd;
  display: flex;
  justify-content: center;
  .tool-bar-item {
    cursor: pointer;
  }
}
</style>
