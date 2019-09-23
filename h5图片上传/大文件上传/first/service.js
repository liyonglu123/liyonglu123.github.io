var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    var path = url.parse(req.url).pathname;
    if (path === '/api') {
        //调用的接口点菜
        //这是个需要7秒才能完成的任务
        setTimeout(function () {
            
            res.end('心好累，7秒后菜才好了。。。');

        }, 7000);

    }
    if (path === '/') {
        //不是ajax接口，直接返回前端的html内容
        var indexStr = fs.readFileSync('index.html');
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.end(indexStr);
    }


}).listen(3000);
console.log('Server listening on port 3000');