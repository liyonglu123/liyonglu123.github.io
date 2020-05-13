<template>
  <div class="home">
    <span>home</span>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component } from 'vue-property-decorator'
// import { loginReq } from '@/api/user'
@Component({
  name: 'Home'
})
export default class Home extends Vue {
  mounted() {
    console.log('mounted')
  }
}
</script>
