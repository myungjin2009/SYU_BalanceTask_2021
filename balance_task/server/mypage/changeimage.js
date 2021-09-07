const sql = require("../database/db_connect");
const fs=require("fs");
var express = require('express');
var router = express.Router();
var app = express();
const multer = require("multer");

const upload = multer({dest: './upload'}); 	
	//var upload = multer({ storage: storage });
	app.use('/image', express.static('./upload'));

let changeimage = (req, res, next) => {

    let token = req.cookies.user;
    var paramgroup_images= `/image/${req.file.filename}`;
    console.log("changeimage 호출");
    const sql1= "update user set user_image="+paramgroup_images+" where jwt="+token+";"
    
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