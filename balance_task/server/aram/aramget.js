const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();



let receive_message = (req, res, next) => {
    console.log("알림 호출됨");
    //console.log(req.body);
    let paramId=req.id //req.body.id;
    let array=[];
    let array2=[];
    let member;
    const sql2="SELECT * FROM aram a, user u where a.senduser=u.id and a.receiveuser=? ";
    sql.pool.query(sql2,paramId,(err,rows,fields)=>{

            rows.forEach((info,index,newarray) => {
            req.aram_no=info.aram_no;
            req.senduser=info.senduser;
            req.groupname=info.group_name;
            req.receiveuser=info.receiveuser;
            req.content=info.content;
            req.time=info.sendtime;
            req.notsend=info.notsend;
            req.point=info.point;
            req.member;    
            req.exit;
            req.sendname=info.name
            // if(req.notsend==1){
            //     return;
            // }

            var sql22="select * from aram where content=2 and receiveuser=? and group_name='"+req.groupname+"';"
            sql.pool.query(sql22,paramId,(err,rows,fields)=>{
                if(rows==undefined){
                    req.exit=false;
                }else{
                    req.exit=true;
                }
            });
            
           if(req.exit=true){
            var sql2="select g.user as id, u.name , g.group_name  from groupusers g, user u  where u.id=g.user and  g.group_name='"+req.groupname+"';"
             //console.log(sql2);
             sql.pool.query(sql2,(err,rows,fields)=>{
                    //console.log(rows);
                    //console.log("makemembers");
                    if(rows===undefined){
                        return;
                    }else{
                        rows.forEach((info,index,newarray) => {  
                            array2.push(info);
                        }) 
                        //console.log("array2"+array2);
                        req.member=array2;
                        //console.log( "member"+member);
                    } 
                })
                //console.log( "member2"+member);
                req.member=member
            }
               
            
            console.log("req.member"+array2);
            req.member=array2;
            array.push({
                no:req.aram_no,
                senduser: req.senduser,
                groupname: req.groupname,
                receiveuser: req.receiveuser,
                content:req.content,
                time:req.time,
                notsend:req.notsend,
                point:req.point,
                sendname:req.sendname
            });
            
            req.aramArray=array;
            //next()

            

            
            })
            next()
        });//sql
};

module.exports= {receive_message};