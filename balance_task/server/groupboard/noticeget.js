const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");


let noticeget = (req, res, next) => {
  console.log("notice 함수 호출됨");
  const sql2="select count(board_number) from groupnotice";
  sql.pool.query(sql2,(err,rows,fields)=>{
   var maxno=rows[0]['count(board_number)']
    const array=[];
    
    let paramlastnumber=req.body.last_number;
    
    console.log(paramlastnumber);
    if(paramlastnumber===undefined){
      paramlastnumber = 2;
    }
    
    console.log(maxno);
    let lownumber=maxno-paramlastnumber-2;
    console.log(lownumber);
    let highnumber=maxno-paramlastnumber-1;
    console.log(highnumber);
    //const sql1 = "SELECT * FROM groupboard where "+ lownumber+ "<= board_number and board_number<="+ highnumber+" order by board_number desc;"
    const sql1 = "SELECT * FROM groupnotice where "+ lownumber+ "<= board_number and board_number<="+ highnumber+" order by board_number desc;"
    //const sql2 = "SELECT * FROM vote; ";
    sql.pool.query(sql1, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(rows);
        console.log("notice come");
        
        rows.forEach((info,index,newarray) => {
          
          // if(info.notice===0){
          //console.log(newarray);  
            req.board_number = info.board_number;
            console.log(req.board_number);
            req.title = info.title;
            console.log( req.title );
            req.image =info.image;
            console.log( req.image );
            req.file =info.file;
            req.text =info.text;
            console.log( req.text );
            req.info_user =info.info_user;
            req.info_groupname=info.info_groupname;
            req.date =info.date;
            //req.notice =info.notice;
            array.push({
              id: req.board_number,
              group:req.info_groupname,
              photo_name:req.title,
              date:info.date,
              //deadline:req.deadline,
              user_name:req.info_user,
              content:req.text,
              image:req.image,
              file:req.file,
              kind:"notice",
              votes_list:null 
            });
            req.array=array;
          
          });
        
      }
      next()
      //console.log(array);
    });//sql
  });
};

module.exports= {noticeget};
