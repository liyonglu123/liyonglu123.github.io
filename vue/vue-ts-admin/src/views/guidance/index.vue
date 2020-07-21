<template>
  <div class="guidance-container">
    Guidance
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import { IStepItem } from '../../types/guidance'
import GuidanceTools from '../../tools/guidance'
@Component({ name: 'Guidance' })
export default class Guidance extends Vue {
  guidanceList: IStepItem[] = [
    {
      className: 'first',
      title: '第一步',
      content: '这是第一步的内容',
      targetEle: '.home',
      event() {
        console.log('这是第一步的回调函数哈！')
      }
    }
  ]
  created() {}
  mounted() {
    this.$nextTick(() => {
      // 这里存在执行顺序的问题以及如何进行实现
      const guidance = document.querySelector('.guidance-container')
      const guidanceStyle = guidance?.getBoundingClientRect()
      const guidanceTools = new GuidanceTools(this.guidanceList).init()
      // console.log('guidanceTools', guidanceTools.addDomToBody)
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
