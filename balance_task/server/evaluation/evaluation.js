var express = require('express');
var router = express.Router();
const sql=require('../database/db_connect');
var group = require('../group_function/addgroup');
const bcrypt=require('bcrypt');
const moment = require("moment");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
    
let evaluation= (req, res, next) => {

  console.log("evaluation함수 호출됨");
  //console.log('사진이야',req.files);
  //console.log(req.body.category);
  console.log(req.body);
  let paramapp=req.body.app_evaluatuon;
  let paramgroup=req.body.group;
  let parammember=req.body.members_evaluation;
  
  let app_evaluation=paramapp.evaluation
  let app_point=paramapp.point
  let array=[];

  parammember.forEach((info,index,newarray) => {
      req.id=info.id
      req.name=info.name
      req.point=info.point
      req.evaluation=info.evaluation


   })

  sql.pool.query(sql2,urlgroup,(err,rows,fields)=>{
    //console.log(rows);
    var maxno=rows[0]['count(board_number)']
    const array=[]
    var num=maxno+1;
    var time=moment().format('YYYY-MM-DD HH:mm:ss');
    //
    var data={board_number:num, title:paramtitle, image:paramimages.toString(), text:paramtext, info_user:paramId, info_groupname:urlgroup, date:time}
    
    let sql1 = "insert into groupboard set ?"
    console.log(paramcategory);
    if(paramcategory==="타임라인"){
      console.log("vote로 들어왔습니다.");
      let sql10="select count(vote_no) from vote";
      //let sql11="select count(user) from groupusers where group_name=?";
      let sql3="select user  from groupusers where group_name=?";
      sql.pool.query(sql3,urlgroup,(err,rows,fields)=>{
        console.log(rows);
        sql.pool.query(sql10,(err,row,fields)=>{
        console.log(row);
        let voteno=row[0]['count(vote_no)'];
        let groupusers_no=rows[0]['count(board_number)'];
        rows.forEach((info,index,newarray) => {  
          vno=voteno++;
          console.log("vno:"+vno);
          req.users= info.user;
          //for(i=voteno ; i<voteno+rows.length; i++){
          console.log("i:"+i);  
          console.log("rows.length:"+rows.length); 
          var votedata={vote_no:vno, board_number:num, discuss:0, user:req.users, group:urlgroup}
          sql4="insert into vote set ?"
          sql.pool.query(sql4,votedata,(err,rows,fields)=>{
            if (err) {
              console.log(err);
            } else {
              console.log("voteadd come");
            }
          })
          //}
        })
      })
    })
    }

    if(paramcategory==="공지사항"){
      sql1="insert into groupnotice set ?";
    }

    //const sql2 = "SELECT * FROM vote; ";
    console.log(sql1,data);
    sql.pool.query(sql1,data,(err, rows, fields) => {
      console.log(sql1);
      if (err) {
        console.log(err);
      } else {
        console.log("boardadd come");
      }
      next()
      //console.log(array);
    });//sql
  });  
};

module.exports= {boardadd};
