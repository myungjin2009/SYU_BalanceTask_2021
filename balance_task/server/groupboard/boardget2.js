const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var vote = require("./vote2");
async function boardget2(req,res,next) {
  
  console.log("vote 호출됨 : ");

  // 커넥션 풀에서 연결 객체를 가져옴
  sql.pool.getConnection(async function (err, conn) {
    if (err) {
      if (conn) {
        conn.release(); // 반드시 해제해야 함
      }

      callback(err, null);
      return;
    }
    console.log("데이터베이스 연결 스레드 아이디 : " + conn.threadId);

    // 데이터를 객체로 만듦
    const sql="SELECT * FROM groupboard ";
    const sql4="SELECT * FROM vote ";
    
    // SQL 문을 실행함
    var exec =await conn.query(
      sql+sql4,
       async function (err,rows, result) {
        var sql1_result=rows[0];
        var sql4_result=rows[1];
        conn.release(); // 반드시 해제해야 함
        console.log("실행 대상 SQL : " + exec.sql);

        if (err) {
          console.log("SQL 실행 시 에러 발생함.");
          console.dir(err);

          callback(err, null);

          return;
        }
        console.log(rows[0]);
        await rows.forEach(async (info,index,newarray) => {
          // if(info.notice===0){
          //console.log(newarray);  
            req.board_number = info.board_number;
            new_board=info.board_number;
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
            //return exec;
  
            // await vote.vote(req.board_number,array, async function(err,vote_list) {
            //             array.push({vote_list});
            //             console.log(array);
            
            //   }
            // );
            console.log( "아직 못나감" );
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
            req.array=array;
            
          });
        //next();
      }
    );

    conn.on("error", function (err) {
      console.log("데이터베이스 연결 시 에러 발생함.");
      console.dir(err);

      callback(err, null);
    });
  });
 console.log("end");
};





// const boardget2 = async (req, res, next) => {
// 	try {
// 		const connection = await sql.pool.getConnection(async conn => conn);
// 		try {
//       const array=[];
//       const array2=[];
//       var new_board;  
//       const sql="SELECT * FROM groupboard ";
//       const sql4="SELECT * FROM vote ";
// 			var [exec] = await connection.query(sql+sql4,"",);
//       await exec.forEach(async (info,index,newarray) => {
          
//         var sql1_result=info[0];
//         var sql4_result=info[1];
//         // if(info.notice===0){
//         //console.log(newarray);  
//           req.board_number = info[0].board_number;
//           new_board=info.board_number;
//           console.log(req.board_number);
//           req.title = info.title;
//           console.log( req.title );
//           req.image =info.image;
//           console.log( req.image );
//           req.file =info.file;
//           req.text =info.text;
//           console.log( req.text );
//           req.info_user =info.info_user;
//           req.info_groupname=info.info_groupname;
//           req.date =info.date;
//           //req.notice =info.notice;
//           //return exec;

//           // await vote.vote(req.board_number,array, async function(err,vote_list) {
//           //             array.push({vote_list});
//           //             console.log(array);
          
//           //   }
//           // );
//           console.log( "아직 못나감" );
//           array.push({
//             id:req.board_number,
//             group:req.group,
//             photo_name:req.title,
//             date:info.date,
//             //deadline:req.deadline,
//             user_name:req.info_user,
//             content:req.text,
//             image:req.image,
//             file:req.file,
//             kind:req.notice,
//             //votes_list:array2 
            
//           });
//           req.array=array;
          
//         });
//         const sql3="SELECT * FROM vote";
//         var exec3 = connection.query(sql3,"");
//         console.log(sql3);
        
//       // const sql2="select * from vote where board_number=? ";
// 			// var [exec2] = await connection.query(sql2,"new_board");
//       // await exec2.forEach(async (info) => {
//       //         console.log("in vote");
//       //         req.name=info.user;
//       //         req.group=info.group;
//       //         req.board_number=info.board_number;
//       //         if(info.discuss===1){
//       //             req.discuss="찬성";
//       //         }else if(info.discuss===2){
//       //             req.discuss="반대";
//       //         }else{
//       //             req.discuss=info.discuss;
//       //         }
//       //         console.log( req.name );
//       //         console.log( req.group );
//       //         console.log( req.board_number );
//       //         console.log( req.discuss );
//       //         array2.push({
//       //           user_name:req.name,
//       //           vote:req.discusss
//       //         });                  
//       //                           //req.array=array;
                        
//       //         console.log("===============vote===========")
//       //         req.notice ="timeline";
//       //         req.array=array;
//       //                   //next();  
//       // });
//       //await connection.release(); 
                      
//       console.log("=====================================exec====================================");  
//       await next();      
// 		} catch(err) {
// 			console.log('Query Error');
// 			connection.release();
// 			return false;
// 		}
// 	} catch(err) {
// 		console.log('DB Error' );
// 		return false;
// 	}
// };

module.exports= {boardget2};