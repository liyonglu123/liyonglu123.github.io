# Virtual Dom 的实现原理

## 目标

1. 了解什么是虚拟 DOM， 以及虚拟 DOM 的作用
2. Snabbdom 的基本使用
3. Snabbdom 的源码解析

### 什么是 Virtual DOM

1. 虚拟 dom,是由普通的 JS 对象来描述 DOM 对象；真实 DOM 的成员是很对的创建的成本是很高的。虚拟 dom 开销小。

### 为什么要使用 Virtual DOM

1. 前端开发刀耕火种的时代
2. MVVM 框架解决视图和状态同步的问题
3. 模板引擎可以简化视图操作，没办法跟踪状态
4. 虚拟 DOM 跟踪状态变化

参照: [virtual-dom](https://github.com/Matt-Esch/virtual-dom)

1. 虚拟 DOM 可以维护程序的状态，跟踪上一次的状态
2. 通过比较前后两次状态差异更新真实 DOM

### 虚拟 DOM 的作用

1. 维护视图和状态的关系
2. 复杂视图情况下提升渲染性能
3. 跨平台
   - 浏览器平台渲染 DOM
   - 服务端渲染 SSR（Nuxt.js/Next.js）
   - 原生应用（Weex/React Native）
   - 小程序（mpvue/uni-app）等等

### 虚拟 DOM 库

1. Snabbdom
   - Vue.js2.x 内部使用的虚拟 DOM 就是改造的 Snabbdom
   - 大约 200 SLOC(single line of code)
   - 通过模块可扩展
   - 源码使用 TypeScript 开发
   - 最快的 Virtual DOM 之一
2. virtual-dom

### Snabbdom 的基本使用

1. 安装 parcel（零配置）
2. 配置 script
3. 目录结构

### Snabbdom 文档

1. 看文档的意义
   - 学习任何一个库都要先看文档
   - 通过文档了解库的作用
   - 看文档中提供的例子，自己快速实现一个 demo
   - 通过文档查看看 API 的使用

### Snabbdom 的模块 Module

1. 模块的作用
   - Snabbdom 的核心库并不能处理 DOM 元素的属性、样式、事件等可以通过注册 Snabbdom 默认提供的模块来实现。
   - Snabbdom 中的模块可以扩展 Snabbdom 的功能。
   - Snabbdom 中的模块的实现是通过注册全局的钩子函数来实现的。
2. 官方提供的模块
3. 模块的使用步骤
   - 导入需要的模块
   - init()中注册模块
   - h()函数的第二个参数处使用模块

---

# Snabbdom 源码解析
