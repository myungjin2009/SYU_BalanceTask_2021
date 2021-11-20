const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var http = require('http');
var url = require('url');
const moment=require("moment");

 let closearam= (req, res, next) => {
    console.log("==========================================평가 페이지 호출됨=========================================");
    let paramgroup_name=req.body.group;
    let paramgroup_member=req.body.group_members;
    let paramleader=req.body.send_user_id;
    req.member=paramgroup_member;
    
    let array=[];
    
    console.log(req.body);
    let no=0;
    paramgroup_member.forEach((info,index,newarray) => {  
        req.id=info.id;

        var time=moment().format('YYYY-MM-DD HH:mm:ss');

        let Sparamleader=paramleader.toString();
        let SId=req.id.toString();
        let Sgrouop=paramgroup_name.toString();
        let Stime=time.toString();
        
        var data2 = ("('"+Sparamleader +"','"+ SId +"','"+ time +"','" +Sgrouop +"',2,1)");
        no++;
    
        array.push(data2);
    })
    
        //const sql2 = "SELECT * FROM vote; ";
        var replaced = array.toString().replace(/\[.*\]/g,'');
        var str = replaced.replace(/\"/gi, "");
        const sql9 = "INSERT INTO aram(senduser, receiveuser, sendtime, group_name, content, notsend) VALUES "+str+";"
        console.log(str);
        sql.pool.query(sql9, (err, rows, fields) => {
            if (err) {
            console.log(err);
            console.log("오류");
            } else { 
            console.log("aram 종료 문자 발신");
            next();
            }
        });

    // for(i=0;i<paramgroup_member.length;i++){
    //   console.log(paramgroup_member[i].id);
    //   var member=paramgroup_member[i].id;
    //    const sql8="select count(aram_no) from aram"
    //    sql.pool.query(sql8,(err,rows,fields)=>{
    //     var no=rows[0]['count(aram_no)']+1;    
    //     var time=moment().format('YYYY-MM-DD HH:mm:ss');

    //     var data = {aram_no:no, senduser:paramleader, receiveuser:member, group:paramgroup_name, sendtime:time, content:2, notsend:1 };
    //       console.log(data);
    //     const sql9 = "insert into aram set ?; ";
    //     //const sql2 = "SELECT * FROM vote; ";
    //     sql.pool.query(sql9,data, (err, rows, fields) => {
    //     if (err) {
    //     console.log(err);
    //     console.log("이미 등록되어거나 리더입니다.");
    //     } else { 
          
    //     console.log("aram 종료 문자 발신");
    //     }
        
    //     });//sql
    //   });  
    // }
    //next();
}


module.exports= {closearam};