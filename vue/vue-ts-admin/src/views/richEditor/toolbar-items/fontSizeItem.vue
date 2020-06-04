<template>
  <div class="font-size-wrapper" @click="changeFontSize(item)">
    <span>{{ item.cnName }}</span>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator'
import ToolbarMixins from '../mixins/toolbar'

@Component({ name: 'FontSizeItem' })
export default class FontSizeItem extends Mixins(ToolbarMixins) {
  @Prop(Object) item!: any
  changeFontSize(item) {
    console.log('item', item, item.name)
    // window.tinymce.activeEditor.execCommand(this.item.name, false, '20pt')
    this.toolsBar[this.item.name] = '20px'
  }
}
</script>

<style lang="scss" scoped>
</style>
