const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var http = require('http');
var url = require('url');
const moment=require("moment");




let boarddelete= (req, res, next) => {
    console.log(req.body);
    console.log("===================================게시판 삭제======================="); 
    var paramdataTosubmit = req.body.dataToSubmit.data.id;
    var paramgroup = req.body.dataToSubmit.data.group;

    if(req.body.dataToSubmit.data.kind=='timeLine'){

        var sql5="delete from vote where board_number=? and group_name='"+paramgroup+"';"
            sql.pool.query(sql5,paramdataTosubmit,(err,rows,fields)=>{
            if (err) {
                console.log(err);
                } else { 
            
                console.log("groupvote "+paramdataTosubmit+" 삭제");
                }
                
        })

        var sql6="delete from groupboard where board_number=? and info_groupname='"+paramgroup+"';"
            sql.pool.query(sql6,paramdataTosubmit,(err,rows,fields)=>{
            if (err) {
                console.log(err);
                } else { 
                console.log("groupboard "+paramdataTosubmit+" 삭제");
                }
                    
        })
    }

        if(req.body.dataToSubmit.data.kind=="notice"){
            var sql6="delete from groupnotice where board_number=? and info_groupname='"+paramgroup+"';"
            sql.pool.query(sql6,paramdataTosubmit,(err,rows,fields)=>{
            if (err) {
                    console.log(err);
            } else { 
                console.log("groups "+paramdataTosubmit+" 삭제");
            }
             req.groupname=paramdataTosubmit;
            }); 

        }    
    
        next();
}    



    module.exports= {boarddelete};
