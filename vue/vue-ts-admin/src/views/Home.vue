<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from '@/components/demo.vue'
import { Vue, Component } from 'vue-property-decorator'
import { loginReq } from '@/api/user'
@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  mounted() {
    // eslint-disable-next-line @typescript-eslint/camelcase
    loginReq({ user_name: 'zhangsan', password: 123 }).then(res => {
      console.log(res.data.code)
    })
  }
}
</script>
