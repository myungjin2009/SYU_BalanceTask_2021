// const jwt = require("jsonwebtoken");
// module.exports = {
//   checkToken: (req, res, next) => {
//     let token = req.get("authorization");
//     if (token) {
//       token = token.slice(7);
//       jwt.verify(token, "[Token]", (err, decoded) => {
//         if (err) {
//           return res.json({
//             success: 0,
//             message: "Invalid Token...",
//           });
//         } else {
//           req.decoded = decoded;
//           next();
//         }
//       });
//     } else {
//       return res.json({
//         success: 0,
//         message: "Access Denied! Unauthorized User",
//       });
//     }
//   },
// };

// const { User } = require("../models/User");
// const sql = require("../database/db_connect");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const cookie = require("cookie");
// //쿠키의 토큰이 데베 유저의 토큰과 같은지 비교
// let auth = (req, res, next) => {
//   let token = req.cookies.user;

//   const sql1 = "SELECT jwt FROM user";
//   sql.pool.query(sql1, (err, rows, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(rows);
//       rows.forEach((info) => {
//         var same = bcrypt.compareSync(password, info.password);
//         if (info.id === id && same) {
//           isUser = true;
//           console.log("true");
//         } else {
//           console.log("false");

//           return;
//         }
//       });
//     }
//    });

//     req.token = token;
//     req.user = user;
//     next();

// };

// var authUser = function (id, name) {
//   console.log("addUser 호출됨 : " + id +", "+ name + ", ");

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
//     var data = { id: id, name: name, agreement: agreement, password: password };
//     conn.query("ALTER TABLE user convert to charset utf8");

//     // SQL 문을 실행함
//     var exec = conn.query(
//       "insert into user set ?",
//       data,
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

// module.exports = { auth };

const User = require("../models/User");
const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
//동호
let auth = (req, res, next) => {
  //인증 처리를 할 코드를 넣어야 한다
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.user;
  const sql1 = "SELECT id,jwt FROM user";
  sql.pool.query(sql1, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      rows.forEach((info) => {
        if (info.jwt === token) {
          //isUser = true;
          console.log("true");
          req.token = token;
          req.id = info.id;
          //req.user = user;
          next();
          console.log("json true");
          //return res.json({ isAuth: true, error: false });

          // User.findbytoken(token, (err, user) => {
          //   if (err) throw err; 
          //   if (!err) return res.json({ isAuth: true, error: false });
          //   req.token = token;
          //   req.user = user;
          //   next();
          // });
        } else {
          console.log("err");

          return;
        }
      });
    }
  });

  //  토큰을 복호화 한후 유저를 찾는다.
  // User.findByToken(token, (err, user) => {
  //   if (err) throw err;
  //   if (!err) return res.json({ isAuth: false, error: true });
  //   // req.token = token;
  //   // req.user = user;
  //   // next();
  // });

  // 유저가 있으면 인증 okay
  // req.token = token;
  // req.user = user;
  // next();
};

module.exports = { auth };
