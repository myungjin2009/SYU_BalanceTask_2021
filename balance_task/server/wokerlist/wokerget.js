const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();



let wokerget = (req, res, next) => {
    console.log("friends함수 호출됨");
    let paramId= req.body.id //req.body.id;
    var array=[];
    const sql2="SELECT * FROM friends where user=? ";
    sql.pool.query(sql2,paramId,(err,rows,fields)=>{
            console.log(rows);
            rows.forEach((info,index,newarray) => {
            
            req.friends=info.friends;

            console.log(req.friends);
            
            const sql1 = "SELECT * FROM user where id=?"
            
                sql.pool.query(sql1,req.friends,(err, rows, fields) => {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(rows);
                    console.log("friends come");
                    
                    rows.forEach((info,index,newarray) => {
                        req.id = info.id;
                        req.user_image = info.user_image;
                        req.name =info.name;
                        req.introduce =info.introduce;
                        req.score=info.score;  
                        if(req.user_image===null || req.user_image===undefined){
                            req.user_image="/image/32ec1b34e27c99d038388c2828cb1bf7";
                        }

                        array.push({
                            ProfileName: req.name,
                            ProfileImage: req.user_image,
                            ProfileMessage: req.introduce,
                            Score: req.evaluation_score
                        });
                        req.array=array;
                    
                    });
                    
                }
                next()
    
            });
        });//sql
    });  
};

module.exports= {wokerget};
