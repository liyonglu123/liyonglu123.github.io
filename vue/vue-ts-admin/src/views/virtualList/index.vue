<template>
  <div class="list">
    <div class="menu-container">
      <span>目录</span>
      <div class="menu-wrapper">
        <div
          class="menu-item"
          :class="currentIndex === index ? 'current-item' : ''"
          v-for="(item, index) in dataList"
          :key="index"
          @click="clickHandler(item, index)"
        >
          {{ index + 1 }}
        </div>
      </div>
    </div>

    <div class="list-wrapper">
      <span>虚拟列表</span>
      <virtual-list :data="dataList" :estimatedItemSize="100"></virtual-list>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import VirtualList from '@/components/VirtualList1/index.vue'
@Component({
  name: 'List',
  components: {
    VirtualList
  }
})
export default class List extends Vue {
  dataList: any[] = []
  currentIndex: number = -1
  // 设置当前选中的元素
  @Mutation setCurrentIndex!: Function
  created() {
    for (let i = 0; i < 1000; i += 1) {
      this.dataList.push(i)
    }
  }
  itemSizeGetterHandler(item, index) {
    console.log(item, index)
    this.$nextTick(() => {
      const targetItem = document.querySelector(`#item-${index}`)
      if (targetItem) {
        console.log('targetItem', (targetItem as HTMLDivElement).offsetHeight)
        // return (targetItem as HTMLDivElement).offsetHeight
        return (targetItem as HTMLDivElement).offsetHeight
      }
      return 0
    })
  }
  clickHandler(item, index) {
    console.log(item, index)
    this.currentIndex = index
    this.setCurrentIndex(index)
    // setTimeout(() => {
    //   const ele = document.querySelector(`.item-${index}`)
    //   ele.scrollIntoView({ block: 'center' })
    // }, 2000)
    this.$nextTick(() => {
      const ele = document.querySelector(`.item-${index}`)
      ele!.scrollIntoView({ block: 'center' })
    })
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  float: left;
  .menu-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 250px;
    height: 600px;
    overflow: auto;
  }
  .menu-item {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #ccc;
    background: #fff;
    margin: 10px;
  }
  .current-item {
    background: #4b59d8;
  }
}
</style>
