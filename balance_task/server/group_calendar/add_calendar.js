const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");




let add_calendar= (req, res, next) => {
  console.log("add_calendar 함수 호출됨");
  // 커넥션 풀에서 연결 객체를 가져옴
 // var paramprocess = req.body.process || req.query.process;
  var paramgroup_name = req.body.group_name || req.query.group_name;
  var paramdate = req.body.date || req.query.date;
  var paramtext= req.body.do_text || req.query.do_text;
  var paramwriter=req.body.writer || req.query.writer;
  var paramdeadline=req.body.deadline || req.query.deadline;

  var data = {process: paramprocess, group_name:paramgroup_name ,date: paramdate, do_text: paramtext, writer:paramwriter,deadline:paramdeadline };

    const sql1 = "insert into groupcalendar set ?; ";
    //const sql2 = "SELECT * FROM vote; ";
    sql.pool.query(sql1,data, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(rows);
        console.log("addcalendar come");
        
        // rows.forEach((info,index,newarray) => {
        //     req.process = info.process;
        //     console.log(req.process);
        //     req.group_name = info.group_name;
        //     console.log( req.group_name );
        //     req.date =info.date;
        //     console.log( req.date );
        //     req.do_text=info.do_text;
        //     req.writer =info.writer;
        //     console.log( req.writer );
        //     req.deadline =info.deadline;
        //     //req.notice =info.notice;
        //     array.push({
        //       id: req.process ,
        //       group:req.group_name,
        //       //photo_name:req.title,
        //       date:req.date,
        //       //deadline:req.deadline,
        //       user_name:req.writerr,
        //       content:req.do_text,
        //       //votes_list:null 
        //     });
        //     req.array=array;
        //   });
      }
      next()
      
    });//sql
    
    
};

module.exports= {add_calendar};
