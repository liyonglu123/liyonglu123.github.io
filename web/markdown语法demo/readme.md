### markdown 语法
> 引用,我的微信公众号：吴小龙同学
>> 不止于技术分享，每天进步一点点，欢迎微信扫一扫关注。
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

#### 连接:

[百度](http://baidu.com/)
#### 图片:

![图片](https://open.weixin.qq.com/qr/code?username=MrWuXiaolong)

#### 代码块
public class PaintCanvas extends View {
    
    private Paint mPaint;
    // 省略构造方法

    private void init() {       
        mPaint = new Paint();
        mPaint.setAntiAlias(true);        
    }
    @Override
    protected void onDraw(Canvas canvas) {
        canvas.drawCircle(500, 550, 500, mPaint);
    }
}

#### 横线
~~ android:singleLine="true"
### 斜体
*我的微信公众号：吴小龙同学。*
### 加粗
**我的微信公众号：吴小龙同学。**
### 分割线
*** 

>列表
>> 无序列表
* 我的微信公众号：吴小龙同学
* 我的微信公众号：吴小龙同学
* 我的微信公众号：吴小龙同学
>> 有序列表
1. 我的微信公众号：吴小龙同学
2. 我的微信公众号：吴小龙同学
3. 我的微信公众号：吴小龙同学

### 表格
| Header1 | Header2                          |
|---------|----------------------------------|
| item 1  | 1. one<br />2. two<br />3. three |

### 图文混排

**图片默认显示效果：**

![](https://raw.githubusercontent.com/mzlogin/mzlogin.github.io/master/images/posts/markdown/demo.png)

**加以控制后的效果：**

<div align="center"><img width="65" height="75" src="https://raw.githubusercontent.com/mzlogin/mzlogin.github.io/master/images/posts/markdown/demo.png"/></div>

### 表格格式化
| Header1 | Header2 |
|---------|---------|
| a       | a       |
| ab      | ab      |
| abc     | abc     |

### 表情
我和我的小伙伴们都笑了。👇

### 行首缩进
&emsp;&emsp;春天来了，又到了万物复苏的季节。

### 展示数学公式
![](https://latex.codecogs.com/png.latex?%24%24x%3D%5Cfrac%7B-b%5Cpm%5Csqrt%7Bb%5E2-4ac%7D%7D%7B2a%7D%24%24)

### 任务列表
**购物清单**
- [ ] 一次性水杯
- [x] 西瓜
- [ ] 豆浆
- [x] 可口可乐
- [ ] 小茗同学








