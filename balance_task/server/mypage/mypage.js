const sql = require("../database/db_connect");
const fs=require("fs");
var express = require('express');
var router = express.Router();
var app = express();
const multer = require("multer");
const upload = multer({dest: './upload'});
const moment=require("moment");



let mypage = (req, res, next) => {

    let token = req.cookies.user;
    console.log("mypage 호출");
    req.score;

    const sql34= "SELECT avg(point) FROM member_app m, user u where m.evaluated_user=u.id and u.jwt=?";
                sql.pool.query(sql34,token, (err, rows, fields) => {
                    if(rows === undefined){
                        req.score =00;
                        console.log("=====================================avg(point):"+req.score);
                        var scoredata={evaluation_score:00};
                        const sql10= "insert into user set ? where jwt='"+token+"';" ;
                        sql.pool.query(sql10,scoredata, (err, rows, fields) => {
                            if (err) {
                                console.log(err);
                                } else { 
                            
                                console.log("user 점수 삽입 성공");
                                }
                        })
                    }else{
                        req.score=rows[0]['avg(point)'];
                        console.log("=====================================avg(point):"+req.score);
                        var scoredata2={evaluation_score:Number(rows[0]['avg(point)'])};
                        const sql101= "update user set ? where user.jwt='"+token+"';" ;
                        sql.pool.query(sql101,scoredata2, (err, rows, fields) => {
                            if (err) {
                                console.log(err);
                                } else { 
                            
                                console.log("user 점수 삽입 성공");
                                }
                        })
                    }
                })

    const sql1= "SELECT * FROM user where jwt=?";
    sql.pool.query(sql1,token, (err, rows, fields) => {
    if (err) {
        console.log(err);
    } else {
        rows.forEach((info) => {
            //var array=[];
            console.log("true");
            req.token = token;
            req.id = info.id;
            req.name=info.name;
            console.log(req.name);
            req.evaluation_score=info.evaluation_score;
            req.evaluation_text=info.evaluation_text;
            req.clear_group=info.clear_group;
            req.user_image=info.user_image;
            if(req.user_image===null || req.user_image===undefined){
                req.user_image="/image/f10f68187fc57c148616fcca1536ea0f.jpg";
            }
            req.introduce=info.introduce;
            req.user_category=info.user_category;
            req.isAuth=true;
            // const sql1= "SELECT avg(point) FROM member_app m, user u where m.evaluated_user=u.id and u.jwt=?";
            //     sql.pool.query(sql1,token, (err, rows, fields) => {
            //         if(rows === undefined){
            //             req.score =00;
            //             console.log("=====================================avg(point):"+req.score);
            //             var scoredata={evaluation_score:00};
            //             const sql10= "insert into user set ? where jwt='"+token+"';" ;
            //             sql.pool.query(sql10,scoredata, (err, rows, fields) => {
            //                 if (err) {
            //                     console.log(err);
            //                     } else { 
                            
            //                     console.log("user 점수 삽입 성공");
            //                     }
            //             })
            //         }else{
            //             req.score=rows[0]['avg(point)'];
            //             var scoredata={evaluation_score:rows[0]['avg(point)']};
            //             const sql10= "insert into user set ? where jwt='"+token+"';" ;
            //             sql.pool.query(sql10,scoredata, (err, rows, fields) => {
            //                 if (err) {
            //                     console.log(err);
            //                     } else { 
                            
            //                     console.log("user 점수 삽입 성공");
            //                     }
            //             })
            //         }
            //     })
            
            next();
            console.log("mypage true");
            });
        //next();
        }
    });
};
  
module.exports = {mypage};