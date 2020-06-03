/**
 * 编辑器指令
 */
// 自定义事件 通知工具栏
const editorBlur = new Event('editorBlur')
const editorNodeChange = new Event('editorNodeChange')
export default {
  name: 'editor',
  async bind(el: any, binding: any, vnode: any) {
    // format用法 说明
    // const {
    //   onChange,
    //   readonly,
    //   format,
    //   maxlength = 0,
    //   autoFocus
    // } = binding.value
    const initEditor = async () => {
      const editor = window.tinymce.init({
        target: el,
        auto_focus: true,
        inline: true,
        theme: 'silver',
        plugins: ['table', 'image', 'searchreplace', 'paste', 'lists'],
        toolbar: [],
        menubar: [],
        contextmenu: false,
        setup: editor => {
          // 失去焦点的时候
          editor.on('blur', () => {
            vnode.context.isEdit = false
            vnode.context.$store.commit('updateElementStatus', false)
            document.dispatchEvent(editorBlur)
          })
          editor.on('nodechange', () => {
            document.dispatchEvent(editorNodeChange)
          })
        }
      })
      vnode.context.isEdit = true
      vnode.context.$store.commit('updateElementStatus', true)
      // // 失去焦点的时候
      // editor.on('blur', () => {
      //   vnode.context.isEdit = false
      //   vnode.context.$store.commit('updateElementStatus', false)
      //   document.dispatchEvent(editorBlur)
      // })
    }
    // 绑定点击事件
    el.addEventListener('click', initEditor)
  }
}
