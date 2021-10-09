var express = require("express");
var router = express.Router();
const sql = require("../database/db_connect");
var user = require("../user/adduser");

//===== MySQL 데이터베이스를 사용할 수 있도록 하는 mysql 모듈 불러오기 =====//
//var mysql = require('mysql');
//======패스포드아용===//
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

let logout = (req, res, next) => {
  console.log("logout");
  let isUser = false;

  var cookies = cookie.parse(req.headers.cookie);
  console.log(cookies.user);

  // sql.pool.getConnection(function (err, conn) {
  //   if (err) {
  //     if (conn) {
  //       conn.release(); // 반드시 해제해야 함
  //     }
  //     return;
  //   }


  //   var exec=conn.query(
  //   "update jwt from user where jwt=?",
  //   cookies.user,
  //   function (err, result) {
  //     conn.release(); // 반드시 해제해야 함
  //     console.log("실행 대상 SQL : " + exec.sql);

  //     if (err) {
  //       console.log("SQL 실행 시 에러 발생함.");
  //       console.dir(err);

  //       return;
  //     }

  //   }
  // );
 
  // });
  res.clearCookie('user');
  next();
}

module.exports = {logout};
