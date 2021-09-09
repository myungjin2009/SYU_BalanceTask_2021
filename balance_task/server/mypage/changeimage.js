const sql = require("../database/db_connect");
const fs=require("fs");
var express = require('express');
var router = express.Router();
var app = express();
//const multer = require("multer");

// const upload = multer({dest: './upload'}); 	
	
// app.use('/image', express.static('./upload'));

let changeimage = (req, res, next) => {
    console.log(req.file);
    let token = req.cookies.user;
    var paramprofileimages= `/image/${req.file.filename}`;
    console.log("changeimage 호출");
    const sql1= "update user set user_image='"+paramprofileimages+"' where jwt='"+token+"';"
    
    sql.pool.query(sql1,(err, rows, fields) => {
    if (err) {
        console.log(err);
    } else {
        console.log("changeimage true");
        next();
        }
    });
};
  
module.exports = {changeimage};