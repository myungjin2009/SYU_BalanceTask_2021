const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var http = require('http');
var url = require('url');
const bcrypt = require("bcrypt");

let userdelete= (req, res, next) => {
        console.log(req.body);
        console.log(req.body.id); 
        console.log(req.body.password);
        let token=req.cookies.user; 
        req.success
        // const encryptedPassowrd = bcrypt.hashSync(req.body.password, 10);
        const sql4 = "SELECT id, password FROM user where jwt=?";
        sql.pool.query(sql4,token, (err, rows, fields) => {
            let pwd=rows[0]['password']
            console.log(pwd);
            let encryptedPassowrd = bcrypt.hashSync(req.body.password, 10);
            console.log(encryptedPassowrd);
        if (err) {
            console.log(err);
        } else {
                var same = bcrypt.compareSync(req.body.password, pwd);
                if (same) {
                    isUser = true;
                    console.log("유저 삭제에 접근 되었습니다.");
                    req.success=true;

                    var sql1="delete from vote  where user=?";
                        sql.pool.query(sql1,req.body.id,(err,rows,fields)=>{
                        if (err) {
                            console.log(err);
                            } else { 
                        
                            console.log("uservote "+req.body.id+" 삭제");
                            }
                        }); 

                        var sql7="delete from aram where senduser=?";
                        sql.pool.query(sql7,req.body.id,(err,rows,fields)=>{
                        if (err) {
                            console.log(err);
                            } else { 
                        
                            console.log("aram "+req.body.id+" 삭제");
                            }
                        }); 

                        var sql77="delete from aram where receiveuser=?";
                        sql.pool.query(sql77,req.body.id,(err,rows,fields)=>{
                        if (err) {
                            console.log(err);
                            } else { 
                        
                            console.log("aram "+req.body.id+" 삭제");
                            }
                        }); 
                    
                        var sql6="delete from user  where id=?";
                            sql.pool.query(sql6,req.body.id,(err,rows,fields)=>{
                            if (err) {
                                console.log(err);
                                } else { 
                            
                                console.log("user "+req.body.id+" 삭제");
                                }
                        });
                        //res.clearCookie('user');
                        req.success=true;
                
                } else {
                        
                        console.log("비밀번호가 틀리거나 존재하지 않는 아이디입니다.");
                        //return;
                        req.success=false;
                        
                }
                console.log(req.success);
                if(req.success==true){
                    res.clearCookie('user');
                }
            }
            next();
        });
        

        // var sql1="delete from vote  where user=?";
        // sql.pool.query(sql1,req.body.id,(err,rows,fields)=>{
        // if (err) {
        //     console.log(err);
        //     } else { 
        
        //     console.log("uservote "+req.body.id+" 삭제");
        //     }
        // }); 

        // var sql7="delete from aram where senduser=?";
        // sql.pool.query(sql7,req.body.id,(err,rows,fields)=>{
        // if (err) {
        //     console.log(err);
        //     } else { 
        
        //     console.log("aram "+req.body.id+" 삭제");
        //     }
        // }); 

        // var sql77="delete from aram where receiveuser=?";
        // sql.pool.query(sql77,req.body.id,(err,rows,fields)=>{
        // if (err) {
        //     console.log(err);
        //     } else { 
        
        //     console.log("aram "+req.body.id+" 삭제");
        //     }
        // }); 
    
        // var sql6="delete from user  where id=?";
        //     sql.pool.query(sql6,req.body.id,(err,rows,fields)=>{
        //     if (err) {
        //         console.log(err);
        //         } else { 
            
        //         console.log("user "+req.body.id+" 삭제");
        //         }
        // });
        // res.clearCookie('user');
        // next();
    }
    module.exports= {userdelete};
