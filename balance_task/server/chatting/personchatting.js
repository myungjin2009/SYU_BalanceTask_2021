//9월28일 미수정본

const express = require("express"),
  http = require("http"),
  path = require("path");
const app = express();
const server = app.listen(7000, () => {
    //console.log("=================listening on 5000!=================");
});
const io = require("socket.io")(server);
const sql = require("../database/db_connect");

let personchatting = (req, res, next) => {
    console.log(req.body);

    let paramid=req.body.id;

    console.log("chat 호출");
    const sql2="select count(chat_no) from personchat";
    sql.pool.query(sql2,(err,rows,fields)=>{
     let maxno=rows[0]['count(group_no)']
    io.on("connection", (socket) => {
        socket.on("chatting", (data) => {
          console.log(data);
      
          const { name, msg } = data;
          //const savechatting = new savechat(data.name);
          //savechatting.getchat();
          var ds = {
            chat_date: moment().format("hh:mm A"),
            chat_id: paramid,
            msg: data.msg,
            chat_no: maxno+1,
            group_name:paramgroup
          };
      
          sql.pool.getConnection(function (err, conn) {
            var exec = conn.query("INSERT INTO chat set ?",ds,function (err, result) {
                conn.release(); // 반드시 해제해야 함
                console.log("실행 대상 SQL : " + exec.sql);
      
                if (err) {
                  console.log("SQL 실행 시 에러 발생함.");
                  console.dir(err);
      
                  return;
                }
              }
            );
          });
          io.emit("chatting", {
            name: name,
            msg: msg,
            time: moment().format("hh:mm A"),
          });
      
          // socket.join(room);
          // chat.to(room).emit('rMsg', data);
          next();
        });
      });
    });
};
  
module.exports = {personchatting};