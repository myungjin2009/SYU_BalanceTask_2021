const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var http = require('http');
var url = require('url');
const moment=require("moment");


let aramsubmit= (req, res, next) => {
console.log("grouppart 함수 호출됨");
    var paramSendId=req.body.senduser; 
    var paramgroup_name=req.body.group;
    var paramId=req.body.receiveuser;
    console.log(req.body);
    const sql4="select count(board_number) from groupboard where info_groupname=?"
    sql.pool.query(sql4,paramgroup_name,(err,rows,fields)=>{
    console.log(rows);
    var no;
    
    if(rows===undefined){
        no=0;
    }else{
     no=rows[0]['count(board_number)'];
    }
    for(var i=1;i<no+1;i++){
      console.log(i);
      data2={board_number:i, user:paramSendId, group:paramgroup_name, discuss:0}
      console.log(data2);
      const sql5="insert into vote set ?"
      sql.pool.query(sql5,data2,(err,rows,fields)=>{
        if (err) {
          console.log(err);
          } else { 
            
          console.log("vote 등록");
          }
      })
    }

    const sql6="delete from aram where senduser= '"+paramSendId+"' and receiveuser='"+paramId+"' and group='"+paramgroup_name+"'"
      sql.pool.query(sql6,(err,rows,fields)=>{
        if (err) {
          console.log(err);
          } else { 
            
          console.log("삭제");
          }
      })

      const sql7="select count(aram_no) from aram"
      sql.pool.query(sql7,(err,rows,fields)=>{
        var no=rows[0]['count(aram_no)']+1;    
        var time=moment().format('YYYY-MM-DD HH:mm:ss');
        var insertdata = {aram_no:no, senduser:senduser, receiveuser:receiveuser, group:paramgroup_name, sendtime:time, content:1 };
        const sql8="insert into aram set ?"
        sql.pool.query(sql8,insertdata,(err,rows,fields)=>{
            if (err) {
            console.log(err);
            } else { 
                
            console.log("새알림 등록");
            }
        })
    })

    var data = {group_name:paramgroup_name, user:paramSendId, leader:0 };

      const sql1 = "insert into groupusers set ?; ";
      //const sql2 = "SELECT * FROM vote; ";
      sql.pool.query(sql1,data, (err, rows, fields) => {
      if (err) {
      console.log(err);
      console.log("이미 등록되어거나 리더입니다.");
      } else { 
        
      console.log("grouppartcome");
      }
      next()
      });//sql
    });    
};

module.exports= {aramsubmit};
