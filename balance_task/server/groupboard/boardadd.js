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


  console.log("boardadd 함수 호출됨");
  console.log(req.body.images);
  console.log(req.body.images[0]);
  console.log(req.body.images[1]);
  //console.log(req.body.category);
  let paramcategory=req.body.category;
  let urlgroup=req.body.group;
  let paramId=req.body.id;
  let paramtitle="게시물";
  let paramimages=req.body.images;
  //let paramimages=`/image/${req.file.filename}`;
  // let paramfile=req.body.file;
  let paramtext=req.body.content;
  
    // if(paramimages=== null || paramimages===undefined){
    //     paramimages="/image/32ec1b34e27c99d038388c2828cb1bf7";
    // }else{
    //     paramimages= `/image/${req.file.filename}`;
    // }
    // fs.readFile(paramfile, 'utf8', function(err, data){
    //     console.log(data);
    //   });

  let sql2="select count(board_number) from groupboard where info_groupname=?";
  if(paramcategory==='공지사항'){
    sql2="select count(board_number) from groupnotice where info_groupname=?";
  }

  console.log(sql2);
    
  sql.pool.query(sql2,urlgroup,(err,rows,fields)=>{
    //console.log(rows);
    var maxno=rows[0]['count(board_number)']
    const array=[]
    var num=maxno+1;
    var time=moment().format('YYYY-MM-DD HH:mm:ss');
    //
    var data={board_number:num, title:paramtitle, image:paramimages, text:paramtext, info_user:paramId, info_groupname:urlgroup, date:time}
    
    let sql1 = "insert into groupboard set ?"

    if(paramcategory==="공지사항"){
      sql1="insert into groupnotice set ?";
    }
    
    //const sql2 = "SELECT * FROM vote; ";
    //console.log(sql1,data);
    sql.pool.query(sql1,data,(err, rows, fields) => {
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
