var http=require('http');
const express = require('express');
const app = express();
var port = 3000;

var socketio=require('socket.io');

var cors=require('cors');

app.use(cors());

var server=http.createServer(app).listen(app.get('port'), function(){
    console.log("서버가 시작되었습니다. 포트:"+app.get('port'));

    database.init(app,config);
});

var io=socketio.listen(server);
console.log("socket.io 요청을 받아들일 준비가 되었습니다.");