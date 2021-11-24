const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const moment=require("moment");

let arams= (req, res, next) => {
  console.log("grouppart 함수 호출됨");
  var paramjwt=req.cookies.user; 
  const sql3="select id,evaluation_score from user where jwt=?"
  sql.pool.query(sql3,paramjwt,(err,rows,fields)=>{
    console.log(rows)
    var senduser=rows[0]['id'];
    var parampoint=rows[0]['evaluation_score']
    console.log(req.body);
    var paramgroup_name = req.body.group;
    var parammsg=req.body.message;         //msg
    console.log(req.body.group);
      const sql4="select * from `groups` where group_name='"+paramgroup_name+"'"   
      console.log(sql4);
      sql.pool.query(sql4,(err,rows,fields)=>{
        console.log(rows);
        var receiveuser=rows[0]['user'];
        const sql5="select max(aram_no) from aram"
        sql.pool.query(sql5,(err,rows,fields)=>{
        var no=rows[0]['max(aram_no)']+1;    
        var time=moment().format('YYYY-MM-DD HH:mm:ss');

        var data = {aram_no:no, senduser:senduser, receiveuser:receiveuser, group_name:paramgroup_name, sendtime:time, notsend:0, point:parampoint, msg:parammsg  };

        const sql1 = "insert into aram set ?; ";
        //const sql2 = "SELECT * FROM vote; ";
        sql.pool.query(sql1,data, (err, rows, fields) => {
        if (err) {
        console.log(err);
        console.log("이미 등록되어거나 리더입니다.");
        } else { 
          
        console.log("aram come");
        }
        next()
        });//sql
      });    
    });
  });
};

module.exports= {arams};
