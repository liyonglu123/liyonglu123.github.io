import { toolbarList } from '@/views/richEditor/mixins/toolbar-config'
/**
 * 自定义toolbar实现响应式数据，并且同一处理编辑器的命令
 */

/**
 * 获取当前编辑器选中区域命令状态
 * @param command
 */
const queryPluginsStatus = (command: string): Boolean | Number =>
  window.tinymce.activeEditor.editorCommands.queryCommandState(command)
/**
 *获取当前编辑器选中区域的值
 * @param command
 */
const queryPluginsValue = (command: string): string =>
  window.tinymce.activeEditor.editorCommands.queryCommandValue(command)

/**
 * 设置编辑器选中取消状态
 * @param command
 * @param value
 */
const setPluginsStatusAndValue = (command: string, value: string): boolean =>
  window.tinymce.activeEditor.execCommand(command, false, value)

const toolsBar: any = {}

toolbarList.forEach((item: any): void => {
  Object.defineProperty(toolsBar, item.name, {
    get() {
      const status = queryPluginsStatus(item.name)
      const value = queryPluginsValue(item.name)
      return {
        status,
        value
      }
    },
    set(value: any) {
      setPluginsStatusAndValue(item.name, value)
    }
  })
})

export { toolsBar }
