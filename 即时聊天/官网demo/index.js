var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// router
app.get('/',function (req, res) {
    // res.send('<h1>hello world!</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected!');
    socket.on('disconnect', function () {
        console.log('user disconnect');
    });
    socket.on('chat message', function (msg) {
        console.log('message:' + msg);
        io.emit('chat message', msg);  //发送给所有人包括自己
        // socket.broadcast.emit('chat message',msg);
    });
    // 除了自己的其他的人
    // socket.broadcast.emit('hi');
});
http.listen('4000', function () {
    console.log('listen on 4000...');
});
