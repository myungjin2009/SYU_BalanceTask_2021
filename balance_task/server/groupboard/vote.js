const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");


async function vote(board_number,array, callback) {
  
  console.log("vote 호출됨 : ");

  // 커넥션 풀에서 연결 객체를 가져옴
  sql.pool.getConnection(function (err, conn) {
    if (err) {
      //console.log("vote 호출됨 : ");
      if (conn) {
        conn.release(); // 반드시 해제해야 함
      }

      callback(err, null);
      return;
    }
    console.log("데이터베이스 연결 스레드 아이디 : " + conn.threadId);

    // 데이터를 객체로 만듦
    
    
    // SQL 문을 실행함
    var exec = conn.query(
      
      "select * from `vote` where board_number=?",
      board_number,
      function (err,rows, result) {
        let vote_list= [];
        conn.release(); // 반드시 해제해야 함
        console.log("실행 대상 SQL : " + exec.sql);

        if (err) {
          console.log("SQL 실행 시 에러 발생함.");
          console.dir(err);

          callback(err, null);

          return;
        }
        console.log(rows);
                        rows.forEach((info) => {
                          let discuss="찬성";
                            console.log("in vote");
                            // req.name=info.user;
                            // req.group=info.group;
                            // req.board_number=info.board_number;
                            //req.array=info.array
                            if(info.discuss===1){
                                discuss="찬성";
                              }else if(info.discuss===2){
                                discuss="반대";
                              }else{
                                discuss=info.discuss;
                              }
                                console.log( info.user );
                                console.log( info.group );
                                console.log( info.board_number );
                                console.log( discuss );
                            vote_list.push({
                                user_name:info.user,
                                vote:discuss
                            });
                            console.log(vote_list);
                                //req.array=array;
                               // return vote_list;
                        })
        callback(vote_list);
      }
    );

    conn.on("error", function (err) {
      console.log("데이터베이스 연결 시 에러 발생함.");
      console.dir(err);

      callback(err, null);
    });
  });

};


module.exports.vote = vote;