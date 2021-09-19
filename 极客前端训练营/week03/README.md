# 第三周

### 一、排版，根据浏览器属性进行排版

1. 常见排版的介绍

2. flex 排版

```
    flex-direction: row
    Main: width x left right
    Cross: height y top bottom
```

```
    flex-direction: column
    Main: height y top bottom
    Cross: width x left right
```

### 二、排版，收集元素进行(hang)

1. 分行
   - 根据主轴尺寸，把元素分进行
   - 若设置了 no-wrap，则强行分配进第一行

### 三、排版，计算主轴

1. 计算主轴方向
   - 找出所有的 flex 元素
   - 把主轴方向的剩余尺寸按比例分配给这些元素
   - 若剩余空间为负数，所有 flex 元素为 0，等比压缩剩余元素

### 四、排版，计算交叉轴

1. 计算交叉轴方向
   - 根据每一行中最大元素尺寸计算行高
   - 根据行高 flex-align 和 item-align，确定元素具体位置

### 五、渲染，绘制单个元素

1. 真正的浏览器还会有持续的绘制和事件监听
2. 需要装备一个图形环境， nodeJs 没有图形的封装，使用图片代替， 把绘制屏幕到绘制图片
3. 绘制需要依赖一个图形环境
4. 这里采用了 npm 包的 images
5. 绘制在一个 viewport 上
6. 与绘制相关的属性有：background-color,border,background-image,etc, 渐变需要 webGL 进行处理

### 六、渲染，绘制 DOM 树

1. 递归调用子元素的绘制方法，完成 DOM 树的绘制
2. 忽略掉一些不需要绘制的节点
3. 实际浏览器中，文字绘制是难点，需要依赖字体库，把字体变成图片再渲染，这里忽略
4. 实际浏览器中，还会对一些图层做 compositing, 这里忽略

### 遇到的问题以及解决方案

1.  [(node:47343) Warning: N-API is an experimental feature and could change at any time.](https://stackoverflow.com/questions/51453626/warning-n-api-is-an-experimental-feature-and-could-change-at-any-time)

2.  [Problems loading reference 'http://json.schemastore.org/package': Unable to load schema from 'http://json.schemastore.org/package': Not Found. The requested location could not be found. 404 page not found.](https://stackoverflow.com/questions/49056000/all-of-my-json-files-have-problems-loading-reference-schema-from-schemastore-az)

3.  [images 图片没有 save 上](https://stackoverflow.com/questions/43056946/how-take-out-warning-this-is-an-experimental-feature-and-could-change-at-any-t）

4.  注意 server.js 中的字符串拼接问题和正则一一对应
