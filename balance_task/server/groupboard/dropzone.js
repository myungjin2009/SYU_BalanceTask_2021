const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
const moment=require("moment");
const fs=require("fs");
const multer = require("multer");
require("dotenv").config();

const upload = multer({dest: './upload'}); 	
	//var upload = multer({ storage: storage });
app.use('/image', express.static('./upload'));

let dropzone = (req, res, next) => {
  console.log("dropzone 함수 호출됨");
  console.log(req.body);

    //if(paramimages=== null || paramimages===undefined){
    //    paramimages="/image/32ec1b34e27c99d038388c2828cb1bf7";
    //}else{
    //    paramimages= `/image/${req.file.filename}`;
    //}
    //fs.readFile(paramfile, 'utf8', function(err, data){
    //    console.log(data);
    //});

    let paramimages=[];

    for(i=0;i<req.body.images.length;i++){
        
        paramimages.push(`/image/${req.file.filename}`);
    }

  let sql2="select count(board_number) from groupboard where info_groupname=?";
  if(paramcategory==='공지사항'){
    sql2="select count(board_number) from groupnotice where info_groupname=?";
  }

  console.log(sql2);
    
  sql.pool.query(sql2,urlgroup,(err,rows,fields)=>{
    console.log(rows);
    var maxno=rows[0]['count(board_number)']
    const array=[]
    var num=maxno+1;
    var time=moment().format('YYYY-MM-DD HH:mm:ss');
    //image:paramimages,
    var data={board_number:num, title:paramtitle, text:paramtext, info_user:paramId, info_groupname:urlgroup, date:time}
    
    let sql1 = "insert into groupboard set ?"

    if(paramcategory==="공지사항"){
      sql1="insert into groupnotice set ?";
    }
    
    //const sql2 = "SELECT * FROM vote; ";
    console.log(sql1,data);
    sql.pool.query(sql1,data,(err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log("dropzone come");
      }
      next()
      //console.log(array);
    });//sql
  });  
};

module.exports= {dropzone};
