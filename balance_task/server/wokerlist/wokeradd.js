const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();



let wokeradd = (req, res, next) => {
    console.log("=========================================friends함수 호출됨================================");
    console.log(req.body);
    let paramId= req.body.user_id //req.body.id;
    let paramfriends=req.body.workerList;
    let array=[];

    paramfriends.forEach((info,index,newarray) => {
      req.id=info.id;
      var data2 = ("('"+paramId+"','"+req.id+"')");
      array.push(data2);
      console.log(array);
    })

    //var data={user:paramId, friends:paramfriends};
    var replaced = array.toString().replace(/\[.*\]/g,'');
      var str = replaced.replace(/\"/gi, "");

    const sql2="insert into friends(user,friends) values "+str+";"
    sql.pool.query(sql2,(err,rows,fields)=>{
      if(err){
        console.log(err);
      }else{
        console.log("친구추가 했습니다.");
      }
        next();
    });  
};

module.exports= {wokeradd};
