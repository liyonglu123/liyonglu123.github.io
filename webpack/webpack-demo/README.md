### webpack 学习

#### 一 基础： 核心概念

1. 入口 entry

```
1. 单入口
2. 多入口
```

2. 出口 output

```
1. filename, path , [name]
```

3. loader

```
    对莫模块的源代码进行转换， ts-->js; 内联图像--> data url； import 引入css文件
    如何编写loader
```

4. 插件 plugins
5. 模式 mode

#### 二： 进阶，写 loader 和 plugin， webpack 优化等等

#### 三： webpack5 的认识

#### 实现步骤

1.  安装 webpack, webpack-cli
2.  webpack-dev-server -D 热更新

### 项目步骤

1.  build-base-conf
2.  build-multi-entry
3.  build-min-extract-css
4.  build-splitChunks
5.  build-optimization
