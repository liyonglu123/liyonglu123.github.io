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
import {
  ClickItem,
  ColorItem,
  FontNameItem,
  FontSizeItem
} from './toolbar-items'
import { toolbarList } from './mixins/toolbar-config'
import { toolsBar } from '@/utils/toolsbar'
import { ToolsBarData, UndoManagerStatus } from '@/types/tools-bar'

import { findIndex } from 'lodash'
@Component({
  name: 'Toolbar',
  components: {
    ClickItem,
    ColorItem,
    FontNameItem,
    FontSizeItem
  }
})
export default class Toolbar extends Vue {
  toolsBarData: ToolsBarData[] = []
  // TODO： 之后会进行特殊处理
  get toolbarList() {
    return toolbarList
  }
  created() {
    document.addEventListener('editorNodeChange', () => {
      this.querySelectionStyle()
    })
  }
  // 获取选区的样式
  querySelectionStyle() {
    this.toolbarList.forEach(item => {
      const data: ToolsBarData = Object.assign(toolsBar[item.name], {
        id: item.id
      })
      const index = findIndex(
        this.toolsBarData,
        toolsBarItem => toolsBarItem.id === item.id
      )
      if (index !== -1) {
        this.toolsBarData.splice(index, 1, data)
      } else {
        this.toolsBarData.push(data)
      }
    })
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
