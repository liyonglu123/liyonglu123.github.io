<template>
  <div class="rich-editor-container" v-editor></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import EChart from '@/components/EChart/index.vue'
@Component({
  name: 'Chart',
  components: {
    // EChart
  }
})
export default class RichEditor extends Vue {
  //   mounted() {
  //     window.tinymce.init({
  //       selector: '#container',
  //       toolbar: [], // 这里就可以使用自定义的toolbar了
  //       menubar: [],
  //       contextmenu: false,
  //       inline: true
  //       // plugins: "table",
  //       //     toolbar:
  //       //       "code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
  //       // styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
  //       // table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs",
  //     })
  //   }
}
</script>

<style lang="scss" scoped>
.rich-editor-container {
  min-height: 100px;
}
</style>
