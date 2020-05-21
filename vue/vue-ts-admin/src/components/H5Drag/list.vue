<template>
  <div class="drag-list-container">
    <div
      class="drag-item"
      draggable="true"
      v-for="(item, index) in dragList"
      :key="index"
      @dragstart="dragstart($event)"
      @dragend="dragend($event)"
      @dragover="dragover($event)"
      @drop="drop($event)"
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
  dragstart(event) {
    console.log()
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
