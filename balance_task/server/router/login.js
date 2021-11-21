var express = require("express");
var router = express.Router();
const sql = require("../database/db_connect");
var user = require("../user/adduser");

//비밀번호
const bcrypt = require("bcrypt");

//======패스포드아용===//
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

router.route("/api/user/login").post(function (req, res) {
  let isUser = false;
  const { id, password } = req.body;
  
  var cookies = cookie.parse(req.headers.cookie);
  //console.log(cookies.user);
  //console.log(sql.pool);
  const sql1 = "SELECT id, password FROM user";
  sql.pool.query(sql1, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(rows);
      rows.forEach((info) => {
        var same = bcrypt.compareSync(password, info.password);
        if (info.id === id && same) {
          isUser = true;
          console.log("login 되었습니다.");
        } else {
          
          return;
        }
      });
      if (isUser) {
        const YOUR_SECRET_KEY = process.env.SECRET_KEY;
        const accessToken = jwt.sign(
          {id,},YOUR_SECRET_KEY,{expiresIn: "1h",}
        );
        console.log(accessToken);
        res.cookie("user", accessToken,{
          //maxAge: 15*60,
          httpOnly: true,
          path:'/'
        });
        if (sql.pool) {
          user.savetoken(accessToken, req.body.id, function (err, savetoken) {
            // 동일한 id로 추가하려는 경우 에러 발생 - 클라이언트로 에러 전송
            if (err) {
              console.error("사용자 추가 중 에러 발생 : " + err.stack);

              return;
            }

            if (user.savetoken) {
              console.dir(user.savetoken);
              console.log("success");
            } else {
              console.log("fail");
            }
          });
        } else {
          // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
          console.log(
            "데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송"
          );
        }
        res.status(201).json({
          success: true,
          result: "ok",
          accessToken,
        });
      } else {
        res.status(200).json({ error: "invalid user" });
      }
    }
  });
});

module.exports = router;
