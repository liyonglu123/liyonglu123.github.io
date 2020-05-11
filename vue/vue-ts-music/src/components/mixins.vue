<template>
  <div class="mixins-wrap">
    <button @click="eat">吃</button>
    <button @click="say">说</button>
    <hr />
    <span>宽：{{ width }}, 高： {{ height }}</span>
    <span>面积：{{ area }}</span>
    <button @click="changewidth">改变宽度</button>
    <button @click="addAge">改变高度</button>

    <hr />
    <span>对话框：</span>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import MyMixin from './mixins/common'
@Component
export default class Mixin extends Mixins(MyMixin) {
  created() {
    console.log(this.mixinValue)
    console.log(this.foo)
  }
  changedValue() {
    console.log(888)
  }
}
</script>
