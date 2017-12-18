var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello express123');
});

app.listen(4000,function(){
    console.log('服务器运行于4000端口！');
})
// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// });