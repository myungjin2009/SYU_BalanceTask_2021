const sql = require("../database/db_connect");
const fs=require("fs");
var express = require('express');
var router = express.Router();
var app = express();
const multer = require("multer");
const upload = multer({dest: './upload'});
const moment=require("moment");


let group_search = (req, res, next) => {
  console.log("group_search 함수 호출됨");
  const sql2="select max(group_no),count(group_no) from `groups`";
    sql.pool.query(sql2,(err,rows,fields)=>{
     var maxno=rows[0]['max(group_no)']
     var countno=rows[0]['count(group_no)']
      console.log(maxno);
      console.log(countno);
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

    var sql1 = "SELECT * FROM `groups` g, user u where "+lownumber+ "<= group_no and group_no <="+ highnumber+" and g.user=u.id ORDER BY group_no DESC;";

    // if(paramlastnumber==-1){
    //   sql1="SELECT * FROM `groups` g, user u where "+countno+ "<= group_no and group_no <="+ maxno+" and g.user=u.id ORDER BY group_no DESC;";
    // }
    //const sql1 = "SELECT * FROM `groups` g, user u where "+lownumber+ "<= group_no and group_no <="+ highnumber+" and g.user=u.id ORDER BY group_no DESC;";
    
    console.log(sql1);
    sql.pool.query(sql1,(err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log("groups come");
        var array=[];
        rows.forEach((info) => {
          req.group_name = info.group_name;
          req.startdate =info.startdate;
          req.makeuser =info.user;
          req.makehost =info.host;
          req.category =info.category;
          req.content =info.content;
          req.deadline =info.deadline;
          req.group_no=info.group_no;
          if(info.group_images===null){
            info.group_images="/image/69277d1c49c1f304ffdae7c1f1f2d52b,/image/16592cb3ffe15694564c2fd39ac7f533";
          }
          req.image=info.group_images.split(',');
          //console.log(req.image);
          req.image0=req.image[0];
          req.image1=req.image[1];
          req.name=info.name;
          req.highlight=info.highlight;
          var changeString=String(req.image);
          //var time=moment().format('YYYY-MM-DD HH:mm:ss');
          var time=new Date();
          console.log(time);
          console.log(req.startdate);
          if(time.getTime() >= req.startdate.getTime()){
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
            }
            req.array=array;           
        })
        
      next();
      }
    });
  });
};


module.exports= {group_search};