<template>
  <div class="hello">
    <span>{{ name }}</span>
    <button @click="hello">hello</button>
    <input v-model="fullName" />
    <Other />
    <my-mixins @add-age="addAgeClick" name="张三" :age="10" sex="男" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from 'vue-property-decorator'
import Other from './other.vue'
import MyMixins from './mixins.vue'

// import { Log } from '../decorators'
// 命名尽量大写和文件名称保持一致
// https://vuejs.org/v2/api/#Options-Data 所有的options
// options 基本可以当作 export default 使用, 但是尽量使用class 进行编写
@Component({
  name: 'ChildComponent',
  props: {
    propA: {
      type: Number,
      default: 0
    }
  },
  components: {
    Other,
    MyMixins
  }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string
  // eslint-disable-next-line
  @Provide() foo = 'foo-provide666'
  // 数据
  name = 'vue'
  firstName = 'li'
  lastName = 'yong'
  //方法
  // @Log
  hello() {
    console.log('hello')
  }
  // 计算属性
  get fullName() {
    return `${this.firstName}-${this.lastName}`
  }
  set fullName(value) {
    this.firstName = 'zhang'
    console.log('set')
  }
  // 生命周期
  mounted() {
    console.log('mounted!')
  }
  addAgeClick(val: number) {
    console.log(val)
  }
  // rennder 报错无效
  // render() {
  //   return <div>hello world</div>
  // }
  // 无效
  // beforeRouterEnter(to: any, from: any, next: any) {
  //   console.log('beforeRouteEnter')
  //   next()
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
