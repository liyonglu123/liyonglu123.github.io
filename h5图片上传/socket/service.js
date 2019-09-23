var http = require('http');
var fs = require('fs');
var url = require('url');
var net = require('net');

var server = http.createServer(function (req, res) {

    var path = url.parse(req.url).pathname;

    if (path === '/') {
        //不是ajax接口，直接返回前端的html内容
        var indexStr = fs.readFileSync('index.html');
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.end(indexStr);
    }


}).listen(3000);
//将server对象托管给socket.io
var io = require('socket.io')(server);
//监听connection事件
io.on('connection', function (socket) {
    //5分熟的时候更新下状态
    setTimeout(function () {
        //fire一个pencent事件，这样可以在客户端监听这个事件获取数据
        io.emit('pencent', '当前进度50%');
    }, 3500);
    //这是个需要7秒才能完成的任务
    setTimeout(function () {
        io.emit('pencent', '心好累，7秒后菜才好了。。。');

    }, 7000);

});