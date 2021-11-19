const sql = require("../database/db_connect");
const fs=require("fs");
var express = require('express');
var router = express.Router();
var app = express();
const multer = require("multer");
const upload = multer({dest: './upload'});



let group_update= (req, res, next) => {
    console.log("group_search 함수 호출됨");
    console.log(req.body);

    var paramgroup_name = req.body.groupName || req.query.groupName;
    //var paramgroup_images= `/image/${req.file.filename}`;
	let paramgroup_images=[];
    var paramhost = req.body.host || req.query.host;
    var paramstartdate = req.body.start || req.query.start;
    var paramdeadline = req.body.end || req.query.end;
    var parammanger= req.body.manager || req.query.manager;
    var paramcategory = req.body.category  || req.query.category ;
    var paramcontent = req.body.content || req.query.content;
	var paramhighlight=req.body.highlight || req.query.highlight;
	var paramjwt=req.cookies.user; 
	
	for(i=0;i<req.files.length;i++){
		paramgroup_images.push(`/image/${req.files[i].filename}`);
	}
    var sql1="update `groups` set (groups_name,category,start,end,highlight,host,manager,content,image,image)=('"+paramgroup_name+"','"+paramcategory+"',"+paramstartdate+","+paramdeadline+",'"+paramhighlight+"','"+paramhost+"','"+parammanger+"','"+paramcontent+"','"+paramgroup_images[0]+"','"+paramgroup_images[1]+"') where group_name='"+paramgroup_name+"');"

    sql.pool.query(sql1,(err,rows,fields)=>{
        if (err) {
            console.log(err);
          } else {
            console.log("성공");

          }
    })   
    next();
}
   


module.exports= {group_update};