import Vue from 'vue'
import editor from './editor.directive'
const directiveList = [editor]

directiveList.forEach(item => {
  Vue.directive(item.name, item)
})
