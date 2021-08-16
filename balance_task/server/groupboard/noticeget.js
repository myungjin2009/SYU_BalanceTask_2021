const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");

let noticeget = (req, res, next) => {
  console.log("noticeget 함수 호출됨");
  // 커넥션 풀에서 연결 객체를 가져옴
  
    const sql1 = "SELECT * FROM groupboard g, vote v,user u where g.board_number=v.board_number AND v.user=u.id";
    sql.pool.query(sql1, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(rows);
        console.log("noticeget come");
        var array=[];
        var array2=[];
        rows.forEach((info) => {
          if(info.notice===1){
          req.board_number = info.board_number;
          req.title = info.title;
          req.image =info.image;
          req.file =info.file;
          req.text =info.text;
          req.info_user =info.info_user;
          req.info_groupname=info.info_groupname;
          req.date =info.date;
          req.notice ="notice";

          //vote

          req.board_number = info.board_number;
          req.discuss = info.discuss;
          req.user =info.user;
          req.group =info.group;

          //user
          req.name=info.name;
          if(info.discuss===1){
            req.discuss="찬성";
          }else if(info.discuss===2){
            req.discuss="반대";
          }else{
            req.discuss=info.discuss;
          }
          array2.push({
                    user_name:req.name,
                    vote:req.discuss
          });

          //console.log(array2);

        //   if(info.notice===1){
        //     req.notice ="timeline";
        //   }else {
        //     req.notice="noatice";
        //   }
          // var sql2="SELECT * FROM `vote`";
          // sql.pool.query(sql2,(err,rows,fields)=>{
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     console.log(rows);
          //     console.log("vote come");
          //     //var array2=[];
          //     rows.forEach((info) => {
          //       req.board_number = info.board_number;
          //       req.discuss = info.discuss;
          //       req.user =info.user;
          //       req.group =info.group;
          //       //vote
          //       array2.push({
          //         user_name:req.user,
          //         vote:req.discuss
          //       });
          //     })
          //   }               
          // });

          array.push({
            photo_name:req.title,
            date:info.date,
            //deadline:req.deadline,
            user_name:req.info_user,
            content:req.text,
            image:req.image,
            file:req.file,
            kind:req.notice,
            votes_list:array2 
            });
            req.array=array;
        }else{
            return;
        }
            
        })
      next();
      }
    });
};

// var savetoken=function (token,id, callback) {
          
//   sql.pool.getConnection(function (err, conn) {
//     if (err) {
//       if (conn) {
//         conn.release(); // 반드시 해제해야 함
//       }

//       callback(err, null);
//       return;
//     }
//     var data=[ token, id ];
//     conn.query("ALTER TABLE user convert to charset utf8");

//     var exec=conn.query(
//     "update user set jwt=? where id=?",
//     data,
//     function (err, result) {
//       conn.release(); // 반드시 해제해야 함
//       console.log("실행 대상 SQL : " + exec.sql);

//       if (err) {
//         console.log("SQL 실행 시 에러 발생함.");
//         console.dir(err);

//         callback(err, null);

//         return;
//       }

//       callback(null, result);
//     }
//   );
//   });
// }


// var authUser = function (id, name) {
//   console.log("authuser 호출됨 : " + id +", "+ name + ", ");

//   // 커넥션 풀에서 연결 객체를 가져옴
//   sql.pool.getConnection(function (err, conn) {
//     if (err) {
//       if (conn) {
//         conn.release(); // 반드시 해제해야 함
//       }

//       callback(err, null);
//       return;
//     }
//     console.log("데이터베이스 연결 스레드 아이디 : " + conn.threadId);

//     // 데이터를 객체로 만듦
//     var data = { id: id};
//     var token=req.cookie.user;

//     // SQL 문을 실행함
//     var exec = conn.query(
//       "update user set jwt=? where id=?",
//       token,data,
//       function (err, result) {
//         conn.release(); // 반드시 해제해야 함
//         console.log("실행 대상 SQL : " + exec.sql);

//         if (err) {
//           console.log("SQL 실행 시 에러 발생함.");
//           console.dir(err);

//           callback(err, null);

//           return;
//         }

//         callback(null, result);
//       }
//     );

//     conn.on("error", function (err) {
//       console.log("데이터베이스 연결 시 에러 발생함.");
//       console.dir(err);

//       callback(err, null);
//     });
//   });
// };

module.exports= {noticeget};
// module.exports.authuser = authUser;
// module.exports.savetoken = savetoken;