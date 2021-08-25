const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

//const no=0;

let group_search = (req, res, next) => {
  console.log("group_search 함수 호출됨");
  // 커넥션 풀에서 연결 객체를 가져옴
    //let data=no+5;
    var paramlastnumber=req.body.last_Number;

    const sql1 = "SELECT * FROM `groups` g, user u where g.user=u.id ORDER BY makedate DESC LIMIT ?";
    sql.pool.query(sql1,paramlastnumber+3,(err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(rows);
        console.log("groups come");
        var array=[];
        rows.forEach((info) => {
          //group
          req.group_name = info.group_name;
          req.startdate =info.startdate;
          req.makeuser =info.user;
          req.makehost =info.host;
          req.category =info.category;
          req.content =info.content;
          req.deadline =info.deadline;
          
          //user
          req.name=info.name;

          array.push({title:req.group_name,
            date:req.startdate+"~"+req.deadline,
            deadline:req.deadline,
            writer:req.name,
            makehost:req.makehost,
            kind:req.category,
            content:req.content
            });
            req.array=array;
        })
        
      next();
      }
    });
};


module.exports= {group_search};