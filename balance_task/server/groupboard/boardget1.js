const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");

let boardget1 = (req, res, next) => {
  console.log("boardget 함수 호출됨");
  // 커넥션 풀에서 연결 객체를 가져옴
    const array=[];
    const array2=[];    
    const sql1 = "SELECT * FROM groupboard ";//, vote v,user u where g.board_number=v.board_number AND v.user=u.id AND g.info_groupname=v.group ";
    sql.pool.query(sql1, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(rows);
        console.log("boardget come");
        
        rows.forEach((info,index,newarray) => {
          if(info.notice===0){
          //console.log(newarray);  
          req.board_number = info.board_number;
          console.log(req.board_number);
          req.title = info.title;
          console.log( req.title );
          req.image =info.image;
          console.log( req.image );
          req.file =info.file;
          req.text =info.text;
          console.log( req.text );
          req.info_user =info.info_user;
          req.info_groupname=info.info_groupname;
          req.date =info.date;
          //req.notice =info.notice;
          array.push({
            id:req.board_number,
            group:req.group,
            photo_name:req.title,
            date:info.date,
            //deadline:req.deadline,
            user_name:req.info_user,
            content:req.text,
            image:req.image,
            file:req.file,
            kind:req.notice,
            //votes_list:array2 
            });

            /////====================================
            // array.forEach((board,index,newarray)=>{
            //   console.log("in array");
            //   console.log(newarray);
            //   req.board_number = board.id;
            //   console.log(req.board_number);
            //   req.title = board.photo_name;
            //   console.log( req.title );
            //   req.image =board.image;
            //   console.log( req.image );
            //   req.file =board.file;
            //   req.text =board.content;
            //   console.log( req.text );
            //   req.info_user =board.user_name;
            //   req.info_groupname=board.group;
            //   req.date =board.date;
  
            //   const sql2="select * from vote where board_number=? ";
            //   sql.pool.query(sql2,req.board_number,(err,rows,fields)=>{
            //     console.log(rows);
            //     rows.forEach((info) => {
            //         console.log("in vote");
            //         req.name=info.user;
            //         req.group=info.group;
            //         req.board_number=info.board_number;
            //         if(info.discuss===1){
            //             req.discuss="찬성";
            //           }else if(info.discuss===2){
            //             req.discuss="반대";
            //           }else{
            //             req.discuss=info.discuss;
            //           }
            //           console.log( req.name );
            //           console.log( req.group );
            //           console.log( req.board_number );
            //           console.log( req.discuss );
            //         array2.push({
            //             user_name:req.name,
            //             vote:req.discuss
            //         });
            //             //req.array=array;
            //     })
                
            //     req.notice ="timeline";
            //     req.array=array;
            //   //next();     
            //   }); 
            // })

          }else{
            console.log("====================else===========");
            req.board_number=0;
              return;
          }
          // array.forEach((board)=>{
          //   req.board_number = board.board_number;
          //   console.log(req.board_number);
          //   req.title = board.title;
          //   console.log( req.title );
          //   req.image =board.image;
          //   console.log( req.image );
          //   req.file =board.file;
          //   req.text =board.text;
          //   console.log( req.text );
          //   req.info_user =board.info_user;
          //   req.info_groupname=board.info_groupname;
          //   req.date =board.date;

          //   const sql2="select * from vote where board_number=? ";
          //   sql.pool.query(sql2,req.board_number,(err,rows,fields)=>{
          //     console.log(rows);
          //     rows.forEach((info) => {
          //         console.log("in vote");
          //         req.name=info.user;
          //         req.group=info.group;
          //         req.board_number=info.board_number;
          //         if(info.discuss===1){
          //             req.discuss="찬성";
          //           }else if(info.discuss===2){
          //             req.discuss="반대";
          //           }else{
          //             req.discuss=info.discuss;
          //           }
          //           console.log( req.name );
          //           console.log( req.group );
          //           console.log( req.board_number );
          //           console.log( req.discuss );
          //         array2.push({
          //             user_name:req.name,
          //             vote:req.discuss
          //         });
          //             //req.array=array;
          //     })
              
          //     req.notice ="timeline";
          //     req.array=array;
          //   //next();     
          //   }); 
          // })
          //next();
        });
      array.forEach((board,index,newarray)=>{
      console.log("in array");
      console.log(newarray);
      req.board_number = board.id;
      console.log(req.board_number);
      req.title = board.photo_name;
      console.log( req.title );
      req.image =board.image;
      console.log( req.image );
      req.file =board.file;
      req.text =board.content;
      console.log( req.text );
      req.info_user =board.user_name;
      req.info_groupname=board.group;
      req.date =board.date;

      const sql2="select * from vote where board_number=? ";
      sql.pool.query(sql2,req.board_number,(err,rows,fields)=>{
        console.log(rows);
        rows.forEach((info) => {
            console.log("in vote");
            req.name=info.user;
            req.group=info.group;
            req.board_number=info.board_number;
            if(info.discuss===1){
                req.discuss="찬성";
              }else if(info.discuss===2){
                req.discuss="반대";
              }else{
                req.discuss=info.discuss;
              }
              console.log( req.name );
              console.log( req.group );
              console.log( req.board_number );
              console.log( req.discuss );
            array2.push({
                user_name:req.name,
                vote:req.discuss
            });
                //req.array=array;
        })
        
        req.notice ="timeline";
        req.array=array;
      //next();     
      }); 
    })
      //next();
      }
    });
    
    next();
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

module.exports= {boardget1};
// module.exports.authuser = authUser;
// module.exports.savetoken = savetoken;