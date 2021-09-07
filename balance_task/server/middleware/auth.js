const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
//동호
let auth = (req, res, next) => {
  //인증 처리를 할 코드를 넣어야 한다
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.user;
  console.log("auth=====================================================================================auth");
  const sql1= "SELECT * FROM user";
  //const sql1 = "SELECT * FROM user u , `groups` g where u.id=g.user ";
  //const sql2="select * from `groups`";
  sql.pool.query(sql1, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      
      rows.forEach((info) => {
        if (info.jwt === token) {
          
          var array=[];
          console.log("true");
          req.token = token;
          req.id = info.id;
          req.name=info.name;
          req.evaluation_score=info.evaluation_score;
          req.evaluation_text=info.evaluation_text;
          req.clear_group=info.clear_group;
          req.user_image=info.user_image;
          req.introduce=info.introduce;
          req.user_category=info.user_category;
          req.isAuth=true;
          const sql2="select * from groupusers where user=?";
          sql.pool.query(sql2,req.id,(err,rows,fields)=>{
              //console.log(rows);
              //req.array=array;
            // const sql3="select * from groupusers where user=?";
            // sql.pool.query(sql3,req.id,(err,rows,fields)=>{
            //   rows.forEach((info) => {
            //     req.group_name=info.group_name;
            //     array.push({
            //       group:req.group_name,
            //     });
            //     //console.log(array);
            //   })
            // })
            rows.forEach((info) => {
                req.group_name=info.group_name;
                array.push({
                  group:req.group_name,
                });
                //console.log(array);
              })
            req.array=array;
            next();
          })
          console.log("json true");
        } else {
          return;
        }
      });
      //next();
    }
  });
};

module.exports = { auth };
