const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var http = require('http');
var url = require('url');
const moment=require("moment");




let groupdelete= (req, res, next) => {
    console.log(req.body);
    console.log(req.body.dataToSubmit.id); 
    var paramdataTosubmit = req.body.dataToSubmit.id;
    var sql6="delete from `groups` where group_no=?";
            sql.pool.query(sql6,paramdataTosubmit,(err,rows,fields)=>{
            if (err) {
                console.log(err);
                } else { 
            
                console.log("groups "+paramdataTosubmit+" 삭제");
                }
                req.groupname=paramdataTosubmit;
        }); 
    }

    module.exports= {groupdelete};
