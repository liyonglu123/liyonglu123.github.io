/**
 * 新手引导的实现思路：
 一： 痛点
 1. 新手引导和业务的耦合性太大，修改的比较多，所以提高层级，添加到body中进行实现
 2. 目前存在的问题，可能需要和iframe进行通信
 二： 实现方式
 1. 数据结构
 [{
  className: string
  title: string
  content: string
  targetEle: string
  iframeFlag: boolean
  callback?: Function
 }]
  2. 创建任务队列，实现一步一步的执行，这里需要判断回调函数中是否有iframe 中的引导问题
  3. 开启任务一步一步执行
  问题：
  1. 需要获取对应的步骤对应的节点以及位置等等
  2. 当有iframe的时候如何进行操作的问题
  3. 痛点是如何脱离文档流，从而不影响整体的代码逻辑问题等等，根据json文件进行设置
 */
export default class GuidanceTools {
  steps: IStepItem[]
  length: number
  constructor(list) {
    this.steps = list
    this.length = list.length
  }
  // 合并配置
  private mergeConfig() {}
  // 初始化
  public init() {
    this.createMask()
    this.initDom()
  }
  // 初始化dom
  public initDom() {
    // 获取列表中的第一个元素
    const firstStep = this.steps[0]
    const div = document.createElement('div')
    div.className = firstStep.className
    document.querySelector('.guidance-mask-container')?.appendChild(div)
  }
  // 创建蒙层
  private createMask() {
    const div = document.createElement('div')
    div.className = 'guidance-mask-container'
    div.style.position = 'fixed'
    div.style.top = '0px'
    div.style.bottom = '0px'
    div.style.right = '0px'
    div.style.left = '0px'
    div.style.background = 'rgba(0,0,0,.4)'
    document.body.appendChild(div)
  }
  public addDomToBody() {
    console.log('addDomToBody', this.steps)
  }
}

export interface IStepItem {
  className: string
  title: string
  content: string
  targetEle: string
  imgUrl?: string
  event?: Function
}
