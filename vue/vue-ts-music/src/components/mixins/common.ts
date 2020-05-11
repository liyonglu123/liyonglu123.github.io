import {
  Component,
  Vue,
  Prop,
  Model,
  Watch,
  Emit,
  Inject
} from 'vue-property-decorator'
@Component
export default class MyMixin extends Vue {
  // propss传递参数
  @Prop(Number) age!: number
  @Prop({ default: 'zhangsan' }) name!: string
  @Prop([String, Boolean]) sex!: string | boolean
  // 自定义model的问题
  @Model('change', { type: Boolean, default: true }) checked!: boolean
  //   model: {
  //       prop: 'checked',
  //       event: 'change'
  //   }
  //   props: {
  //       checked: {
  //           type: Boolean
  //       }
  //   }
  // 监听
  @Watch('width', { immediate: false, deep: false })
  onWidthChange(val: string, oldVal: string) {
    console.log('width changed!', val, oldVal)
  }
  @Emit()
  addAge() {
    // 如果是对象的话需要封装成一个对象进行处理
    return 100
  }
  // 高级特性
  @Inject() foo!: string
  mixinValue = 'mixins'
  width!: number
  height!: number
  // 响应式字段最好在data中赋予初始值
  data() {
    return {
      width: 10,
      height: 10
    }
  }
  // 方法
  eat() {
    console.log('eat')
    const { name, age, sex } = this
    console.log(name, age, sex)
  }
  say() {
    console.log('say')
  }
  changewidth() {
    this.width += 1
  }
  // 计算属性
  get area() {
    console.log(this)
    const { width, height } = this
    return width * height
  }
  // v-model 双向数据绑定的时候
  // set area(value: number) {}
}
