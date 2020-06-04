import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { ItoolbarItem, toolbarList, disabledList } from './toolbar-config'
import { toolsBar } from '@/utils/toolsbar'
import { ToolsBarData, UndoManagerStatus } from '@/types/tools-bar'

import { includes, find } from 'lodash'
@Component({
  name: 'toolBarMixins'
})
export default class ToolbarMixins extends Vue {
  public toolbarList = toolbarList
  public disabledList = disabledList
  @Prop(Object) item!: ItoolbarItem
  @Prop(Array) toolsBarData!: ToolsBarData[]

  @State('isEdit') isEdit
  toolsBar = toolsBar
  get disabled() {
    // if (!this.isEdit || this.disabledList.includes(this.item.id)) {
    return !this.isEdit
  }
  get currentToolsData() {
    return (
      find(this.toolsBarData, item => item.id === this.item.id) || {
        id: this.item.id,
        status: false,
        value: ''
      }
    )
  }
}
