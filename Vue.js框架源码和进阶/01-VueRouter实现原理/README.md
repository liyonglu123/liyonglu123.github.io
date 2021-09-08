# Vue Router

1. Vue Router 的基本使用回顾
   - 动态路由，参数等的传递
   - 嵌套路由
   - 编程式导航
2. Hash 模式和 History 模式
   - 客户端的形式
   - Hash 模式带有#，是基于锚点，以及 onhashchange 事件
   - History 模式是基于 HTML5 中的 History API，history.pushState(), 历史发生变化时候触发 popstate() IE10 以后才支持，history.replaceState();刷新页面 404,发布到线上之后需要服务器的支持。
     （nodejs 的配置，ngnix 的配置）
3. 模拟实现自己的 Vue Router
   - 插件、混入、Vue.observable()、插槽、render 函数、运行时和完整版的 Vue
