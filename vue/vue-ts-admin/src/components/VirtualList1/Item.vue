<template>
  <li
    :key="item.brandId"
    :style="{ height: `${item.height}px`, 'line-height': `${item.height}px` }"
    ref="node"
  >
    <div>
      <div>{{ item.name }}</div>
    </div>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ResizeObserver from 'resize-observer-polyfill'
@Component({ name: 'Item' })
export default class Item extends Vue {
  @Prop({
    type: Object,
    default() {
      return {}
    },
  })
  item!: {}
  @Prop({ type: Number }) index!: number
  resizeObserver!: ResizeObserver
  mounted() {
    // this.$emit('update-height', {
    //   height: (this.$refs.node as HTMLElement).getBoundingClientRect().height,
    //   index: this.index
    // })
    this.observe()
  }
  observe() {
    // 这里可以使用 resize-observer-polyfill进行兼容性的处理
    this.resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      console.log('index:', this.index, 'height:', entry.contentRect.height)
      this.$emit('update-height', {
        height: entry.contentRect.height,
        index: this.index,
      })
    })
    this.resizeObserver.observe(this.$refs.node as HTMLElement)
  }
  unobserve() {
    this.resizeObserver.unobserve(this.$refs.node as HTMLElement)
  }
  beforeDestroy() {
    this.unobserve()
  }
}
</script>

<style lang="scss" scoped></style>
