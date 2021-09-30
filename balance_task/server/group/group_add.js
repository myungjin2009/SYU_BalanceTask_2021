var express = require('express');
var router = express.Router();
const sql=require('../database/db_connect');
var group = require('../group_function/addgroup');
const bcrypt=require('bcrypt');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const multer = require("multer");
const path = require("path");
	//const upload = multer({dest: './upload'}); 	
	//var upload = multer({ storage: storage });
	//app.use('/image', express.static('./upload'));

	var storage = multer.diskStorage({ 
		destination: function (req, file, cb) { cb(null, './upload')  },
		filename: function (req, file, cb) { cb(null, file.originalname)} 
	})
	  
	  
	const upload = multer({ storage: storage });

router.route('/api/group/create_group').post(upload.single("image"),function(req, res) {
	console.log('/process/addgroup 호출됨.');
	//multipartMiddleware;
    console.log(req.file.filename);
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
	//console.log(paramjwt);
	
  console.log(group.addgroup);  
	if (sql.pool) {
		group.addgroup(paramgroup_name, paramhost, paramstartdate ,paramdeadline,parammanger,paramcategory,paramcontent, paramhighlight, paramjwt, paramgroup_images.toString(), function(err, addedUser) {
			// 동일한 id로 추가하려는 경우 에러 발생 - 클라이언트로 에러 전송
			if (err) {
                console.error('사용자 추가 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
            // 결과 객체 있으면 성공 응답 전송
			if (group.addgroup) {
				console.dir(group.addgroup);
				
				res.status(200).json({
					
					success:true
				});
				
			} else {
				res.status(200).json({
					
					success:false
					   });
				
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
    //console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName + ', ' + paramAgreement);
	
});

module.exports=router;