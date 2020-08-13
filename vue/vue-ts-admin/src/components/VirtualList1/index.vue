<template>
  <div class="list-container">
    <input type="text" v-model.number="dataLength" />条 Height:{{
      scrollBarHeight
    }}
    <div
      class="virtual-scroller"
      @scroll="onScroll"
      :style="{ height: 600 + 'px' }"
    >
      <div class="phantom" :style="{ height: scrollBarHeight + 'px' }">
        <ul :style="{ transform: `translate3d(0,${scrollTop}px,0)` }">
          <Item
            v-for="item in visibleList"
            :item="item"
            :index="item.index"
            :key="item.brandId"
            @update-height="updateItemHeight"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from 'vue-property-decorator'
import Item from './Item.vue'
@Component({
  name: 'VirtualList',
  components: {
    Item
  }
})
export default class VirtualList extends Vue {
  public estimatedItemHeight: number = 30
  public visibleCount: number = 10
  public dataLength: number = 200
  public startIndex: number = 0
  public endIndex: number = 10
  public scrollTop: number = 0
  public scrollBarHeight: number = 0
  // 缓冲元素个数
  public bufferItemCount: number = 4
  public dataList: any[] = []
  public itemHeightCache: any[] = []
  public itemTopCache: any[] = []

  get visibleList() {
    return this.dataList.slice(
      this.startIndex,
      this.endIndex + this.bufferItemCount
    )
  }

  @Watch('dataList')
  dataListChanged() {
    console.time('rerender')
    setTimeout(() => {
      console.timeEnd('rerender')
    }, 0)
  }
  created() {
    this.dataList = this.getDataList()
    this.generateEstimatedItemData()
  }
  mounted() {}

  getDataList() {
    const newDataList = [...Array(this.dataLength || 0).keys()].map((v, i) => ({
      index: i,
      brandId: i + 1,
      name: `第${i + 1}项`,
      height: Math.floor(Math.max(Math.random() * 10, 5)) * 10
      // height: 50
    }))
    return newDataList
  }
  // 获取预估的高度
  generateEstimatedItemData() {
    const estimatedTotalHeight = this.dataList.reduce((pre, current, index) => {
      this.itemHeightCache[index] = this.estimatedItemHeight
      const currentHeight = this.estimatedItemHeight
      this.itemTopCache[index] =
        index === 0
          ? 0
          : this.itemTopCache[index - 1] + this.estimatedItemHeight
      return pre + currentHeight
    }, 0)
    this.scrollBarHeight = estimatedTotalHeight
  }

  // 更新item的高度
  updateItemHeight({ index, height }) {
    this.itemHeightCache[index] = height
    this.scrollBarHeight = this.itemHeightCache.reduce((pre, current) => {
      return pre + current
    }, 0)
    let newItemTopCache = [0]
    for (let i = 1, l = this.itemHeightCache.length; i < l; i++) {
      newItemTopCache[i] =
        this.itemTopCache[i - 1] + this.itemHeightCache[i - 1]
    }
    this.itemTopCache = newItemTopCache
  }
  // 获取startIndex 二分法进行查找
  getStartIndex(scrollTop) {
    // 在heightAccumulateCache中找到一个左侧小于scrollTop但右侧大于scrollTop的位置
    // 复杂度O(n)
    // for (let i = 0; i < this.itemTopCache.length; i++) {
    //   if (this.itemTopCache[i] > scrollTop) {
    //     return i - 1;
    //   }
    // }
    // 复杂度O(logn)
    let arr = this.itemTopCache
    let index = -1
    let left = 0,
      right = arr.length - 1,
      mid = Math.floor((left + right) / 2)
    let circleTimes = 0
    while (right - left > 1) {
      circleTimes++
      // 目标数在左侧
      if (scrollTop < arr[mid]) {
        right = mid
        mid = Math.floor((left + right) / 2)
      } else if (scrollTop > arr[mid]) {
        // 目标数在右侧
        left = mid
        mid = Math.floor((left + right) / 2)
      } else {
        index = mid
        return index
      }
    }
    index = left
    return index
  }
  // 滚动事件
  onScroll(e) {
    const scrollTop = e.target.scrollTop
    console.log('scrollTop', scrollTop)
    let startIndex = this.getStartIndex(scrollTop)
    // 如果是奇数开始，就取其前一位偶数
    if (startIndex % 2 !== 0) {
      this.startIndex = startIndex - 1
    } else {
      this.startIndex = startIndex
    }
    this.endIndex = this.startIndex + this.visibleCount
    this.scrollTop = this.itemTopCache[this.startIndex] || 0
  }
}
</script>

<style lang="scss" scoped>
.virtual-scroller {
  border: solid 1px #eee;
  margin-top: 10px;
  height: 600px;
  overflow: auto;
}

.phantom {
  overflow: hidden;
}

ul {
  background: #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    outline: solid 1px #fff;
    &:nth-child(2n) {
      background: #fff;
    }
  }
}
</style>
