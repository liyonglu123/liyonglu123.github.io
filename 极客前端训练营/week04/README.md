# 重学 JavaScript 第一周

## 一、JS 语言通识 | 产生式的定义以及写法

1. 思考：如何去定义一门语言
2. 产生式
   - 符号（Symbol）： 定义的语法结构名称
   - 终结符和非终结符：
     - 终结符：不是由其他符号定义的符号，也就是说，它不会出现在产生式左边
     - 非终结符：由其他符号经过“与”，“或”等逻辑组成的符号
   - 语言定义
     - 语言可以由一个非终结符和它的产生式来定义
   - 语法树
     - 把一段具体的语言的文本，根据产生式以树形结构来表示出来
3. 产生式的写法
   - BNF： 巴科斯-诺尔范式
   - EBNF
4. JavaScript 标准
5. 产生式的练习
   - 数学语言四则运算，只允许 10 以内整数的加减乘除
   - 四则运算，允许整数
   - 四则运算，允许小数
   - 四则运算，允许括号

---

## 二、JS 语言通识 | 产生式在语言中的应用

1. 乔姆斯基谱系
   - 3 型 正则文法（Regular）
   - 2 型 上下文无关文法
   - 1 型 上下文相关文法
   - 0 型 无限制文法
2. 词法和语法（统称文法）
   - 词法： 正则文法（3 型）
     - 空白
     - 换行
     - 注释
     - Token
   - 语法： 上下文无关文法（2 型）
     - 语法树 -- 可以去除一些无用的变为 AST，进而 babel 进行解析

---

## 三、Toy-JavaScript | 用产生式定义 JavaScript 词法和语法

1. 定义

```
    InputElement ::= WhiteSpace | LineTerminator | Comment | Token

    WhiteSpace ::= " " | ＂　＂

    LineTerminator ::= "\n" | "\r"

    Comment ::= SingleLineComment | MultiLineComment
    SingleLineComment ::= "/" "/" <any>*
    MultiLineComment ::= "/" "*" ([^*] | "*" [^/])* "*" "/"

    Token ::= Literal(直接量) | Keywords | Identifier | Punctuator
    Literal ::= NumberLiteral | BooleanLiteral | StringLiteral | NullLiteral
    Keywords ::= "if" | "else" | "for" | "function" | ...
    Punctuator ::= "+" | "-" | "*" | "/" | "{" | "}" | ...

```

---

## 四、Toy-JavaScript | JavaScript 词法基本框架

1. 参考- ECMA 规范

---

## 五、Toy-JavaScript | JavaScript 语法基本框架

1. 语法

```
    // 词法
    InputElement ::= WhiteSpace | LineTerminator | Comment | Token

    WhiteSpace ::= " " | ＂　＂

    LineTerminator ::= "\n" | "\r"

    Comment ::= SingleLineComment | MultiLineComment
    SingleLineComment ::= "/" "/" <any>*
    MultiLineComment ::= "/" "*" ([^*] | "*" [^/])* "*" "/"

    Token ::= Literal(直接量) | Keywords | Identifier | Punctuator
    Literal ::= NumberLiteral | BooleanLiteral | StringLiteral | NullLiteral
    Keywords ::= "if" | "else" | "for" | "function" | ...
    Punctuator ::= "+" | "-" | "*" | "/" | "{" | "}" | ...

    // 语法
    Program ::= Statement+
    Statement ::= ExpressionStatement | IfStatement | ForStatement | WhileStatement | VariableDeclaration | FunctionDeclaration | ClassDeclaration | BreakStatement | ContinueStatement |  ReturnStatement | ThrowStatement | TryStatement | Block

    IfStatement ::= "if" "(" Expression ")" Statement

    Block ::= "{" Statement "}"

    TryStatement ::= "try" "{" Statement+ "}"  "catch" "(" Expression ")" "{" Statement+ "}"

    ExpressionStatement ::= Expression ";"

    Expression ::= AdditiveExpression

    AdditiveExpression ::= MultiplicativeExpression | AdditiveExpression ("+" | "-") MultiplicativeExpression

    MultiplicativeExpression ::= UnaryExpression | MultiplicativeExpression ("*" | "/") UnaryExpression

    UnaryExpression ::= PrimaryExpression | ("+" | "-" | "typeof") PrimaryExpression

    PrimaryExpression ::= "(" Expression ")" | Literal | Identifier

```

---

## 六、七、八、Toy-JavaScript | JavaScript 词法和语法代码分析

1. 正则分析
2. 高级正则分析
3. 正则表达式的捕获行为（）

## tips: 编译原理相关知识
