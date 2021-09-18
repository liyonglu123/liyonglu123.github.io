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
