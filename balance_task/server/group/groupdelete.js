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
    console.log(req.body.dataToSubmit.group); 
    var paramdataTosubmit = req.body.dataToSubmit.id;
    var paramgroup_name = req.body.dataToSubmit.group_name ;
    var sql5="delete from vote  where group_name=?";
            sql.pool.query(sql5,paramgroup_name,(err,rows,fields)=>{
            if (err) {
                console.log(err);
                } else { 
            
                console.log("groupvote "+paramdataTosubmit+" 삭제");
                }
                req.groupname=paramdataTosubmit;
        }); 

    var sql6="delete from `groups` where group_no=?";
            sql.pool.query(sql6,paramdataTosubmit,(err,rows,fields)=>{
            if (err) {
                console.log(err);
                } else { 
            
                console.log("groups "+paramdataTosubmit+" 삭제");
                }
                req.groupname=paramdataTosubmit;
        }); 

        // var sql5="delete from vote v, `groups` g  where g.group_name=v.group_name and g.group_no=?";
        //     sql.pool.query(sql5,paramdataTosubmit,(err,rows,fields)=>{
        //     if (err) {
        //         console.log(err);
        //         } else { 
            
        //         console.log("groupvote "+paramdataTosubmit+" 삭제");
        //         }
        //         req.groupname=paramdataTosubmit;
        // }); 
        next();
    }
    module.exports= {groupdelete};
