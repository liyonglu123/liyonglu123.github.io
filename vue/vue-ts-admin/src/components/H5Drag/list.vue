<template>
  <div class="drag-list-container">
    <div
      class="drag-item"
      :class="'drag-item-' + index"
      draggable="true"
      v-for="(item, index) in dragList"
      :key="index"
      @dragstart="dragstart($event, item, index)"
      @dragend="dragend($event, item, index)"
      @dragover="dragover($event, item, index)"
      @drop="drop($event, item, index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts">
interface IdragItem {
  name: string
}
import { Vue, Component } from 'vue-property-decorator'
import { forEach } from 'lodash'
@Component({ name: 'DragList' })
export default class DragList extends Vue {
  public dragList: IdragItem[] = []
  protected list: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  protected dragItemIndex?: number
  protected dragItem?: object

  mounted() {
    this.setDragList()
  }
  setDragList() {
    forEach(this.list, item => {
      this.dragList.push({
        name: `第${item}个`
      })
    })
  }
  swapItem(fromIndex: number, toIndex: number) {
    console.log(fromIndex, toIndex)
    const toItem = this.dragList[toIndex]
    this.$set(this.dragList, toIndex, this.dragItem)
    this.$set(this.dragList, fromIndex, toItem)
    console.log(this.dragList)
  }
  dragstart(event: DragEvent, item: IdragItem, index: number) {
    this.dragItem = item
    this.dragItemIndex = index
  }
  dragend(event: DragEvent, item: IdragItem, index: number) {
    console.log('dragend', item, index)
  }
  dragover(event: DragEvent, item: IdragItem, index: number) {
    event.preventDefault()
  }
  drop(event: DragEvent, item: IdragItem, index: number) {
    console.log('drop', item, index)
    // if (this.dragItemIndex) {
    this.swapItem(this.dragItemIndex as number, index)
    // }
  }
}
</script>

<style lang="scss" scoped>
.drag-list-container {
  display: flex;
  width: 400px;
  flex-wrap: wrap;
  justify-content: center;
  .drag-item {
    width: 100px;
    height: 100px;
    line-height: 100px;
    background: rgb(223, 194, 194);
    margin: 10px;
    text-align: center;
  }
}
</style>
