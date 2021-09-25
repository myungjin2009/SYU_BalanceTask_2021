const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();



let wokerget = (req, res, next) => {
    console.log("=========================================friends함수 호출됨================================");
    //console.log(req.body);
    let paramId= req.body.id //req.body.id;
    var array=[];
    req.array;
    const sql2="SELECT friends FROM friends where user=? ";
    sql.pool.query(sql2,paramId,(err,rows,fields)=>{
            //console.log(rows);
        console.log(rows);    
        req.friends=rows;

            
           
        next();
        
    });  
};

module.exports= {wokerget};
