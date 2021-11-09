const sql = require("../database/db_connect");
const fs=require("fs");
var express = require('express');
var router = express.Router();
var app = express();
const bcrypt=require('bcrypt');


let findpassword= (req, res, next) => {
    console.log("findpassword 호출됨");

    var paramid=req.body.email || req.query.email;
    var paramPassword=req.body.password || req.query.password;
    const encryptedPassowrd = bcrypt.hashSync(paramPassword, 10);
    //var data = {process: maxno+1, group_name:paramgroup_name ,start:paramstart, do_text: paramtitle, writer:paramname,end:paramend,title:paramtitle };
  
    const sql1 = "update user set password='"+encryptedPassowrd+"' where id='"+paramid+"'";
    console.log(sql1);
    sql.pool.query(sql1, (err, rows, fields) => {
        if (err) {
        console.log(err);
        } else {
        console.log(" 비밀번호가 재설정 되었습니다.");
        next();
        }
        });//sql
        
  };
  
  module.exports= {findpassword};