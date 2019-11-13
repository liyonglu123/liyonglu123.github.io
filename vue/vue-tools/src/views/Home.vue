<template>
  <div class="home">
    <!-- <auto-form :formList="formList" :formData="formData"></auto-form> -->
     <!-- <i-button type="primary" @click="submit">提交</i-button> -->
     <!-- <slide-tab></slide-tab> -->
     <span>{{ ceshi }}</span>
     <span v-html="ceshi"></span>
  </div>
</template>

<script>
// @ is an alias to /src
// import autoForm from '@/components/autoForm/form.vue'
import slideTab from '@/components/slideTab/index.vue'


export default {
  name: 'home',
  data() {
      return {
          ceshi: "",



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
    // autoForm,
    slideTab
  },
  created () {
    // 不识别 \n 换成<br/>, 同时 使用 v-html绑定到dom
    this.ceshi = "ddd<br/>666"
  },
  methods: {
      submit() {
          console.log(this.formData);
      }
  }
}
</script>
