# Fiber

1. 开发环境配置, npm-run-all 同时执行多个命令

2. requestIdleCallback 使用浏览器的空余时间去执行任务

3. Fiber
   - 问题：react16 之前采用递归， stack 的方式处理，当组件数量庞大，主线程被长期占用，会导致用户的一些交互，动画等任务无法得到立即执行，页面产生卡顿，非常影响用户体验
   - 解决方式：
     - 1. 利用浏览器空闲时间执行任务，拒绝长时间占用主线程
     - 2. 放弃递归只采用循环，因为循环可以被中断
     - 3. 任务拆分，将任务拆分成一个个小的任务
   - 实现思路：
     - 在 Fiber 方案中，为了实现任务的终止再继续，DOM 比对算法被分成了两部分
     - 1. 构建 Fiber （可中断）
     - 2. 提交 Commit （不可中断）
     - DOM 初始渲染： virtualDOM -> Fiber -> Fiber[] -> DOM
     - DOM 更新阶段： newFiber vs oldFiber -> Fiber[] -> DOM
   - Fiber 对象
