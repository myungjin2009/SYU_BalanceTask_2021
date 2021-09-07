const sql = require("../database/db_connect");
const fs=require("fs");
var express = require('express');
var router = express.Router();
var app = express();



let changeintro = (req, res, next) => {

    let token = req.cookies.user;
    let paramintro=req.body.introduce || req.query.introduce;
    console.log("changeintro 호출");
    const sql1= "update user set introduce="+paramintro+" where jwt="+token+";"
    
    sql.pool.query(sql1,(err, rows, fields) => {
    if (err) {
        console.log(err);
    } else {
       console.log("changeintro true");
        next();
        }
    });
};
  
module.exports = {changeintro};