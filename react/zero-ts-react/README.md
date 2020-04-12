### 从零开始搭建react + ts项目

```
    一：  webpack单独打包问题
        1. webpack4+, webpack-cli 
        2. html-webpack-plugin  html单独打包
        3. babel-loader 引入 支持es6
        4. 打包css css-loader.style-loader, 以及单独打包css  mini-css-extract-plugin
        5. scss 预编译样式loader sass-loader node-sass
        6. 图片资源 url-loader  file-loader 以及打包路径的添加 publicPath:'/'的路径问题
        7. 图标字体的添加
        8. splitChunks 公共模块的添加
        9. webpack-dev-server  热更新
        
    二： 添加react 
        1.  react react-dom 
        2.  @babel/preset-react jsx---> js 
    三： 添加 ts
        1. ts-loader  typescript 
        2. 添加tsconfig.json
        3. 使用第三方库 @types/react @types/react-dom 
        4. @types/node : 识别第三库里面的东西
        

```