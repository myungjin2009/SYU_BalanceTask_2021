const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();



let wokerdelete = (req, res, next) => {
    console.log("=========================================friends 삭제함수 호출됨================================");
    console.log(req.body);
    let paramId= req.body.dataToSubmit.my_id //req.body.id;
    let paramfriends=req.body.dataToSubmit.friend_id;

    const sql2="delete from friends where user='"+paramId+"'and friends='"+paramfriends+"';"
    sql.pool.query(sql2,(err,rows,fields)=>{
      if(err){
        console.log(err);
      }else{
        console.log("친구삭제 했습니다.");
      }
        next();
    });  
};

module.exports= {wokerdelete};
