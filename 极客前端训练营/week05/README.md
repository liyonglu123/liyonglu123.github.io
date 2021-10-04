# 重学 JavaScript 第二周

### 1. 构建语法树

### 2. 根据语法树实现语法分析

    - 广度优先搜索
    - 不需要使用优先状态机表示无限循环，可以使用回环状态
    - 如何巧妙的使用栈进行数据的处理

### 3. JavaScript 执行语法树

    - JavaScript 查看语法标准的定义文档

### 4. JavaScript 运行时

    - Environment
    - EnvironmentRecord
    - Number的定义 （实例：把浮点数拆分成64位bit的小工具，双精度浮点数，可以有效的解释0.1+0.2！=0.3）
    - String的定义
        - 字符集， ASCII，Unicode，UCS，GB，ISO-8859，BIG5，。。。
        - 码点 code point
        - 编码， UTF，UTF-8,UTF-16...
