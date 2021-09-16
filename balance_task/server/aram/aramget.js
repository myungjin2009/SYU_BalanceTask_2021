const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();



let receive_message = (req, res, next) => {
    console.log("알림 호출됨");
    let paramId=req.id //req.body.id;
    var array=[];
    const sql2="SELECT * FROM aram where receiveuser=? ";
    sql.pool.query(sql2,paramId,(err,rows,fields)=>{
            
            rows.forEach((info,index,newarray) => {
            req.aram_no=info.aram_no;
            req.senduser=info.senduser;
            req.groupname=info.group;
            req.receiveuser=info.receiveuser;
            req.content=info.content;
            req.time=info.sendtime;

            console.log(req.senduser);
            array.push({
                no:req.aram_no,
                senduser: req.senduser,
                groupname: req.groupname,
                receiveuser: req.receiveuser,
                content:req.content,
                time:req.time
            });
            req.aramArray=array;
            //next()
    
            });
            
            next()
        });//sql
};

module.exports= {receive_message};
