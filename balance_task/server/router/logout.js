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

router.route("/api/user/logout").post(function (req, res) {
  let isUser = false;
  const { id, password } = req.body;
  
  var cookies = cookie.parse(req.headers.cookie);
  console.log(cookies.user);
  console.log(sql.pool);
  
  sql.pool.getConnection(function (err, conn) {
    if (err) {
      if (conn) {
        conn.release(); // 반드시 해제해야 함
      }

      callback(err, null);
      return;
    }
    var data=[ token, id ];
    conn.query("ALTER TABLE user convert to charset utf8");

    var exec=conn.query(
    "delete jwt from user where jwt=?",
    cookies.user,
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
  });
});

module.exports = router;
