const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();



let receive_message = (req, res, next) => {
    console.log("friends함수 호출됨");
    let paramId=req.id //req.body.id;
    var array=[];
    const sql2="SELECT * FROM aram where receiveuser=? ";
    sql.pool.query(sql2,paramId,(err,rows,fields)=>{
            
            rows.forEach((info,index,newarray) => {
            
            req.senduser=info.senduser;
            req.groupname=info.group;
            req.receiveuser=info.receiveuser;
            //req.receiveuser=info.receiveuser;

            console.log(req.senduser);
            array.push({
                senduser: req.senduser,
                groupname: req.groupname,
                receiveuser: req.receiveuser,
                
            });
            req.aramArray=array;
            //next()
    
            });
            
            next()
        });//sql
};

module.exports= {receive_message};
