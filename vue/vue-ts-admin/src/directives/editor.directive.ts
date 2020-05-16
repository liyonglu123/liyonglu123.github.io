/**
 * 编辑器指令
 */
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
      window.tinymce.init({
        target: el,
        inline: true,
        theme: 'silver',
        plugins: ['table', 'image', 'searchreplace', 'paste', 'lists'],
        toolbar: [],
        menubar: [],
        contextmenu: false
      })
    }
    // 绑定点击事件
    el.addEventListener('click', initEditor)
  }
}
