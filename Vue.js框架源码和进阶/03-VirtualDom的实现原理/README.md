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

## 如何学习源码

1. 宏观了解
2. 带着目标看源码
3. 看源码的过程要不求甚解
4. 调试
5. 参考资料

## Snabbdom 的核心

1. init()设置模块，创建 patch（）函数
2. 使用 h()函数创建 JavaScript 对象（VNode）描述真实 DOM
3. patch（）比较新旧两个 VNode
4. 把变化的内容更新到真实 DOM 树

## 克隆源码目录

1. 可以指定版本 git clone -b v2.1.0 --depth=1 https://github.com/snabbdom/snabbdom.git
2. example 调试

### h 函数介绍

1. 作用： 创建 VNode 对象
2. Vue 中的 h 函数
3. 函数的重载，函数的个数或参数类型不同的函数，js 中没有重载的概念，ts 中有重载，不过重载的实现还是通过代码调整参数

### patch 整体过程分析

1. patch（oldVnode, newVnode）
2. 把新节点中变化的内容渲染到真实的 DOM，最后返回新节点作为下一次处理的旧节点
3. 对比新旧 VNode 是否是相同节点（节点的 key 和 sel 相同）
4. 如果不是相同的节点，删除之前的内容，重新渲染
5. 如果是相同的节点，再判断新的 VNode 是否有 text，如果有并且和 oldVNode 的 text 不同，直接更新文本内容
6. 如果新的 VNode 有 children，判断子节点是否有变化

### Diff 算法

1. 虚拟 DOM 中的 Diff 算法
   - 查找两棵树每一个节点的差异
2. Snabbdom 根据 DOM 的特点对传统的 diff 算法做了优化
   - DOM 操作时候很少会跨级别操作节点
   - 只比较同级别的节点
3. 执行过程，在开始和结束节点比较的时候，总共有四种情况
   - oldStartVNode/ newStartVNode(旧开始节点/新开始节点)
   - oldEndVNode /newEndVNode(旧结束节点/新结束节点)
   - oldStartVNode/ newEndVNode(旧开始节点/新结束节点)
   - oldEndVNode /newStartVNode(旧结束节点/新开始节点)
   - 新老节点有一个先循环完毕
   - 设置 key 的意义 updateChildren 的原理
4. 手写 diff 算法以及实现原理.... 数形结合思想
