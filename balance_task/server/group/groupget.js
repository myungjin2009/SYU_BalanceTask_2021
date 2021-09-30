const sql = require("../database/db_connect");
const fs=require("fs");
var express = require('express');
var router = express.Router();
var app = express();
const multer = require("multer");
const upload = multer({dest: './upload'});



let group_search = (req, res, next) => {
  console.log("group_search 함수 호출됨");
  const sql2="select count(group_no) from `groups`";
    sql.pool.query(sql2,(err,rows,fields)=>{
     var maxno=rows[0]['count(group_no)']


    let paramlastnumber=req.body.last_number || req.query.last_number;   //last_number의 값을 받는다.
    console.log(paramlastnumber);
    //lownumber째 부터 highnumber째까지 데이터를 보내준다.
    let lownumber= maxno-paramlastnumber-5;                      
    console.log(lownumber);
    let highnumber= maxno-paramlastnumber-1;
    console.log(highnumber);
    
    const sql1 = "SELECT * FROM `groups` g, user u where "+lownumber+ "<= group_no and group_no <="+ highnumber+" and g.user=u.id ORDER BY group_no DESC;";
    
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
            info.group_images="/image/05cca3d33f925dbb576548ee6b1f93c0,/image/9611ce697042995fd88aa2cc036260da";
          }
          req.image=info.group_images.split(',');
          console.log(req.image);
          req.image0=req.image[0];
          req.image1=req.image[1];
          req.name=info.name;
          var changeString=String(req.image);
          console.log(req.image);
          //var instr=fs.readFileSync(changeString,'utf-8');
          //console.log(instr);
        //   if(changeString!=="null"){

          
        //   fs.open(changeString,'r',function(err,fd){
        //     if(err) throw err;

        //     var buf=new Buffer.alloc(10);
        //     console.log('버퍼타입: %s',Buffer.isBuffer(buf));
        //     fs.read(fd,buf,0,buf.length,null,function(err,bytesRead,buffer){
        //       if(err) throw err;

        //       instr=buffer.toString('utf8',0,bytesRead);
        //       console.log('파일에서 읽은 데이터: %s',instr);
        //       fs.close(fd,function(){
        //         console.log("읽고 열기 완료");
        //       })
        //     })
        //   })
        // }
        //fs.readFile(changeString);
        //console.log(instr);
          array.push({
            id:req.group_no,
            title:req.group_name,
            date:req.startdate+"~"+req.deadline,
            deadline:req.deadline,
            writer:req.name,
            makehost:req.makehost,
            kind:req.category,
            content:req.content,
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


module.exports= {group_search};