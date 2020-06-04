<template>
  <div class="font-size-wrapper" @click="changeFontSize(item)">
    <span>{{ item.cnName }}</span>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({ name: 'FontSizeItem' })
export default class FontSizeItem extends Vue {
  @Prop(Object) item!: any
  changeFontSize(item) {
    console.log('item', item, item.name)
    window.tinymce.activeEditor.execCommand(this.item.name, false, '20pt')
  }
}
</script>

<style lang="scss" scoped>
</style>
