<template>
  <div class="hello">
    {{ randomArr }}
    {{ urlParse }}
    {{HtmlTransform}}
    <br/>
    {{getMaxOrMinNum}}
    <br/>
    {{ getRandom }}
    <vue-q-art :config="config" height="200" width="200"></vue-q-art>
  </div>
</template>

<script>
import { randomSort , parseURL, HtmlEscape , getMaxOrMinNum, getRandom} from '@/utils/index'
import VueQArt from 'vue-qart'
export default {
  name: 'HelloWorld',
  data () {
    return {
      // 二维码的配置
      config: {
            value: 'https://www.baidu.com',
            imagePath: require('@/assets/logo.png'),
            filter: 'color',
            size: 500
      },
      arr: [1,2,3,4,5,6,7,8,9],
      url: 'http://localhost/Api/Public/yanglao/index.php?service=User.PostServicePayment&elder_id=17&user_id=1592&pay_points=1&pay_money=0&charge_ids=1&charge_ids=2  '
    }
  },
  computed:{
    // s
    randomArr(){
      return this.arr.sort(randomSort);
    },
    urlParse(){
      return parseURL(this.url)
    },
    HtmlTransform(){
      return HtmlEscape("<p class=\"greeting\">你是我的眼</p>")
    },
    // 获取最值
    getMaxOrMinNum(){
      var values = [1,2,3,4,5,6],
          tag = "min";
      return getMaxOrMinNum(values, tag )
    },
    // 获取随机数
    getRandom(){
      return getRandom(1, 10);
    }
  },
  // 组件
 components: {
      VueQArt
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
