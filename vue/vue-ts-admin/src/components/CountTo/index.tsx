import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import CountUp from 'countup'

@Component({
  name: 'CountUp'
})
export default class CountTo extends Vue {
  @Prop({ type: Number, default: 0 }) public readonly start!: number
  @Prop(Number) public readonly end!: number
  public counter: CountUp = null
  public get eleId() {
    return `count_to_${(this as any)._uid}`
  }
  protected render() {
    return (
      <div class="count-up-wrap" on-click={this.click}>
        <span id={this.eleId}></span>
      </div>
    )
  }
  @Emit('on-click') // 这里的on-click即为自定义事件名
  public click(event) {
    // 这个方法名用于组件内调用
    return event // return的值即为事件回调函数的参数
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
