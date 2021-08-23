var express = require('express');
var router = express.Router();
const sql=require('../database/db_connect');
var group = require('../group_function/addgroup');
const bcrypt=require('bcrypt');

router.route('/api/signup').post(function(req, res) {
	console.log('/process/adduser 호출됨.');
    
    var paramgroup_name = req.body.group_name || req.query.group_name;
    var paramgroup_images= req.body.group_images || req.query.group_images;
    var paramhost = req.body.host || req.query.host;
    var paramstartdate = req.body.startdate || req.query.startdate;
    var paramdeadline = req.body.deadline || req.query.deadline;
    var parammanger= req.body.manger || req.query.manger;
    var paramcategory = req.body.category  || req.query.category ;
    var paramcontent = req.body.content || req.query.content;

  console.log(group.addgroup);  
	if (sql.pool) {
		group.addgroup(paramgroup_name, paramhost, paramstartdate ,paramdeadline,parammanger,paramcategory,paramcontent, function(err, addedUser) {
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