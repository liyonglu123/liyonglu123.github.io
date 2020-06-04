<template>
  <div class="click-item-wrapper" tabindex="-1" @click="clickItemHandler(item)">
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>{{ item.cnName }}</span>
        <br />
        <span v-if="item.note">{{ item.note }}</span>
      </template>
      <i :class="'iconfont ' + item.icon"></i>
    </a-tooltip>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator'
import { ItoolbarItem } from '../mixins/toolbar-config'
import ToolbarMixins from '../mixins/toolbar'

@Component({ name: 'ClickItem' })
export default class ClickItem extends Mixins(ToolbarMixins) {
  @Prop(Object) item!: any
  clickItemHandler(item) {
    console.log('item', item, item.name)
    // window.tinymce.activeEditor.execCommand(this.item.name, false)
    this.toolsBar[this.item.name] = this.item.name
  }
}
</script>

<style lang="scss" scoped>
.click-item-wrapper {
  cursor: pointer;
}
</style>
