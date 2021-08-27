const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

//const no=0;

let group_search = (req, res, next) => {
  console.log("group_search 함수 호출됨");
  const sql2="select count(group_no) from `groups`";
    sql.pool.query(sql2,(err,rows,fields)=>{
     var maxno=rows[0]['count(group_no)']


    let paramlastnumber=req.body.last_number || req.query.last_number;
    console.log(paramlastnumber);
    let lownumber= maxno-paramlastnumber-5;
    console.log(lownumber);
    let highnumber= maxno-paramlastnumber-1;
    console.log(highnumber);
    //var data=lownumber + "=<group_no<=" + highnumber+" LIMIT 1"
    const sql1 = "SELECT * FROM `groups` g, user u where "+lownumber+ "<= group_no and group_no <="+ highnumber+" and g.user=u.id ORDER BY group_no DESC;";
    //const sql1 = "SELECT * FROM `groups` where 1=< group_no and group_no <="+ paramlastnumber4+";";
    console.log(sql1);
    sql.pool.query(sql1,(err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(rows);
        console.log("groups come");
        var array=[];
        rows.forEach((info) => {
          //group
          req.group_name = info.group_name;
          req.startdate =info.startdate;
          req.makeuser =info.user;
          req.makehost =info.host;
          req.category =info.category;
          req.content =info.content;
          req.deadline =info.deadline;
          req.group_no=info.group_no;
          //user
          req.name=info.name;

          array.push({
            id:req.group_no,
            title:req.group_name,
            date:req.startdate+"~"+req.deadline,
            deadline:req.deadline,
            writer:req.name,
            makehost:req.makehost,
            kind:req.category,
            content:req.content
            });
            req.array=array;
        })
        
      next();
      }
    });
  });
};


module.exports= {group_search};