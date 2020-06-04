export interface ItoolbarItem {
  id: number
  name: string
  cnName: string
  icon: string
  note?: string
  element: string
  show: boolean
}
export const toolbarList: ItoolbarItem[] = [
  {
    id: 1,
    name: 'undo',
    cnName: '撤销',
    note: '⌘+Z',
    icon: 'iconundo',
    element: 'clickItem',
    show: true
  },
  {
    id: 2,
    name: 'redo',
    cnName: '还原',
    icon: 'iconredo1',
    element: 'ClickItem',
    show: true
  },
  {
    id: 3,
    name: 'FontName',
    cnName: '字体',
    icon: 'iconredo1',
    element: 'FontNameItem',
    show: true
  },
  {
    id: 4,
    name: 'FontSize',
    cnName: '字体大小',
    icon: 'iconredo1',
    element: 'FontSizeItem',
    show: true
  },
  {
    id: 5,
    name: 'ForeColor',
    cnName: '字体颜色',
    icon: 'font',
    element: 'ColorItem',
    show: true
  }
]
// 禁止点击的列表
export const disabledList = [1]
