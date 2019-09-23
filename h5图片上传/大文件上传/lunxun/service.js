// var http = require('http');
// var fs = require('fs');
// var url = require('url');

// //定义一个菜几分熟的变量，在实际运用中，可能是针对不同请求存储在数据库中的。
// //这边为了简单直接放在全局
// var percent = '0%';

// http.createServer(function (req, res) {

//     var path = url.parse(req.url).pathname;

//     //查看菜几分熟了
//     if (path === '/pencent') {
//         res.end(percent);
//     }
//     //调用的接口点菜
//     if (path === '/api') {
//         percent = '0%';
//         //5分熟的时候更新下状态
//         setTimeout(function () {
//             percent = '50%';

//         }, 3500);

//         //这是个需要7秒才能完成的任务
//         setTimeout(function () {
//             res.end('心好累，7秒后菜才好了。。。');

//         }, 7000);

//     }
//     if (path === '/') {
//         //不是ajax接口，直接返回前端的html内容
//         var indexStr = fs.readFileSync('index.html');
//         res.setHeader('Content-Type', 'text/html; charset=UTF-8');
//         res.end(indexStr);
//     }


// }).listen(3000);
// console.log('Server listening on port 3000');

// 长轮询
var http = require('http');
var fs = require('fs');
var url = require('url');

//定义一个菜几分熟的变量，在实际运用中，可能是针对不同请求存储在数据库中的。
//这边为了简单直接放在全局
var percent = '0%';
var isPencentUpate = false;

http.createServer(function (req, res) {

    var path = url.parse(req.url).pathname;

    //查看菜几分熟了
    if (path === '/pencent') {
        //实际应用中这边最好使用事件机制。否则只是把轮询放到了后端而已。
        var tId = setInterval(function () {
            if (isPencentUpate) {
                isPencentUpate = false;
                clearInterval(tId);
                res.end(percent);
            }

        }, 100);
    }
    //调用的接口点菜
    if (path === '/api') {
        percent = '0%';
        //5分熟的时候更新下状态
        setTimeout(function () {
            isPencentUpate = true;
            percent = '50%';

        }, 3500);

        //这是个需要7秒才能完成的任务
        setTimeout(function () {
            isPencentUpate = true;
            percent = '100%';
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