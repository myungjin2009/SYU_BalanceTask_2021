const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const moment=require("moment");
const fs=require("fs");

const multer = require("multer");
const path = require("path");
var addgroup = function (groupname, host, startdate, deadline, manager, category, content, highlight, jwt, images,callback) {
  //console.log("addUser 호출됨 : " + id + ", " + password + ", " + name + ", ");

  // 커넥션 풀에서 연결 객체를 가져옴
  sql.pool.getConnection(function (err, conn) {
    if (err) {
    if (conn) {
    conn.release(); // 반드시 해제해야 함
    }

    callback(err, null);
    return;
    }
    console.log("데이터베이스 연결 스레드 아이디 : " + conn.threadId);
    const sql3="select id from user where jwt=?"
    sql.pool.query(sql3,jwt,(err,rows,fields)=>{
      console.log(rows)
      var groupjwt=rows[0]['id'];
      

    const sql2="select max(group_no) from `groups`";
    sql.pool.query(sql2,(err,rows,fields)=>{
     let maxno=rows[0]['max(group_no)']

    // 데이터를 객체로 만듦
    // var storage = multer.diskStorage({
    //   destination: function (req, file, cb) {
    //     cb(null, "./server/image");
    //   },
    //   filename: function (req, file, cb) {
    //     const ext = path.extname(file.originalname);
    //     cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    //   },
    // });
    
    var time=moment().format('YYYY-MM-DD HH:mm:ss');

    var data = {group_no: maxno+1,group_name:groupname, host:host , startdate:startdate, deadline: deadline, manager: manager , category:category, content:content, highlight:highlight,makedate:time, user:groupjwt,group_images:images };
    
    // SQL 문을 실행함
    var exec = conn.query(
    "insert into `groups` set ?",
    data,
    function (err, result) {
        conn.release(); // 반드시 해제해야 함
        console.log("실행 대상 SQL : " + exec.sql);

        if (err) {
        console.log("SQL 실행 시 에러 발생함.");
        console.dir(err);

        callback(err, null);

        return;
        }

        callback(null, result);
    }
    );
    console.log(maxno);
    var data2 = {group_name:groupname, user:groupjwt, leader:1, group_no: maxno+1};
    var exec2 = conn.query(
      "insert into groupusers set ?",
      data2,
      function (err, result) {
          //conn.release(); // 반드시 해제해야 함
          console.log("실행 대상 SQL : " + exec2.sql);
  
          if (err) {
          console.log("SQL 실행 시 에러 발생함.");
          console.dir(err);
  
          //callback(err, null);
  
          return;
          }
  
          //callback(null, result);
      }
      );

    conn.on("error", function (err) {
    console.log("데이터베이스 연결 시 에러 발생함.");
    console.dir(err);

    callback(err, null);
    });
  });
});
});
};

module.exports.addgroup = addgroup;
