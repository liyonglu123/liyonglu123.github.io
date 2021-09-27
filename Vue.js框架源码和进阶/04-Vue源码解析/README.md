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

7. vue 初始化过程分析

8. 数据响应式原理

- 处理入口
- Observer
- defineReactive
- 依赖收集
- 数组
- Watcher 类， 分为三种： Computed Watcher, 用户 Watcher（侦听器），渲染 Watcher， 以及各自的执行时机

9. 动态添加一个响应式属性（不能是 Vue 实例以及\$data）
10. Vue 静态方法，set,delete,nextTick, 以及实例上的属性和方法
11. 三种类型的 Watcher 对象

    - 没有静态方法，因为\$watch 方法中要使用 Vue 的实例
    - Watcher 分为三种： 计算属性 Watcher， 用户 Watcher（监听器），渲染 Watcher
      - 创建和执行顺序为 计算属性 Watcher， 用户 Watcher（监听器），渲染 Watcher
    - vm.\$watch()

12. 异步更新队列-nextTick()
    - Vue 更新 DOM 是异步执行的，批量的
    - 在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的 DOM
    - vm.\$nextTick(function(){/_操作 DOM_/) / Vue.nextTick(function(){})

---

## 虚拟 DOM

1. 定义
   - 虚拟 DOM 是使用 JavaScript 对象描述真实的 DOM
   - Vue.js 中的虚拟 DOM 借鉴了 Snabbdom, 并添加了 Vue.js 的特性
     - 例如： 指令和组件机制
2. 为什么使用虚拟 DOM
   - 避免直接操作 DOM， 提高开发效率
   - 作为一个中间层可以跨平台
   - 虚拟 DOM 不一定可以提高性能
     - 首次渲染的时候会增加开销
     - 复杂视图情况下提升渲染性能
3. h 函数

```javascript
vm.$createElement(tag, data, children, normalizeChildren);
// tag 标签名称或者组件对象
// data 描述tag，可以设置DOM的属性或者标签的属性
// children tag中文本内容或者子节点
```

4. VNode 的核心属性

   - tag
   - data
   - children
   - text
   - elm
   - key

5. diff 算法

---

## 模板编译

1. 模板编译作用和渲染函数

   - Vue2.x 使用 VNode 描述视图以及各种交互，用户自己编写 VNode 比较复杂
   - 用户只需要编写类似 HTML 的代码- Vue.js 模板，通过编译器将模板转化为返回 VNode 的 render 函数
   - .vue 文件会被 webpack 在构建的过程中转化为 render 函数， vue-loader
   - 体验模板编译

2. Vue Template Explorer 工具把模板转化成 render 函数

3. 编译函数的入口，过程

4. 什么抽象语法树

   - 抽象语法树简称 AST
   - 使用对象的形式描述树形的代码结构
   - 此处的抽象语法树是用来描述树形结构的 HTML 字符串

5. 为什么要使用抽象语法树
   - 模板字符串转化成 AST 后，可以通过 AST 对模板做优化处理
   - 标记模块中的静态内容，在 patch 的时候直接跳过静态内容
   - 在 patch 的过程中静态内容不需要对比和重新渲染

---

## 组件化

1. 定义
   - 一个 Vue 组件就是一个拥有预定义选项的一个 Vue 实例
   - 一个组件可以组成页面上一个功能完备的区域，组件可以包含脚本，样式，模板
2. 组件的注册方式
   - 全局组件
   - 局部组件
3. 页面首次渲染的过程

```
  Vue 构造函数
  this._init()
  this.$mount()
  mountComponent()
  new Watcher()渲染Watcher
  updateComponent()
  vm._render() -> createElement()
  vm._update

```

4. 组件的注册，创建和 patch
