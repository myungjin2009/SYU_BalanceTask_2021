const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var http = require('http');
var url = require('url');



let groupmember= (req, res, next) => {
console.log("groupmember 함수 호출됨");

  console.log(req.body);
  let paramgroup_name = req.body.group;
  let paramid = req.body.id;
  //let Leader;
//   let Leader;
//   const sql3="select user from `groups` where group_name=?"
//     sql.pool.query(sql3,paramgroup_name,(err,rows,fields)=>{
        
//             var groupleader=rows[0]['user'];
//             if(paramid==groupleader){
//                 Leader=1;
//             }else{
//                 Leader=0;
//             }

//     });

    const sql1="select * from groupusers where group_name=?"
    var array=[];
    var Leader;
    sql.pool.query(sql1,paramgroup_name,(err,rows,fields)=>{
      rows.forEach((info) => {
        console.log("true");
        console.log(info);  
        req.user = info.user;

        
        const sql3="select user from `groups` where group_name=?"
        sql.pool.query(sql3,paramgroup_name,(err,rows,fields)=>{
            console.log("리더인지 확인한다.");
            var groupleader=rows[0]['user'];
            console.log(groupleader);
            if(paramid==groupleader){
                Leader=1;
            }else{
                Leader=0;
            }
            console.log(Leader);
        });
    
        // const sql2="select * from user where id=?"
        // sql.pool.query(sql2,info.user,(err,rows,fields)=>{
        //     console.log("true2");
        //     console.log(rows); 
        //     rows.forEach((info) => {
                
        //         req.id =info.id;
        //         req.name =info.name;

               array.push({
                    id:req.user,
                });
                
        //    });
                
        //         console.log(req.array);
        //         console.log(Leader);
        //     });
                
        });
        req.array=array;
        req.leader=Leader;
       next(); 
    });
    
}

module.exports= {groupmember}
