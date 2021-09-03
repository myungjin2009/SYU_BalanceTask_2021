const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var http = require('http');
var url = require('url');
// var _url;
// var queryData;
// var app = http.createServer(function(request, response){
// 	    url = request.url;
//     	queryData = url.parse(_url, true).query;
//         // url모듈의 parse함수를 사용해 _url값을 받고 query 부분을 가져옴
        
//         console.log(queryData);
//         console.log(queryData.id);

// });


let add_calendar= (req, res, next) => {
  console.log("add_calendar 함수 호출됨");

	//var queryData = url.parse(req.url, true).query;
  

  var paramjwt=req.cookies.user; 
  const sql3="select id from user where jwt=?"
    sql.pool.query(sql3,paramjwt,(err,rows,fields)=>{
      console.log(rows)
      var groupjwt=rows[0]['id'];
  //console.log( window.location.pathname);
  var paramgroup_name = req.body.group;
  console.log(req.body);
  const sql2="select max(process) from groupcalendar where group_name=?";
  sql.pool.query(sql2,paramgroup_name,(err,rows,fields)=>{
    console.log(rows);
  let maxno=rows[0]['max(process)']
  
  req.maxno=maxno+1;

  var paramgroup_name = req.body.group;
  var paramstart = req.body.start || req.query.start;
  var paramtitle= req.body.title || req.query.title;
  var paramname=groupjwt;
  var paramend=req.body.end || req.query.end;

  var data = {process: maxno+1, group_name:paramgroup_name ,start:paramstart, do_text: paramtitle, writer:paramname,end:paramend,title:paramtitle };

    const sql1 = "insert into groupcalendar set ?; ";
    //const sql2 = "SELECT * FROM vote; ";
    sql.pool.query(sql1,data, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        // const sql4="select * from groupcalendar where id=?"
        // sql.pool.query(sql1,data.process, (err, rows, fields) => {
        //   res.status(200).json({
        //     id: maxno+1
        //   });
        // })
        //console.log(rows);
        console.log("addcalendar come");
      }
      next()
      
      });//sql
    });
  });    
};

module.exports= {add_calendar};
