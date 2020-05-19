import { Component, Vue, Prop } from 'vue-property-decorator'
import { ItoolbarItem, toolbarList } from './toolbar-config'
@Component({
  name: 'toolBarMixins'
})
export default class ToolbarMixins extends Vue {
  public toolbarList = toolbarList
  @Prop(Object) item!: ItoolbarItem
}
