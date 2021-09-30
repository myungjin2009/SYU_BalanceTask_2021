const express = require("express"),
  http = require("http"),
  path = require("path");
const app = express();
// const server = app.listen(5000, () => {
//     //console.log("=================listening on 5000!=================");
// });
//const io = require("socket.io")(server);
const sql = require("../database/db_connect");

let chattingget = (req, res, next) => {
    console.log(req.body);
    //console.log(req.file);
    let paramroom = req.body.room;
    let paramid=req.body.id;
    let array=[];
    console.log("개인chatting 내역 호출");
    const sql2="select * from personchat, user where user.id=personchat.chat_id chat_id='"+paramid+"' and room_no='"+paramroom+"' order by chat_no";
    sql.pool.query(sql2,(err,rows,fields)=>{
        rows.forEach((info) => {
            req.msg=info.msg;                //메시지
            req.date=info.chat_date;         //보낸 날짜
            req.id=info.chat_id;            //보낸 사람
            req.name=info.name;             //보낸 사람
            req.profile=info.user_image;    //프로필사진
            req.group=info.group_name;      //그룹네임
            req.my=false;
            if(req.id===req.body.id){
                req.my=true;
            }
            array.push({
                msg:req.msg,
                name:req.group_name,
                group:req.group,
                date:req.date,
                my:req.my,
                profile:req.profile
            });
            
        });
        req.array=array;
    
          // socket.join(room);
          // chat.to(room).emit('rMsg', data);
        next();
    });
    
};
  
module.exports = {chattingget};