<template>
  <div class="home">
    <count-to @on-click="handleClick" ref="counter" :end="10000"></count-to>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component } from 'vue-property-decorator'
import CountTo from '../components/CountTo'
@Component({
  name: 'Home',
  components: {
    CountTo
  }
})
export default class Home extends Vue {
  protected timer!: number
  protected mounted() {
    this.timer = setInterval(() => {
      ;(this.$refs.counter as CountTo).update(Math.random() * 10000)
    }, 2000)
  }
  protected destroyed() {
    clearInterval(this.timer)
  }
  public handleClick(event) {
    console.log(event)
  }
}
</script>
