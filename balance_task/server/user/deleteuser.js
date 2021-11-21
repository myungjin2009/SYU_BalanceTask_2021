const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var http = require('http');
var url = require('url');
const moment=require("moment");




let userdelete= (req, res, next) => {
    console.log(req.body);
    console.log(req.body.dataToSubmit.id); 
   
    var sql6="delete from user  where id=?";
            sql.pool.query(sql6,paramid,(err,rows,fields)=>{
            if (err) {
                console.log(err);
                } else { 
            
                console.log("user "+paramid+" 삭제");
                }
                req.groupname=paramid;
        }); 
        next();
    }
    module.exports= {userdelete};
