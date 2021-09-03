const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");




let del_calendar= (req, res, next) => {
  console.log("del_calendar 함수 호출됨");
  // 커넥션 풀에서 연결 객체를 가져옴
    var paramprocess = req.body.id || req.query.id;
    var paramgroup_name = req.body.group || req.query.group;
    // var paramName = req.body.name || req.query.name;
    // var paramAgreement = req.body.isCheck || req.query.isCheck;
    var data = { paramprocess,paramgroup_name};
    const sql1 = "delete from groupcalendar where process=? and group_name= ?; ";
    //const sql2 = "SELECT * FROM vote; ";
    sql.pool.query(sql1,data,(err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(rows);
        console.log("del_calendar come");
      }
      next()
      
    });//sql
    
    
};

module.exports= {del_calendar};
