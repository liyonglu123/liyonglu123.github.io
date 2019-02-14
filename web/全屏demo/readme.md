### 全屏的api的处理
```
    1. 浏览器是否支持全屏模式：document.fullscreenEnabled
    2. 使元素进入全屏模式：Element.requestFullscreen()
    3. 退出全屏：document.exitFullscreen()
    4. 检查当前是否有节点处于全屏状态：document.fullscreenElement
    5. 进入全屏/离开全屏，触发事件：document.fullscreenchange
    6. 无法进入全屏时触发: document.fullscreenerror
```