const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var http = require('http');
var url = require('url');


let grouppart= (req, res, next) => {
console.log("grouppart 함수 호출됨");
var paramjwt=req.cookies.user; 
const sql3="select id from user where jwt=?"
sql.pool.query(sql3,paramjwt,(err,rows,fields)=>{
console.log(rows)
var groupjwt=rows[0]['id'];
console.log(req.body);

var paramgroup_name = req.body.group;

var data = {group_name:paramgroup_name, user:groupjwt, leader:0 };

    const sql1 = "insert into groupusers set ?; ";
    //const sql2 = "SELECT * FROM vote; ";
    sql.pool.query(sql1,data, (err, rows, fields) => {
    if (err) {
    console.log(err);
    console.log("이미 등록되어거나 리더입니다.");
    } else { 
    console.log("grouppartcome");
    }
    next()
    });//sql
  });    
};

module.exports= {grouppart};
