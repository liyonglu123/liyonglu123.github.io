# composition api

1. setup, reactive, mounted
2. 生命周期钩子函数, useMousePosition 的封装
3. 对象解构，reactive-toRefs-ref, ref 把基本类型转化为响应式的
   - reactive： 把对象转化为代理对象,响应式对象
   - toRefs： 把对象的属性转化为响应式对象，可以进行解构操作
   - ref： 把基本数据类型转化为代理对象
4. Computed: 创建响应式数据
   - 第一种用法
     - computed(()=> count.value++)
   - 第二种用法
5. Watch
   - Watch 的三个参数
     - 第一个参数: 要监听的数据
     - 第二个参数： 监听到数据变化后执行的函数，这个函数有两个参数分别是新值和旧值
     - 第三个参数: 选项对象， deep 和 immediate
   - Watch 的返回值
     - 取消监听的函数
6. WatchEffect
   - 是 Watch 函数的简化版本，也用来监听数据的变化
   - 接收一个函数作为参数，监听函数内响应式数据的变化

## ToDoList 功能列表

1. 添加待办事项
2. 删除待办事项
3. 编辑待办事项
4. 切换待办事项
5. 存储待办事项
