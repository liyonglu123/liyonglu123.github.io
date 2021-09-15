# Vue 源码解析

## 目标

1. Vue.js 的静态成员和实例初始化过程
2. 首次渲染的过程
3. 数据响应式原理

## 准备工作

1. Vue 源码的获取

- fork 一份到自己的仓库，克隆到本地，可以自己写注释提交到 GitHub
- 为什么分析 Vue2.6
  - 目前位置 Vue3.0 的正式版还没有发布
  - 新版本发布后，现有的项目不会升级到 3.0，2.x 还有很长一段过渡时间
  - 3.0 的项目地址 vue-next

2. 分析源码目录结构
3. 了解 Flow, ts, 静态类型检查

4. 执行打包 Rollup 过程，以及调试
5. Vue 的不同构建版本 npm run build

|                          |        UMD         |       CommonJS        |     ES Module      |
| :----------------------: | :----------------: | :-------------------: | :----------------: |
|           Full           |       vue.js       |     vue.common.js     |     vue.esm.js     |
|       Runtime-only       |   vue.runtime.js   | vue.runtime.common.js | vue.runtime.esm.js |
|     Full(production)     |     vue.min.js     |                       |                    |
| Runtime-only(production) | vue.runtime.min.js |                       |                    |

- 完整版：同时包含编译器和运行时的版本
- 编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码，体积大，效率低
- 运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码，体积小、效率高。基本上就是除去编译器的代码
- UMD： UMD 版本通用的模块版本，支持多种模块方式。vue.js 默认文件就是运行时+编译器的 UMD 版本
- CommonJS(cjs): CommonJS 版本用来配合老的打包工具比如 Browserify 或者 wepack1
- ES Module: 从 2.6 开始 Vue 会提供两个 ES Module（ESM）构建文件，为现代打包工具提供的版本。 vue-cli 默认使用的

  - ESM 格式被设计为可以被静态分析，所以打包工具可以利用这一点来进行“tree-shaking”并将用不到的代码排除出
    最终的包。
  - ES6 模块和 CommonJS 模块的差异

6. 寻找入口文件

- el 不能是 body 或者 HTML 标签
- 如果没有 render，把 template 转换成 render 函数
- 如果有 render 方法，直接调用 mount 挂载 DOM
