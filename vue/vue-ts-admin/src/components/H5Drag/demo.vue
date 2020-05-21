<template>
  <div class="drop-container">
    <div
      class="dropzone"
      @dragover="dragover($event)"
      @dragenter="dragenter($event)"
      @dragleave="dragleave($event)"
      @drop="drop($event)"
    >
      <div
        id="draggable"
        draggable="true"
        @dragstart="dragstart($event)"
        @dragend="dragend($event)"
      >
        This div is draggable
      </div>
    </div>
    <div
      class="dropzone"
      @dragover="dragover($event)"
      @dragenter="dragenter($event)"
      @dragleave="dragleave($event)"
      @drop="drop($event)"
    ></div>
    <span class="span">666</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({ name: 'DemoDrag' })
export default class DemoDrag extends Vue {
  public dragged
  dragstart(ev) {
    console.log(ev)
    ev.dataTransfer.setData('text/plain', null)
    const span = document.querySelector('.span')
    // arg1 必须是一个element元素
    ev.dataTransfer.setDragImage(span, 10, 10)
    // 保持拖拽元素的引用
    this.dragged = ev.target
    ev.target.style.opacity = 0.5
  }
  dragend(ev) {
    ev.target.style.opacity = ''
  }
  dragover(ev) {
    // 阻止默认事件
    ev.preventDefault()
  }
  dragenter(ev) {
    // 当可拖动的元素进入可放置的目标高亮目标节点
    if (ev.target.className == 'dropzone') {
      ev.target.style.background = 'purple'
    }
  }
  dragleave(event) {
    // 当拖动元素离开可放置目标节点，重置其背景
    if (event.target.className == 'dropzone') {
      event.target.style.background = ''
    }
  }
  drop(event) {
    // 阻止默认动作（如打开一些元素的链接）
    event.preventDefault()
    // 移动拖动的元素到所选择的放置目标节点
    if (event.target.className == 'dropzone') {
      event.target.style.background = ''
      this.dragged.parentNode.removeChild(this.dragged)
      event.target.appendChild(this.dragged)
    }
  }
}
</script>

<style lang="scss" scoped>
.dropzone {
  width: 200px;
  height: 20px;
  background: blueviolet;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: content-box;
  #draggable {
    width: 200px;
    height: 20px;
    text-align: center;
    background: white;
  }
}
</style>
