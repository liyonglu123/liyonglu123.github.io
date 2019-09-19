<template>
  <div class="home">
    <auto-form :formList="formList" :formData="formData"></auto-form>
     <i-button type="primary" @click="submit">提交</i-button>
  </div>
</template>

<script>
// @ is an alias to /src
import autoForm from '@/components/autoForm/form.vue'

export default {
  name: 'home',
  data() {
      return {
          formList:[
              {
                  type: 'input',
                  label: '姓名',
                  key: 'name',
                  placeholder: '請輸入姓名'
              },
              {
                  type: 'select',
                  label: '城市',
                  key: 'city',
                  options: [],
                  placeholder: '請選擇城市'
              }
          ],
          formData: {
              name: '',
              city: ''
          }
      }
  },
  components: {
    autoForm
  },
  methods: {
      submit() {
          console.log(this.formData);
      }
  }
}
</script>
