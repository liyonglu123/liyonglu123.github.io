<template>
  <div class="count-up-wrap">
    <span :id="eleId"></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import CountUp from 'countup'
@Component({
  name: 'CountUp'
})
export default class CountTo extends Vue {
  @Prop({ type: Number, default: 0 }) public readonly start!: number
  @Prop(Number) public readonly end!: number
  public counter
  public get eleId() {
    return `count_to_${(this as any)._uid}`
  }
  protected mounted() {
    console.log(CountUp)
    this.counter = new CountUp(this.eleId, this.start, this.end, 0, 1, {}) // 创建CountUp实例，并保存在counter上
    this.counter.start() // 调用此方法让动画效果开始
  }
  public update(endVal: number): void {
    this.counter.update(endVal)
  }
}
</script>

<style lang="scss" scoped></style>
