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
  console.log(req.body.id);
  console.log("=================================자기평가보기===========================================");
  //const sql2="select max(member_no) from member_app where evaluated_user=?";
    // sql.pool.query(sql2,(err,rows,fields)=>{
    //  var maxno=rows[0]['max(member_no)']
    //   console.log(maxno);

    // let paramlastnumber=req.body.last_number || req.query.last_number;   //last_number의 값을 받는다.
    // if(maxno === 0){
    //   req.body.array_status = false;
    // }else{
    //   req.body.array_status = true;
    // }

    // console.log('클라이언트에서 보낸 번호',paramlastnumber);
    // //lownumber째 부터 highnumber째까지 데이터를 보내준다.
    // let lownumber= maxno-paramlastnumber-10;                      
    // console.log('제일 작은 번호', lownumber);
    // let highnumber= maxno-paramlastnumber-1;
    // console.log('제일 큰 번호',highnumber);

    var sql1 = "SELECT * FROM member_app m where m.evaluated_user=? ORDER BY member_no DESC;";

    console.log(sql1);
    sql.pool.query(sql1,req.body.id,(err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        var array=[];
        if(rows==undefined){
          next();
        }
        rows.forEach((info) => {
          req.rater = info.rater;
          req.id =info.member_no;
          req.evaluate_user=info.evaluated_user;
          req.point =info.point ;
          req.group_name =info.group_name;
          req.content =info.evaluation;
          req.ratername=info.rater_name;
          req.myname=info.name;
          //req.rater=info.rater;
          
            array.push({
              id:req.id,
              myname:req.myname,
              group_name:req.group_name,
              point:req.point,
              content:req.content,
              myid:req.evaluate_user,
              ratername: req.ratername,
              raterid:req.rater
              });
            
            req.array=array;           
        })
        
      next();
      }
    // });//sql2
  });
};


module.exports= {mytest};