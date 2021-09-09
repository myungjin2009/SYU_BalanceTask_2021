const sql = require("../database/db_connect");
const fs=require("fs");
var express = require('express');
var router = express.Router();
var app = express();


let votechange = (req, res, next) => {

    //let token = req.cookies.user;
    let paramid=req.body.id;
    let paramnumber=req.body.boardnumber;
    let paramgroup=req.body.group;
    let paramkind=req.body.kind;
    let discuss;
    if(current_vote=="찬성"){
        discuss=1;
    }else{
        discuss=2;
    }
    console.log("vote 호출");

    const sql1= "update vote set discuss="+discuss+" where id='"+paramid+"' and board_number="+paramnumber+";"
    const sql2= "insert into vote set ?;"
    if(paramkind=="timeline"){
        sql2= "insert into vote set ?;"
        sql1= "update vote set discuss="+discuss+" where id='"+paramid+"' and board_number="+paramnumber+";"
    }else{
        sql2= "insert into vote set ?;"
        sql1= "update vote2 set discuss="+discuss+" where id='"+paramid+"' and board_number="+paramnumber+";"
    }
    
    var data={id:paramid, discuss:discuss, board_number:paramnumber, group:paramgroup}
    sql.pool.query(sql1,(err, rows, fields) => {
    if (err) {
        console.log(err);
    } else {
        if(rows==null || undefined){
            sql.pool.query(sql2,data,(err,rows)=>{
                if (err) {
                    console.log(err);
                } else {
                    console.log("추가됨");
                }
            })
        }
        console.log("vote true");
        next();
        }
    });
};

module.exports = {votechange};