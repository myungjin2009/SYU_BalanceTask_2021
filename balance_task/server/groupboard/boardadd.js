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

const multer = require("multer");
const path = require("path");
	//const upload = multer({dest: './upload'}); 	
	//var upload = multer({ storage: storage });
	//app.use('/image', express.static('./upload'));

	var storage = multer.diskStorage({ 
		destination: function (req, file, cb) { cb(null, './upload')  },
		filename: function (req, file, cb) { cb(null, file.originalname)} 
	  })
	  
	  
	  const upload = multer({ storage: storage });
    
let boardadd = (req, res, next) => {
  //upload.single("image")
 // const upload = multer({ storage: multer.diskStorage({ destination(req, file, cb) { cb(null, "uploads/"); }, filename(req, file, cb) { const ext = path.extname(file.originalname); cb(null, path.basename(file.originalname, ext) + Date.now() + ext); }, }), limits: { fileSize: 5 * 1024 * 1024 }, });

  console.log("==========================================================boardadd 함수 호출됨===============================================");
  let paramcategory=req.body.category;
  let urlgroup=req.body.group;
  let paramId=req.body.id;
  let paramtitle="게시물";
  let paramimages=[];
  let paramtext=req.body.content;

  for(i=0;i<req.files.length;i++){
    paramimages.push(`/image/${req.files[i].filename}`);
  }
  

  let sql2="select max(board_number) from groupboard where info_groupname=?";
  if(paramcategory==='공지사항'){
    sql2="select  max(board_number) from groupnotice where info_groupname=?";
  }

  //console.log(sql2);
  //console.log(paramimages.toString());  
  sql.pool.query(sql2,urlgroup,(err,rows,fields)=>{
    //console.log(rows);
    var maxno=rows[0]['max(board_number)']
    const array=[]
    var num=maxno+1;
    var time=moment().format('YYYY-MM-DD HH:mm:ss');
    //
    var data={board_number:num, title:paramtitle, image:paramimages.toString(), text:paramtext, info_user:paramId, info_groupname:urlgroup, date:time}
    
    let sql1 = "insert into groupboard set ?"
    if(paramcategory==="공지사항"){
      sql1="insert into groupnotice set ?";
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
    }
    console.log(paramcategory);
    if(paramcategory==="타임라인"){
      sql1 = "insert into groupboard set ?"

      console.log(sql1,data);
      sql.pool.query(sql1,data,(err, rows, fields) => {
        console.log(sql1);
        if (err) {
          console.log(err);
        } else {
          console.log("boardadd come");
        }
        //next()
        //console.log(array);
      });//sql


      console.log("vote로 들어왔습니다.");
      let sql10="select  max(vote_no) from vote";
      let sql3="select user,group_no from groupusers where group_name=?";

      sql.pool.query(sql3,urlgroup,(err,rows,fields)=>{
        console.log(rows);

        rows.forEach((info,index,newarray) => {  
          
          req.users= info.user;
          req.group_no=info.group_no;
          
          var votedata=("("+num+","+ 0+",'"+ req.users +"','" +urlgroup +"',"+req.group_no+")");
          array.push(votedata);
        })

        var replaced = array.toString().replace(/\[.*\]/g,'');
        var str = replaced.replace(/\"/gi, "");

        var sql4="insert into vote(board_number,discuss,user,group_name,group_no) values "+str+";"
        console.log(sql4);
          sql.pool.query(sql4,(err,rows,fields)=>{
            if (err) {
              console.log(err);
            } else {
              console.log("voteadd come");
            }
          })//sql4
      
    })//sql3
    }
    next();
    // if(paramcategory==="공지사항"){
    //   sql1="insert into groupnotice set ?";
    // }
    //const sql2 = "SELECT * FROM vote; ";
    // console.log(sql1,data);
    // sql.pool.query(sql1,data,(err, rows, fields) => {
    //   console.log(sql1);
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log("boardadd come");
    //   }
    //   next()
    //   //console.log(array);
    // });//sql
  });  
};

module.exports= {boardadd};




    // if(paramcategory==="타임라임"){
    //   console.log("vote로 들어왔습니다.");
    //   let sql3="select user from groupusers where group_name=?";
    //   sql.pool.query(sql3,urlgroup,(err,rows,fields)=>{
    //     rows.forEach((info,index,newarray) => {
    //       req.users= info.user;
    //       var votedata={board_number:num, discuss:0, user:req.users, group:urlgroup}
    //       sql4="insert into vote set ?";
    //       sql.pool.query(sql4,votedata,(err,rows,fields)=>{
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           console.log("voteadd come");
    //         }
    //       })
    //     })
    //   })
    // }