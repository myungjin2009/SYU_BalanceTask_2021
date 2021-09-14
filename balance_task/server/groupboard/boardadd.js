const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
const moment=require("moment");
const fs=require("fs");
require("dotenv").config();



let boardadd = (req, res, next) => {
  console.log("boardadd 함수 호출됨");
  let urlgroup=req.body.group;
  let paramtitle=req.body.title;
  let paramimages=`/image/${req.file.filename}`;
  let paramfile=req.body.file;
  let paramtext=req.body.text;
  let paramId=req.body.id;
    // if(paramnull=="DEFAULT"){
    //     paramimages="/image/32ec1b34e27c99d038388c2828cb1bf7";
    // }else{
    //     paramimages= `/image/${req.file.filename}`;
    // }
    fs.readFile(paramfile, 'utf8', function(err, data){
        console.log(data);
      });

  const sql2="select count(board_number) from groupboard where info_groupname=?";
    sql.pool.query(sql2,urlgroup,(err,rows,fields)=>{
    var maxno=rows[0]['count(board_number)']
    const array=[]
    var num=maxno+1;
    var time=moment().format('YYYY-MM-DD HH:mm:ss');

    var data={board_number:num, title:paramtitle, image:paramimages, text:paramtext, info_user:paramId, info_groupname:urlgroup, date:time}
    
    const sql1 = "insert into groupboard set ?"
    //const sql2 = "SELECT * FROM vote; ";
    console.log(sql1,data);
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
