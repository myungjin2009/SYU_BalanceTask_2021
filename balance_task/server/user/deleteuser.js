const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var http = require('http');
var url = require('url');


let userdelete= (req, res, next) => {
        console.log(req.body);
        console.log(req.body.id); 
        console.log(req.body.password);
        let token=req.cookies.user; 
        req.success
        const sql4 = "SELECT id, password FROM user where jwt=?";
        sql.pool.query(sql4,token, (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
                var same = bcrypt.compareSync(password, req.body.password);
                if (same) {
                    isUser = true;
                    console.log("유저 삭제에 접근 되었습니다.");
                    req.success=true;
                
                } else {
                        
                        console.log("비밀번호가 틀리거나 존재하지 않는 아이디입니다.");
                        //return;
                        req.success=false;
                        next();
                }
                
            }
        });

        var sql1="delete from vote  where user=?";
        sql.pool.query(sql1,paramid,(err,rows,fields)=>{
        if (err) {
            console.log(err);
            } else { 
        
            console.log("uservote "+paramid+" 삭제");
            }
        }); 
    
        var sql6="delete from user  where id=?";
            sql.pool.query(sql6,paramid,(err,rows,fields)=>{
            if (err) {
                console.log(err);
                } else { 
            
                console.log("user "+paramid+" 삭제");
                }
        });
        res.clearCookie('user');
        next();
    }
    module.exports= {userdelete};
