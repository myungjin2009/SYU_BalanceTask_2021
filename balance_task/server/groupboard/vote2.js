const sql = require("../database/db_connect2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
const { nextTick } = require("process");
//var vote = require("./vote");


const vote2 = async (req,res,next) => {
// try {console.log("vote in");
// 		//const connection = await sql.pool.getConnection(async conn => conn);
	try {
      console.log("vote in2");
      const vote_list=[];
      const array2=[];  
      //sql.pool.release();
      req.array.forEach(async (info)=>{
            console.log("vote in3");    
            const sql2="select * from vote where board_number=? ";
            console.log("vote in44");
            console.log("vote in4");  
			var [exec] = await sql.pool.query(sql2,info.id);
            
            exec.forEach(async (info,index,newarray) => {
            //console.log("vote in5");  
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
            //return vote_list;  
            });
            console.log("end");         
        }); 
               
        console.log("=====================================vote====================================");        
        //await connection.release();     
        next()
		} catch(err) {
			console.log('Query Error');
			//connection.release();
			return false;
		}
	// } catch(err) {
	// 	console.log('DB Error');
	// 	return false;
	// }
};

module.exports= {vote2};