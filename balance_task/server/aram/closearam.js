const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var http = require('http');
var url = require('url');
const moment=require("moment");


let closearam= (req, res, next) => {
    console.log("groupend 함수 호출됨");
    let paramgroup_name=req.body.group;
    let paramgroup_member=req.body.group_members;
    let paramleader=req.body.send_user_id;

    console.log(req.body);

    for(i=0;i<paramgroup_member.length;i++){
      console.log(paramgroup_member[i].id);
      var member=paramgroup_member[i].id;
      const sql8="select count(aram_no) from aram"
        sql.pool.query(sql8,(err,rows,fields)=>{
        var no=rows[0]['count(aram_no)']+1;    
        var time=moment().format('YYYY-MM-DD HH:mm:ss');

        var data = {aram_no:no, senduser:paramleader, receiveuser:member, group:paramgroup_name, sendtime:time, content:2, notsend:1 };
          console.log(data);
        const sql9 = "insert into aram set ?; ";
        //const sql2 = "SELECT * FROM vote; ";
        sql.pool.query(sql9,data, (err, rows, fields) => {
        if (err) {
        console.log(err);
        console.log("이미 등록되어거나 리더입니다.");
        } else { 
          
        console.log("aram 종료 문자 발신");
        }
        
        });//sql
      });  
    }
}

module.exports= {closearam};