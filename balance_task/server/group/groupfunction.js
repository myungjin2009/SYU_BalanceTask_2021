const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

let group_search = (req, res, next) => {
  console.log("group_search 함수 호출됨");
  // 커넥션 풀에서 연결 객체를 가져옴
  
    const sql1 = "SELECT * FROM `groups` g, user u where g.user=u.id ORDER BY makedate DESC";
    sql.pool.query(sql1, (err, rows, fields) => {
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
          
          //user
          req.name=info.name;

          array.push({title:req.group_name,
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

module.exports= {group_search};
// module.exports.authuser = authUser;
// module.exports.savetoken = savetoken;