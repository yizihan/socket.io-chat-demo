var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// 用户访问的页面调用io()时，默认尝试连接到主机的服务页面，后台可以通过io.on()检测到用户的连接
io.on('connection', function (socket) {
  console.log('a user connected');
  // 监听来自客户端的信息
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
    // 触发'chat message'将信息传递给所有“链接者”
    io.emit('chat message', msg)
  });
  // 断开链接
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
});

http.listen(3000, function () {
  console.log('Listening on *:3000')
})