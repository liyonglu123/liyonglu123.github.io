### 优化内容

```
    webpack <= 4带有许多node.js核心模块的polyfill，5去掉了这些模块，专注于与前端兼容的模块。
    优化了打包后的文件大小
    长期缓存（默认开启）
    自定义json解析器
    优化后的tree shakking (可以针对嵌套的模块进行分析，未使用将在生产模式删除)
    splitChunk和模块大小(可以针对js和css样式进行更细致的切割，并用于minSize和maxSize)
    模块命名
```

### 相关链接

1.  [webpack5 更新日志](https://github.com/webpack/changelog-v5)
2.  [webpack5 新特性](https://juejin.im/post/6882663278712094727)
3.  [webpack5 官网特性](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)
