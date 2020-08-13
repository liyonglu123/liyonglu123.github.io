<template>
  <div class="list">
    <span>虚拟列表</span>
    <virtual-list :data="dataList" :estimatedItemSize="100"></virtual-list>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import VirtualList from '@/components/VirtualList1/index.vue'
@Component({
  name: 'List',
  components: {
    VirtualList
  }
})
export default class List extends Vue {
  dataList: any[] = []
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
}
</script>

<style lang="scss" scoped>
</style>
