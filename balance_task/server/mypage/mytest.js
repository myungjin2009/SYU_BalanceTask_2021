const sql = require("../database/db_connect");
const fs=require("fs");
var express = require('express');
var router = express.Router();
var app = express();
const multer = require("multer");
const upload = multer({dest: './upload'});
const moment=require("moment");

//===========================================미완성=========================================================
let mytest = (req, res, next) => {
  console.log(req.body)
  console.log("=================================자기평가보기===========================================");
  const sql2="select max(member_no) from member_app where evaluated_user=?";
    sql.pool.query(sql2,(err,rows,fields)=>{
     var maxno=rows[0]['max(member_no)']
      console.log(maxno);

    let paramlastnumber=req.body.last_number || req.query.last_number;   //last_number의 값을 받는다.
    if(maxno === 0){
      req.body.array_status = false;
    }else{
      req.body.array_status = true;
    }

    console.log('클라이언트에서 보낸 번호',paramlastnumber);
    //lownumber째 부터 highnumber째까지 데이터를 보내준다.
    let lownumber= maxno-paramlastnumber-10;                      
    console.log('제일 작은 번호', lownumber);
    let highnumber= maxno-paramlastnumber-1;
    console.log('제일 큰 번호',highnumber);

    var sql1 = "SELECT * FROM member_app m, user u where "+lownumber+ "<= member_no and member_no <="+ highnumber+" and m.evaluated_user=u.id ORDER BY member_no DESC;";

    console.log(sql1);
    sql.pool.query(sql1,(err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        var array=[];
        rows.forEach((info) => {
          req.member_name = info.rater;
          req.startdate =info.startdate;
          req.makeuser =info.user;
          req.makehost =info.host;
          req.category =info.category;
          req.content =info.content;
          req.deadline =info.deadline;
          req.group_no=info.group_no;
          req.name=info.name;
          req.highlight=info.highlight;
          
            array.push({
              id:req.group_no,
              makeuser:req.makeuser,
              title:req.group_name,
              date:req.startdate+"~"+req.deadline,
              deadline:req.deadline,
              writer:req.name,
              makehost:req.makehost,
              kind:req.category,
              content:req.content,
              highlight:req.highlight,
              image: req.image[1],         //메인로고사진
              postimage:req.image[0]
              });
            
            req.array=array;           
        })
        
      next();
      }
    });
  });
};


module.exports= {mytest};