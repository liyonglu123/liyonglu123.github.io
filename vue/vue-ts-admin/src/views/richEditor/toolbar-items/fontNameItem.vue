<template>
  <div class="font-name-item-wrapper" tabindex="-1">
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>{{ item.cnName }}</span>
      </template>
      <a-select
        :default-value="defaultValue"
        style="width: 100px"
        @change="handleChange"
      >
        <a-select-opt-group label="字体列表">
          <template v-for="(item, index) in fontNameList">
            <a-select-option :value="item" :key="item + index">{{
              item
            }}</a-select-option>
          </template>
        </a-select-opt-group>
      </a-select>
    </a-tooltip>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator'
import { ItoolbarItem } from '../mixins/toolbar-config'
import ToolbarMixins from '../mixins/toolbar'

@Component({ name: 'FontNameItem' })
export default class FontNameItem extends Mixins(ToolbarMixins) {
  @Prop(Object) item!: any
  // 字体列表
  fontNameList = [
    '宋体',
    '黑体',
    '微软雅黑',
    '仿宋',
    '楷体',
    'Arail',
    'Times New Roman',
    'courier new'
  ]
  get defaultValue() {
    console.log('value==', this.currentToolsData.value)
    return this.currentToolsData.value || '微软雅黑'
  }
  handleChange(fontName: string) {
    const { name } = this.item
    console.log(`selected ${fontName}`, this.item, name)
    // window.tinymce.activeEditor.execCommand(name, false, fontName)
    this.toolsBar[this.item.name] = fontName
  }
}
</script>

<style lang="scss" scoped>
.click-item-wrapper {
  cursor: pointer;
}
</style>
