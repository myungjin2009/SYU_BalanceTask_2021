const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");




let update_calendar= (req, res, next) => {
  console.log("update_calendar 함수 호출됨");
  // 커넥션 풀에서 연결 객체를 가져옴
    console.log(req.body);
    //console.log(req.title);
    var paramid= req.body.id|| req.query.id;
    var paramgroup_name = req.body.group || req.query.group;
    // var paramName = req.body.name || req.query.name;
    // var paramAgreement = req.body.isCheck || req.query.isCheck;
    //var data = { paramprocess,paramgroup_name};
    const sql1 = "update groupcalendar set title='"+req.body.title +"' where process= '"+paramid+"' and group_name='"+paramgroup_name+"';" ;
    console.log(sql1);
    //const sql2 = "SELECT * FROM vote; ";
    sql.pool.query(sql1,(err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(rows);
        console.log("update_calendar come");
      }
      next()
      
    });//sql
    
    
};

module.exports= {update_calendar};
