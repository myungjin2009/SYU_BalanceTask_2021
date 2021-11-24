// const express = require("express"),
//   path = require("path");
// const app = express();
// const sql = require("../database/db_connect");
// const httpServer = require("http").createServer();
// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("connection");
//   socket.on("init", (payload) => {
//     console.log(payload);
//   });
//   socket.on("send message", (item) => {//send message 이벤트 발생
//      console.log(item.name + " : " + item.message);
//     io.emit("receive message", { name: item.name, message: item.message, id: item.id, date: item.date });
//     //클라이언트에 이벤트를 보냄
//   });
// });

// httpServer.listen(80);
//======================================건형이================================= 

// let chatting = (req, res, next) => {
//     console.log(req.body);
//     //console.log(req.file);
//     let paramgroup = req.body.group;
//     let paramid=req.body.id;
    
    
//     console.log("chat 호출");
//     const sql2="select count(chat_no) from chat where group_name=?";
//     sql.pool.query(sql2,paramgroup,(err,rows,fields)=>{
//      let maxno=rows[0]['count(chat_no)']
//     io.on("connection", (socket) => {
//         socket.on("chatting", (data) => {
//           console.log(data);
      
//           const { name, msg } = data;
//           //const savechatting = new savechat(data.name);
//           //savechatting.getchat();
//           var ds = {
//             chat_date: moment().format("hh:mm A"),
//             chat_id: paramid,
//             msg: data.msg,
//             chat_no: maxno+1,
//             group_name:paramgroup
//           };
      
//           sql.pool.getConnection(function (err, conn) {
//             var exec = conn.query("INSERT INTO chat set ?",ds,function (err, result) {
//                 conn.release(); // 반드시 해제해야 함
//                 console.log("실행 대상 SQL : " + exec.sql);
      
//                 if (err) {
//                   console.log("SQL 실행 시 에러 발생함.");
//                   console.dir(err);
      
//                   return;
//                 }
//               }
//             );
//           });
//           io.emit("chatting", {
//             name: name,
//             msg: msg,
//             time: moment().format("hh:mm A"),
//           });
      
//           // socket.join(room);
//           // chat.to(room).emit('rMsg', data);
//           next();
//         });
//       });
//     });
// };
  
// module.exports = {chatting};