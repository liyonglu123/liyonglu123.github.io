# 响应式系统

## 一、相关定义

1. Proxy 对象实现属性监听
2. 多层属性嵌套，在访问属性过程中处理下一级属性
3. 默认监听动态添加的属性
4. 默认监听属性的删除操作
5. 默认监听数组索引和 length 属性
6. 可以作为单独的模块使用

## 二、核心方法

1. reactive/ref/toRefs/computed
2. effect
3. track
4. trigger

## 三、 Proxy 对象回顾

## 四、 reactive

1. 接收一个参数，判断这参数是否是对象
2. 创建拦截器对象 handler，设置 get/set/deleteProperty
3. 返回 Proxy 对象
4. effect & track & trigger
5. ref, 对象或者是原始类型
6. reactive vs ref
   - ref 可以把基本数据类型，转化成响应式对象
   - ref 返回的对象，重新赋值成对象也是响应式的
   - reactive 返回的对象，重新赋值丢失响应式
   - reactive 返回的对象不可以解构
