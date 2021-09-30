//9월28일 미수정본

const express = require("express"),
  http = require("http"),
  path = require("path");

const sql = require("../database/db_connect");

let makeroom = (req, res, next) => {
    console.log(req.body);

    let paramid=req.body.id;
    let paramid2=req.body.clickid;

    const sql1="select * from personchatin where user1='"+paramid+"' and user2='"+paramid2+"' or user1='"+paramid2+"' and user2='"+paramid+"'";

    sql.pool.query(sql1,(err,rows,fields)=>{
      console.log(rows);
      if(rows!==null){
        next();
      }else{

      console.log("makeroom 호출");
      const sql2="select count(room_no) from personchatin";
        sql.pool.query(sql2,(err,rows,fields)=>{
          let maxno=rows[0]['count(room_no)']+1;

          var data={room_no:maxno, user1:paramid, user2:paramid2};

          const sql3="INSERT INTO chat set ?"
          sql.pool.query(sql3,data,(err,rows,fields)=>{

                if (err) {
                  console.log(err);
                } else {
                  console.log("makeroom come");
                }
            })
          })
          next();
          }
      }); //sql1
}
  
module.exports = {makeroom};