export interface ItoolbarItem {
  id: number
  name: string
  cnName: string
  icon: string
  show: boolean
}
export const toolbarList: ItoolbarItem[] = [
  {
    id: 1,
    name: 'ForeColor',
    cnName: '字体颜色',
    icon: 'font',
    show: true
  }
]
// 禁止点击的列表
export const disabledList = [1]
