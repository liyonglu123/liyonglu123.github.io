<template>
  <div class="editor-container">
    <toolbar></toolbar>
    <div class="rich-editor-wrapper" v-editor></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Toolbar from './toolbar.vue'
@Component({
  name: 'Chart',
  components: {
    Toolbar
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
.rich-editor-wrapper {
  min-height: 100px;
}
</style>
