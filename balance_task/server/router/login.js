var express = require('express');
var router = express.Router();
const sql=require('../database/db_connect');
var user = require('../user/adduser');


//비밀번호
const bcrypt=require('bcrypt');

//===== MySQL 데이터베이스를 사용할 수 있도록 하는 mysql 모듈 불러오기 =====//
//var mysql = require('mysql');
//======패스포드아용===//
const jwt = require('jsonwebtoken');
require("dotenv").config();
const cookie = require('cookie');


router.route("/api/user/login").post(function(req,res) {

    let isUser = false;
    const { id, password } = req.body;
    // console.log("name :", userId);
    // console.log("name :", userPassword);
    // console.log(req.headers.cookie);
    var cookies = cookie.parse(req.headers.cookie);
    console.log(cookies.user);
    console.log(sql.pool);
    const sql1 = "SELECT id, password FROM user";
    sql.pool.query(sql1, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
        rows.forEach((info) => {
          var same = bcrypt.compareSync(password, info.password)
          if (info.id === id && same) {
            isUser = true;
            console.log("true");
          } else {
            console.log("false");
            //router.route("/api/")
            return;
          }
        });
        if (isUser) {
          const YOUR_SECRET_KEY = process.env.SECRET_KEY;
          const accessToken = jwt.sign(
            {
              id,
            },
            YOUR_SECRET_KEY,
            {
              expiresIn: "1h",
            }
          );
          console.log(accessToken);
          res.cookie("user", accessToken);
          res.status(201).json({
            success:true,
            result: "ok",
            accessToken,
          });
        } else {
          res.status(400).json({ error: 'invalid user' });
        }
      }
  })
});

module.exports=router;