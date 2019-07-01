### 从零搭建react的全家桶项目
[https://juejin.im/post/5c9d88ea6fb9a070c6189d69#heading-4]
```
    1. npm init
    2. 安装webpack webpack-cli
    3. webpack.dev.config.js的配置
    4. @babel/core @babel/preset-env @babel/preset-react babel-loader -D 的添加
    5. 接入react
    6. 打包命令的优化
    7. react-router --- cnpm install react-router-dom -S
    8. 优化
    9. redux react-redux
    10. html-webpack-plugin
    11. css-loader style-loader   css-loader的版本0.28.11 解决 ValidationError: CSS Loader Invalid Options
    12. postcss-loader postcss-cssnext 对的浏览器前缀
    13. url-loader file-loader 图片和文字
    14. 按需加载 路由和组件 react-loadable 
    15. 添加404路由 
    16. 提取公共代码react,redux,react-router等等这些代码，每次发布都要重新加载，其实没必要，我们可以将他们单独提取出来
    17. 提取css文件 mini-css-extract-plugin
    18. 缓存 刚才我们output输出的时候写入了hash、chunkhash和contenthash，那他们到底有什么用呢？
        hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值
        chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。
        contenthash是针对文件内容级别的，只有你自己模块的内容变了，那么hash值才改变，所以我们可以通过contenthash解决上诉问题
    19. 生产坏境构建  "build": "webpack --config ./build/webpack.prod.config.js",
    20. 文件压缩
    21. 公共块提取 
    22. css压缩 optimize-css-assets-webpack-plugin 
    23. 打包清空 clean-webpack-plugin  const {CleanWebpackPlugin} = require('clean-webpack-plugin');
    24. public path
    25. 数据请求axios和Mock
    26. redux-thunk  Actions must be plain objects. Use custom middleware for async actions.
    27. 部署 express实现部署

```