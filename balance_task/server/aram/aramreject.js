const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();



let aramreject= (req, res, next) => {
console.log("grouppart 함수 호출됨");
    var paramSendId=req.body.senduser; 
    var paramgroup_name=req.body.group;
    var paramId=req.body.receiveuser;
    var paramContent=req.body.content;

    const sql6="delete from aram where senduser= '"+paramSendId+"' and receiveuser='"+paramId+"' and group='"+paramgroup_name+"'"
      sql.pool.query(sql6,(err,rows,fields)=>{
        if (err) {
          console.log(err);
          } else { 
            
            const sql7="select count(aram_no) from aram"
            sql.pool.query(sql7,(err,rows,fields)=>{
              var no=rows[0]['count(aram_no)']+1;    
              var time=moment().format('YYYY-MM-DD HH:mm:ss');
              
              if(paramContent !== null){
                console.log("데베에 추가 안됨 맞는거임");
              }else{
              var insertdata = {aram_no:no, senduser:senduser, receiveuser:receiveuser, group:paramgroup_name, sendtime:time, content:0 };
              const sql8="insert into aram set ?"
              sql.pool.query(sql8,insertdata,(err,rows,fields)=>{
                  if (err) {
                  console.log(err);
                  } else { 
                      
                  console.log("새알림 등록");
                  } 
                  
                })
              }
              next()
          })
         
          }
      });
};

module.exports= {aramreject};
