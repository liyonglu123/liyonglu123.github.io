#### 常见跨域解决方案
***资源***
-----
node进行代理设置问题
![图片alt](图片地址 ''图片title'')

图片alt就是显示在图片下面的文字，相当于对图片内容的解释。
图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加
[资料](https://juejin.im/post/5dc301a76fb9a04a7b29cdc3)

```javascript
    console.log(111)
```

```flow
st=>start: 开始
op=>operation: My Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
```

---
### 有序列表
1. jsonp跨域
2. iframe+domain
3. ngnix
4. cros
5. postMessage


#### 回答语料库设计思路   至于当我们在a页面发送了一个消息，b页面如何解析并回答，可以有如下几种思路：
1. 通过后端接口实现，即我们可以将a的数据作为参数传递给某个后端接口，让后端来实现返回需要的数据，这种在AI机器人中应用的很广泛。
2. 纯前端实现。前端定义回答的语料库，通过关键词匹配来拿到实现应答，这种一般用于普通的预设问题的回答

### 可插拔式  一对多

