<template>
  <div class="h5-drag">
    <div
      class="h5-drag-wrapper aim"
      draggable="true"
      @drag="dragaim"
      @dragstart="dragstartaim"
      @dragenter="dragenteraim"
      @dragover="dragoveraim"
      @drop="dropaim"
      @dragleave="dragleaveaim"
      @dragend="dragendaim"
    ></div>
    <div
      class="h5-drag-wrapper des"
      draggable="true"
      @drag="dragdes"
      @dragstart="dragstartdes"
      @dragenter="dragenterdes"
      @dragover="dragoverdes"
      @drop="dropdes"
      @dragleave="dragleavedes"
      @dragend="dragenddes"
    ></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({ name: 'H5drag' })
export default class H5drag extends Vue {
  /**
   *dragstart：开始拖元素触发
   *dragenter：元素拖进可drop元素（绑定drop事件的元素）时触发
   *dragover：当元素拖动到drop元素上时触发
   *drop：当元素放下到drop元素触发
   *dragleave ：当元素离开drop元素时触发
   *drag：每次元素被拖动时会触发
   *dragend：放开拖动元素时触发
   *完成一次拖放的事件过程是： dragstart –> dragenter –> dragover –> drop –> dragend
   */
  dragaim() {
    // console.log('dragaim')
  }
  dragstartaim() {
    console.log('dragstartaim')
  }
  dragenteraim() {
    console.log('dragenteraim')
  }
  dragoveraim() {
    console.log('dragoveraim')
  }
  dropaim() {
    console.log('dropaim')
  }
  dragleaveaim() {
    console.log('dragleaveaim')
  }
  dragendaim() {
    console.log('dragendaim')
  }

  dragdes() {
    // console.log('dragdes')
  }
  dragstartdes() {
    console.log('dragstartdes')
  }
  dragenterdes() {
    console.log('dragenterdes')
  }
  dragoverdes() {
    console.log('dragoverdes')
  }
  dropdes() {
    console.log('dropdes')
  }
  dragleavedes() {
    console.log('dragleavedes')
  }
  dragenddes() {
    console.log('dragenddes')
  }
}
</script>

<style lang="scss" scoped>
.h5-drag-wrapper {
  width: 100px;
  height: 100px;
  &.aim {
    background: red;
  }
  &.des {
    background: blue;
  }
}
</style>
