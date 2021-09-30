const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();



let wokeradd = (req, res, next) => {
    console.log("=========================================friends함수 호출됨================================");
    let paramId= req.body.id //req.body.id;
    let paramfriends=req.body.friendid;

    var data={user:paramId, friends:paramfriends};

    const sql2="insert into set ?";
    sql.pool.query(sql2,data,(err,rows,fields)=>{
      if(err){
        console.log(err);
      }else{
        console.log("친구추가 했습니다.");
      }
        next();
    });  
};

module.exports= {wokeradd};
