// a.js
//依赖一个http模块，相当于java中的import，与C#中的using
var http = require('http');
var fs = require('fs');
var { resolve } = require('path');

//创建一个服务器对象
server = http.createServer(function (req, res) {
//设置请求成功时响应头部的MIME为纯文本
res.writeHeader(200, {"Content-Type": "text/html"});
//向客户端输出字符
let data = fs.readFileSync(resolve(__dirname, './a.html'))
res.end(data);
});
//让服务器监听本地8000端口开始运行
server.listen(8000,'127.0.0.1');
console.log('http://127.0.0.1:8000')