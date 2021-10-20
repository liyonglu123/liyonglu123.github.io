# 组件化

1. 复用率
2. 架构模式， mvc,mvvm 等等

## 对象和组件

## 一、组件的基本知识 | 组件的基本概念和基本组成部分

1. 对象

   - Properities
   - Methods
   - Inherit

2. 组件

   - Properties
   - Methods
   - Inherit

   - Attribute
   - Config & State
   - Event
   - Lifecycle
   - Children

3. Attribute（特性） vs Properties（从属关系， style）

   - a.href: // https://taobao.com 这个 URL 是 resolve 过的结果
   - a.getAttribute("href) // //taobao.com 跟 HTML 代码中完全一致

   - input： 若 property 没有设置，则结果是 attribute； 若 value 属性已经设置，则 attribute 不变，property 变化，元素上实际的效果是 property 优先

4. Lifecycle
   - 最本质的生命周期
5. Children
   - Content 型 Children
   - Template 型 Children

## 二、组件的基本知识 | 为组件添加 JSX 语法

markup 和 JavaScript 结合使用的问题等等

1. 什么是 Markup 环境
2. 第一种基于我们跟 React 一样的 JSX 建立组件
   - 安装 webpack, webpack-cli
   - 安装 babel, babel-loader,@babel/core, @babel/preset-env 系列
   - 支持 jsx @babel/plugin-transform-react-jsx
3. 第二种是基于 Vue 的标记语言 parser 去建立组件

## 三、组件的基本知识 | JSX 的基本使用方法

## 四、轮播组件一

1. 轮播图初始化

## 五、轮播组件二

1. 自动轮播效果
2. 手动轮播效果 mousedown -> mousemove -> mouseup 以及绑定的对象 document 还是对象本身

## 六、轮播组件三

1. move 中的逻辑
2. up 中的逻辑
