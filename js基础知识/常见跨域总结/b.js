// b.js
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
server.listen(8001,'127.0.0.1');