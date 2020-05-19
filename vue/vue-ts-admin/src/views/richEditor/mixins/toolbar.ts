import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { ItoolbarItem, toolbarList, disabledList } from './toolbar-config'
import { includes } from 'lodash'
@Component({
  name: 'toolBarMixins'
})
export default class ToolbarMixins extends Vue {
  public toolbarList = toolbarList
  public disabledList = disabledList
  @Prop(Object) item!: ItoolbarItem
  @State('isEdit') isEdit
  get disabled() {
    // if (!this.isEdit || this.disabledList.includes(this.item.id)) {
    return !this.isEdit
  }
}
