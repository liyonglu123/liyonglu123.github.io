# 有限状态机

- 每个状态都是一个机器
  - 在每一个机器里，我们可以做计算，存储，输出...
  - 所有的这些机器接受的输入是一致的
  - 状态机的每一个机器本身没有状态，如果用函数表示的话，它应该是一个无副作用的纯函数
- 每一个机器知道下一个状态
  - 每个机器都有确定的下一个状态（Moore）
  - 每个机器根据输入决定下一个状态（Mealy）

---

# JS 中的有限状态机（Mealy）

```javascript
// 每个函数都是一个状态
function state(input) {
  // 函数的参数就是输入
  // 在函数中可以自由的编写代码，处理每一个状态的逻辑
  // 返回值作为下一个状态
  return next;
}

// 下面是调用
while (input) {
  // 获取输入
  // 把状态机的返回值作为下一个状态
  state = state(input);
}
```

---

# 使用有限状态机处理字符串

1. 在一个字符串中，找到字符串"a"
2. 在一个字符串中，找到字符串“ab”
3. 在一个字符串中，找到字符串“abcdef”
4. 使用状态机，在一个字符串中，找到字符串“abcdef”
5. 使用状态机，在一个字符串中，找到字符串“abcabx”
6. 使用状态机，在一个字符串中，找到字符串“abababx” (作业)
7. 拓展: 如何使用状态机处理完全未知的 pattern？可以参考：[字符串 KMP 算法](http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html)

---

# HTTP 请求 | HTTP 的协议解析

1. ISO-OSI 七层网络模型
2. TCP 和 IP 的基础知识
3. HTTP
   - Request
   - Response
4. 搭建服务端环境 node.js
5. 了解 HTTP 的协议
6. 实现一个 HTTP 请求
