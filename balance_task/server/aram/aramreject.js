const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const moment=require("moment");


let aramreject= (req, res, next) => {
console.log("aramreject 함수 호출됨");
    var paramSendId=req.body.senduser; 
    var paramgroup_name=req.body.groupname;
    var paramId=req.body.receiveuser;
    var paramContent=req.body.content;
    var paramno=req.body.no;
    var paramnotsend=req.body.notsend;
    console.log(req.body);

    const sql6="delete from aram where aram_no=?"
      sql.pool.query(sql6,paramno,(err,rows,fields)=>{
        if (err) {
          console.log(err);
          } else { 

            if(paramnotsend===0){
            const sql7="select count(aram_no) from aram"
            sql.pool.query(sql7,(err,rows,fields)=>{
              var no=rows[0]['count(aram_no)']+1;    
              var time=moment().format('YYYY-MM-DD HH:mm:ss');
              
              if(paramContent !== null){
                console.log("데베에 추가 안됨 맞는거임");
              }else{
              var insertdata = {aram_no:no, senduser:paramId, receiveuser:paramSendId, group_name:paramgroup_name, sendtime:time, content:0, notsend:1};
              const sql8="insert into aram set ?"
              sql.pool.query(sql8,insertdata,(err,rows,fields)=>{
                  if (err) {
                  console.log(err);
                  } else { 
                      
                  console.log("새알림 등록");
                  } 
                  
                  })
                }
              
              })
            }

            next()  
          }
      });
};

module.exports= {aramreject};
