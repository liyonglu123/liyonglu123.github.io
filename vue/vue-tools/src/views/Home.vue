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
                  placeholder: '请输入姓名'
              },
                {
                  type: 'input',
                  label: '性别',
                  key: 'sex',
                  placeholder: '请输入姓名'
              },
                {
                  type: 'input',
                  label: '地址',
                  key: 'adderss',
                  placeholder: '请输入姓名'
              },
              {
                  type: 'select',
                  label: '城市',
                  key: 'city',
                  options: [{
                      title: "北京",
                      value: 'beijing'
                  },
                  {
                      title: "上海",
                      value: 'shanghai'
                  }],
                  placeholder: '请选择城市'
              }
          ],
          formData: {
              name: '',
              adderss: '',
              sex: '',
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
