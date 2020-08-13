<template>
  <div class="list-view" @scroll="handleScroll">
    <div
      class="list-view-phantom"
      :style="{
        height: contentHeight
      }"
    ></div>
    <div ref="content" class="list-view-content">
      <div
        class="list-view-item"
        v-for="(item, index) in visibleData"
        :key="index"
        :id="'item-' + index"
        :style="{
          height: estimatedItemSize + 'px'
        }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({ name: 'VirtualList' })
export default class VirtualList extends Vue {
  @Prop({ type: Array, required: true }) private data!: []
  @Prop({ type: Number, default: 30 }) private itemHeight!: number
  @Prop({ type: Number }) private estimatedItemSize!: number
  // 动态计算item的高度   https://zhuanlan.zhihu.com/p/34585166
  @Prop() itemSizeGetter!: Function
  visibleData: any[] = []

  //  ResizeObserve Api 动态计算dom 元素的变化问题等等
  get itemSizeGetter1() {
    const that = this
    return function(item, index) {
      // var ro = new ResizeObserver(entries => {
      //   for (let entry of entries) {
      //     const cr = entry.contentRect
      //     console.log('Element:', entry.target)
      //     console.log(`Element size: ${cr.width}px x ${cr.height}px`)
      //     console.log(`Element padding: ${cr.top}px ; ${cr.left}px`)
      //   }
      // })
      // // 观察一个或多个元素
      // ro.observe(eleMybj)
      // return 100
      that.$nextTick(() => {
        const targetItem = document.querySelector(`#item-${index}`)
        if (targetItem) {
          console.log('targetItem', (targetItem as HTMLDivElement).offsetHeight)
          // return (targetItem as HTMLDivElement).offsetHeight
          return (targetItem as HTMLDivElement).offsetHeight
        }
        return that.itemHeight
      })
    }
  }

  // 等元素渲染出来获取真是的高度--
  // get realItemHeight() {}

  get contentHeight() {
    // return this.data.length * this.itemHeight + 'px'
    const { data, itemSizeGetter } = this
    let total = 0
    for (let i = 0, j = data.length; i < j; i++) {
      console.log('fsefd', itemSizeGetter.call(null, data[i], i))
      total += itemSizeGetter.call(null, data[i], i)
    }
    console.log('total--', total)
    return `${total}px`
  }

  mounted() {
    // 可以传入不同的scrollTop的数值去跟新可视区域的数据
    this.updateVisibleData(0)
    // this.$nextTick(() => {
    //   console.log(this.$refs)
    //   const targetItem = document.querySelector(`#item-0`)
    //   console.log('targetItem', targetItem)
    // })
  }

  // 更新可视数据
  updateVisibleData(scrollTop) {
    scrollTop = scrollTop || 0
    const visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight) // 取得可见区域的可见列表项数量
    const start = Math.floor(scrollTop / this.itemHeight) // 取得可见区域的起始数据索引
    const end = start + visibleCount // 取得可见区域的结束数据索引
    this.visibleData = (this.data as any).slice(start, end)
    ;(this.$refs
      .content as HTMLDivElement).style.webkitTransform = `translate3d(0, ${start *
      this.itemHeight}px, 0)` // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）
  }

  handleScroll() {
    const scrollTop = this.$el.scrollTop
    this.updateVisibleData(scrollTop)
  }
}
</script>

<style lang="scss" scoped>
.list-view {
  height: 400px;
  overflow: auto;
  position: relative;
  border: 1px solid #aaa;
}

.list-view-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.list-view-content {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}

.list-view-item {
  padding: 5px;
  color: #666;
  //   line-height: 30px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
</style>
