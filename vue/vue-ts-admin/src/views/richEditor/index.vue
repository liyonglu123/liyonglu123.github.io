<template>
  <div class="editor-container">
    <toolbar></toolbar>
    <div class="rich-editor-wrapper" v-editor></div>
    <hr />
    <h2>tinymce原始demo</h2>
    <!-- <i class="iconfont iconredo1"></i> -->
    <div class="tinymce-wrapper">
      hello tinymce!
    </div>
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
  mounted() {
    /**
     * 1. 工具栏
     * 2. 菜单栏
     * 3. 插件
     * 4. 自定义上面的三种问题等等
     * 5. 如何脱离本身的框子，--- 使用对应的API 实现自定义的editor == 见第一个编辑器
     */
    const tinymce = window.tinymce.init({
      selector: '.tinymce-wrapper',
      height: 400,
      auto_focus: true,
      // language_url: 'langs/zh_CN.js', 无效问题
      // language: 'zh_CN',
      toolbar:
        'fontselect |code link | lists bullist numlist | image | spellchecker | customInsertButton',

      font_formats:
        'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n',
      plugins: 'code advlist lists image spellchecker',
      menubar: false, // 菜单栏
      contextmenu: false,
      // menu: {
      //   happy: { title: 'Happy', items: 'code' }
      // },
      skin: 'oxide-dark',
      content_css: 'dark',
      statusbar: true,
      setup: function(editor) {
        // 自定义button
        editor.ui.registry.addButton('customInsertButton', {
          text: 'my button',
          onAction: function(_) {
            editor.insertContent('I am a button!')
          }
        })
      }
    })
    // tinymce.activeEditor.uploadImages(function(success) {
    //   console.log(tinymce.activeEditor.getContent())
    // })
  }
}
</script>

<style lang="scss" scoped>
.rich-editor-wrapper {
  min-height: 100px;
}
</style>
