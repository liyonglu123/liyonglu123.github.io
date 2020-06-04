export interface ToolsBarData {
  id?: number
  status: boolean
  value: string
}

export interface UndoManagerStatus {
  hasRedo: boolean
  hasUndo: boolean
  globalHasRedo: boolean
  globalHasUndo: boolean
}
