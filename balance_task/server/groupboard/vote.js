const sql = require("../database/db_connect");
const fs=require("fs");
var express = require('express');
var router = express.Router();
var app = express();


let votechange = (req, res, next) => {
    console.log("=========================================================vote===========================================")
    let token = req.cookies.user;
    var sql3="select name from user where jwt=?"
    sql.pool.query(sql3,token,(err,rows,fields)=>{
    console.log(rows);

    
    let paramid=req.body.id;
    let paramnumber=req.body.board_number;
    let paramgroup=req.body.group;
    let paramvote=req.body.current_vote;
    let paramkind=req.body.kind;
    let discuss;

    console.log(paramvote);
    for(var i=0;i<paramvote.length;i++){
        if(paramvote[i].user_name==rows[0]['name']){
            if(paramvote[i].vote=="찬성"){
                discuss=1;
            }else{
                discuss=2;
            }
        }
    }
    console.log("vote 호출");

    var sql1=  "";
    var sql2=  "";
    if(paramkind=="timeLine"){
        sql2= "insert into vote set ?;"
        sql1= "update vote set discuss="+discuss+" where user='"+paramid+"' and board_number="+paramnumber+";"
    }else{
        //sql2= "insert into vote2 set ?;"
        //sql1= "update vote2 set discuss="+discuss+" where user='"+paramid+"' and board_number="+paramnumber+";"
    }
    
    var data={user:paramid, discuss:discuss, board_number:paramnumber, group:paramgroup}
    console.log(data);
    sql.pool.query(sql1,(err, rows, fields) => {
    if (err) {
        console.log(err);
    } else {
        //console.log(rows);
        //if(rows.affectedRows==0){
            // sql.pool.query(sql2,data,(err,rows)=>{
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log("추가됨");
            //     }
            // })
        //}
        console.log("vote true");
        next();
        }
    });
    });
};

module.exports = {votechange};