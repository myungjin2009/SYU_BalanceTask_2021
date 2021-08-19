const sql = require("../database/db_connect2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

const vote = async (board_number,array, callback) => {
  console.log("in vote");
	try {
		const connection = await sql.pool.getConnection(async conn => conn);
		try {
      await console.log("vote income")
      const vote_list=[];  
      const sql="select * from `vote` where board_number=?";
      
			var [exec] = await connection.query(sql,board_number);
      //console.log(exec.sql);
      await exec.forEach(async (info,index,newarray) => {
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
        await vote_list.push({
            user_name:info.user,
            vote:discuss
        });
        console.log(vote_list);                              
        return vote_list;  
          
        });                 
      console.log("=====================================exec====================================");        
      connection.release();     
		} catch(err) {
			console.log('Query Error');
			connection.release();
			return false;
		}
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};
// async function vote(board_number,array, callback) {
  
//   console.log("vote 호출됨 : ");

//   // 커넥션 풀에서 연결 객체를 가져옴
//   await sql.pool.getConnection(async function (err, conn) {
//     if (err) {
//       if (conn) {
//         conn.release(); // 반드시 해제해야 함
//       }

//       callback(err, null);
//       return;
//     }
//     console.log("데이터베이스 연결 스레드 아이디 : " + conn.threadId);

//     // 데이터를 객체로 만듦
    
    
//     // SQL 문을 실행함
//     var exec =await conn.query(
//       "select * from `vote` where board_number=?",
//       board_number,
//        async function (err,rows, result) {
//         let vote_list= [];
//         conn.release(); // 반드시 해제해야 함
//         console.log("실행 대상 SQL : " + exec.sql);

//         if (err) {
//           console.log("SQL 실행 시 에러 발생함.");
//           console.dir(err);

//           callback(err, null);

//           return;
//         }
//         console.log(rows);
//                         await rows.forEach((info) => {
//                           let discuss="찬성";
//                             console.log("in vote");
//                             // req.name=info.user;
//                             // req.group=info.group;
//                             // req.board_number=info.board_number;
//                             //req.array=info.array
//                             if(info.discuss===1){
//                                 discuss="찬성";
//                               }else if(info.discuss===2){
//                                 discuss="반대";
//                               }else{
//                                 discuss=info.discuss;
//                               }
//                                 console.log( info.user );
//                                 console.log( info.group );
//                                 console.log( info.board_number );
//                                 console.log( discuss );
//                             vote_list.push({
//                                 user_name:info.user,
//                                 vote:discuss
//                             });
//                             console.log(vote_list);
//                                 //req.array=array;
//                                // return vote_list;
//                         })
//         callback(vote_list);
//       }
//     );

//     conn.on("error", function (err) {
//       console.log("데이터베이스 연결 시 에러 발생함.");
//       console.dir(err);

//       callback(err, null);
//     });
//   });

// };


module.exports.vote = vote;