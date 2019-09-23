var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function (req, res) {

    var path = url.parse(req.url).pathname;
    //调用的接口点菜
    // if (path === '/api') {

    //     //5分熟的时候更新下状态
    //     setTimeout(function () {
    //         //提前响应数据
    //         res.write('当前进度50%');
    //     }, 3500);

    //     //这是个需要7秒才能完成的任务
    //     setTimeout(function () {
    //         res.end('心好累，7秒后菜才好了。。。');

    //     }, 7000);

    // }
    //调用的接口点菜
    if (path === '/api') {
        //这边一定要设置为text/html; charset=UTF-8,不然就不会有分段效果
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        //5分熟的时候更新下状态
        setTimeout(function () {
            res.write('<script> top.read("当前进度50%") </script>');
        }, 3500);

        //这是个需要7秒才能完成的任务
        setTimeout(function () {

            res.end('<script> top.read("心好累，7秒后菜才好了。。。") </script>');

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