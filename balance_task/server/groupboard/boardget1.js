const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");


let boardget1 = (req, res, next) => {
  console.log("boardget 함수 호출됨");
  // 커넥션 풀에서 연결 객체를 가져옴
    const array=[];
    //const array2=[]; 
    ////
    let paramlastnumber=req.body.last_number;
    ///
    console.log(paramlastnumber);
    if(paramlastnumber===undefined){
      paramlastnumber = 2;
    }

    console.log(paramlastnumber);
    const sql1 = "SELECT * FROM groupboard where board_number< 100 limit ?; ";
    //const sql2 = "SELECT * FROM vote; ";
    sql.pool.query(sql1,paramlastnumber+3, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(rows);
        console.log("boardget come");
        
        rows.forEach((info,index,newarray) => {
          
          // if(info.notice===0){
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
              id: req.board_number,
              group:req.info_groupname,
              photo_name:req.title,
              date:info.date,
              //deadline:req.deadline,
              user_name:req.info_user,
              content:req.text,
              image:req.image,
              file:req.file,
              kind:"timeLine",
              votes_list:null 
            });
            req.array=array;
            //sql.pool.release();
            // vote.vote(req.board_number,array, function(err,vote_list) {
            //   // 동일한 id로 추가하려는 경우 에러 발생 - 클라이언트로 에러 전송
            //   // if (err) {
            //   //           console.error('사용자 추가 중 에러 발생 : ' + err.stack);
            //             array.push({vote_list});
            //             console.log(array);
            //         //     return;
            //         // }
                    
              
            //   }
            // );
            
            //console.log(array);
            //next();


            // array.forEach((board,index,newarray)=>{
            //   console.log("in array");
            //   //console.log(newarray);
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
            //     const sql2="select * from vote where board_number=? ";
            //           sql.pool.query(sql2,req.board_number,(err,rows,fields)=>{
            //             console.log(rows);
            //             rows.forEach((info) => {
            //                 console.log("in vote");
            //                 req.name=info.user;
            //                 req.group=info.group;
            //                 req.board_number=info.board_number;
            //                 if(info.discuss===1){
            //                     req.discuss="찬성";
            //                   }else if(info.discuss===2){
            //                     req.discuss="반대";
            //                   }else{
            //                     req.discuss=info.discuss;
            //                   }
            //                     console.log( req.name );
            //                     console.log( req.group );
            //                     console.log( req.board_number );
            //                     console.log( req.discuss );
            //                 array2.push({
            //                     user_name:req.name,
            //                     vote:req.discusss
            //                 });
            //                     //req.array=array;
            //             })
                        
            //             req.notice ="timeline";
            //             req.array=array;
            //           //next();  
            //           console.log("===============vote===========")
            //           console.log(req.array);   
            //           }); 
                      
            //     })
          // }else{
          //   console.log("====================else===========");
          //   req.board_number=0;
          //     return;
          // }
          
          });
        
      }
      next()
      //console.log(array);
    });//sql
    
    // console.log(array);
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
    //     const sql2="select * from vote where board_number=? ";
    //           sql.pool.query(sql2,req.board_number,(err,rows,fields)=>{
    //             console.log(rows);
    //             rows.forEach((info) => {
    //                 console.log("in vote");
    //                 req.name=info.user;
    //                 req.group=info.group;
    //                 req.board_number=info.board_number;
    //                 if(info.discuss===1){
    //                     req.discuss="찬성";
    //                   }else if(info.discuss===2){
    //                     req.discuss="반대";
    //                   }else{
    //                     req.discuss=info.discuss;
    //                   }
    //                     console.log( req.name );
    //                     console.log( req.group );
    //                     console.log( req.board_number );
    //                     console.log( req.discuss );
    //                 array2.push({
    //                     user_name:req.name,
    //                     vote:req.discusss
    //                 });
    //                     //req.array=array;
    //             })
                
    //             req.notice ="timeline";
    //             req.array=array;
    //           //next();     
    //           }); 
    //   next();
    // })
    //next()
};

module.exports= {boardget1};
