const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();



let receive_message = (req, res, next) => {
    console.log("알림 호출됨");
    //console.log(req.body);
    let paramId=req.id //req.body.id;
    var array=[];
    var array2=[];
    const sql2="SELECT * FROM aram where receiveuser=? ";
    sql.pool.query(sql2,paramId,(err,rows,fields)=>{

            rows.forEach((info,index,newarray) => {
            req.aram_no=info.aram_no;
            req.senduser=info.senduser;
            req.groupname=info.group_name;
            req.receiveuser=info.receiveuser;
            req.content=info.content;
            req.time=info.sendtime;
            req.notsend=info.notsend;
            req.member;    
            // if(req.notsend==1){
            //     return;
            // }
           
            var sql2="select a.receiveuser as id, u.name , a.group_name  from aram a, user u where u.id=a.receiveuser and a.content=2 and a.group_name='"+req.groupname+"'c;"
             console.log(sql2);
             sql.pool.query(sql2,(err,rows,fields)=>{
                console.log(rows);
                console.log("makemembers");
                if(rows===undefined){
                    return;
                }else{
                    rows.forEach((info,index,newarray) => {  
                        array2.push(info);
                    })
                   
                } 
                
            })
            req.member=array2;
            console.log(req.member);
            console.log('그룹 가입하려는 자',req.senduser);
            
                
            array.push({
                no:req.aram_no,
                senduser: req.senduser,
                groupname: req.groupname,
                receiveuser: req.receiveuser,
                content:req.content,
                time:req.time,
                notsend:req.notsend
            });
            
            req.aramArray=array;
            //next()

            });

            next()
        });//sql
};

module.exports= {receive_message};