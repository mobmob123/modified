//1對1 webRTC server
'use strict';// JavaScript 啟用嚴格模式

var os = require('os');
var express = require('express');
var app = express();
//var http = require('http');
var socketIO = require('socket.io');

var https = require('https');
var fs = require('fs');
var options = {
  key: fs.readFileSync('./cert/private.key'),
  cert: fs.readFileSync('./cert/certificate.crt')
};
var server = https.createServer(options, app);
var io = socketIO(server);

app.use(express.static('public'))

app.get("/", function(req, res){
    res.render("index.ejs");
  });

  server.on('error', function(error) { //server錯誤
    console.error('Server error:', error);
    });

    server.listen(process.env.PORT || 8000, function() {
    console.log('Server is running on port ' + (process.env.PORT || 8000));
    });

    io.sockets.on('connection', function(socket) {
    function log(){//傳送訊息給這個client
        var array = ['Message from server:'];
        array.push.apply(array, arguments);
        socket.emit('log', array);
    }
    //傳送訊息給其他人,離開,加入或創建房間
    socket.on('message', function(message, room) {
        log('You said:', message);//傳送訊息給傳送訊息的client
        socket.in(room).emit('message', message, room);
    });

    socket.on('create or join', function(room) {
        log('Received request to create or join room ' + room);

        var clientsInRoom = io.sockets.adapter.rooms[room];//房間裡的人
        var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;//房間裡的人數
        log('Room ' + room + ' now has ' + numClients + ' client(s)');

        if (numClients === 0) {//如果沒人
            socket.join(room);//加入房間
            log('You(' + socket.id + ') created room ' + room);
            socket.emit('created', room, socket.id);

        } else if (numClients === 1) {//如果只有一人
            log('Client ID ' + socket.id + ' joined room ' + room);
            io.sockets.in(room).emit('join', room);//通知房間裡的人你加入了
            socket.join(room);//加入房間
            socket.emit('joined', room, socket.id);//通知你成功加入房間
            io.sockets.in(room).emit('ready');//通知房間裡的人可以開始通話了
        } else { // max two clients
            socket.emit('full', room);
        }
       
    });

    socket.on('ipaddr', function() {
        console.log('這是什麼鬼');
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces) {
          ifaces[dev].forEach(function(details) {
            if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
              socket.emit('ipaddr', details.address);
            }
          });
        }
      });

    socket.on('bye', function(){
        console.log('Received bye');
    });
     
})    
