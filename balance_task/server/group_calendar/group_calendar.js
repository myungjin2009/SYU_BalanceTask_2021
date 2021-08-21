const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");




let group_calendar= (req, res, next) => {
  console.log("boardget 함수 호출됨");
  // 커넥션 풀에서 연결 객체를 가져옴
    const array=[];
    const sql1 = "SELECT * FROM groupcalendar; ";
    //const sql2 = "SELECT * FROM vote; ";
    sql.pool.query(sql1, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(rows);
        console.log("groupcalendar come");
        
        rows.forEach((info,index,newarray) => {
            req.process = info.process;
            console.log(req.process);
            req.group_name = info.group_name;
            console.log( req.group_name );
            req.date =info.date;
            console.log( req.date );
            req.do_text=info.do_text;
            req.writer =info.writer;
            console.log( req.writer );
            req.deadline =info.deadline;
            //req.notice =info.notice;
            array.push({
              id: req.process ,
              group:req.group_name,
              //photo_name:req.title,
              date:req.date,
              //deadline:req.deadline,
              user_name:req.writerr,
              content:req.do_text,
              //votes_list:null 
            });
            req.array=array;
          });
      }
      next()
      
    });//sql
    
    
};

module.exports= {group_calendar};
