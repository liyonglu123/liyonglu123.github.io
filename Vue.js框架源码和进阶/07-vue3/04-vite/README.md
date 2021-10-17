# Vite 的原理

## 一、Vite 的概念

1. Vite 是一个面向现代浏览器的一个更轻、更快的 Web 应用开发工具
2. 它基于 ECMAScript 标准原生模块系统（ES Module）实现
3. 它的出现是解决 -- 在 webpack 开发阶段使用 webpack-dev-sereve 冷启动时间过程，热更新 HMR 速度慢

## 二、Vite 项目依赖

1. Vite
2. @vue/compiler-sfc 编译.vue 单文件

## 三、基础使用

1. vite serve 按需编译
2. vite build

## 四、HMR

1. Vite HMR
   - 立即编译当前所修改的文件
2. Webpack HMR
   - 会自动以这个为入口重写 build 一次，所有的涉及到的依赖也会被加载一遍

## 五、Build

1. vite build
   - Rollup
   - Dynamic import
     - Polyfill

## 六、打包或者不打包

1. 使用 Webpack 打包的两个原因
   - 浏览器环境不支持模块化
   - 零散的模块文件会产生大量的 HTTP 请求 ，http2 已经帮我们解决了
2. 浏览器的兼容问题

## 七、开销即用

1. TypeScript - 内置支持
2. less/sass/stylus/postcss - 内置支持（需要单独安装）
3. JSX
4. Web Assembly

## 八、 Vite 特性

1. 快速冷启动
2. 模块热更新
3. 按需编译
4. 开箱即用

---

# Vite 核心功能

1. 静态 Web 服务器
2. 编译单文件组件
   - 拦截浏览器不识别的模块，并处理
3. HMR， 原理不清楚---

## 问题

1. npm link 的问题
