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
            //req.array;
            // const sql2="select * from `groups` g,groupusers i where g.group_name=i.group_name and i.user=?";
            // sql.pool.query(sql2,req.id,(err,rows,fields)=>{  
            // // if(rows===null || rows===undefined){
            // //     req.array=undefined;
            // //     next();

            // // }
            // rows.forEach((info) => {
            //     req.group_name = info.group_name;
            //     req.startdate =info.startdate;
            //     req.makeuser =info.user;
            //     req.makehost =info.host;
            //     req.category =info.category;
            //     req.content =info.content;
            //     req.deadline =info.deadline;
            //     req.group_no=info.group_no;
            //     req.image=info.group_images;
            //     req.name=info.name;
            //     req.enjoy=info.enjoy;
            //     if(req.enjoy===null || req.enjoy===0){
            //         req.enjoy=false;
            //     }
            //     req.complete=info.complete;
            //     if(req.complete===1){
            //         req.complete=true;
            //     }
            //     array.push({
            //         id:req.group_no,
            //         group:req.group_name,
            //         logo_src: "",
            //         project_Hostt:req.makehost,
            //         project_DeadLine:req.deadline,
            //         project_StartLine:req.startdate,
            //         favoriteList: req.enjoy,
            //         Finished: req.complete,
            //         logo: "hanium_logo"
            //     });
            //       //console.log(array);
            // })
            // req.array=array;
            // var time=moment().format('YYYY-MM-DD HH:mm:ss');
            // req.FinishedPJ=0;
            // req.ContinuingPJ=0;
            // for(var i=0;i<array.length;i++){
            //     if(array[i].deadline<=time){
            //         req.FinishedPJ=req.FinishedPJ+1;                   
            //     }else{
            //         req.ContinuingPJ=req.ContinuingPJ+1;
            //     }
            // }
            // next();
            // })
            next();
            console.log("mypage true");
            });
        //next();
        }
    });
};
  
module.exports = {mypage};