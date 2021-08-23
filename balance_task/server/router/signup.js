var express = require('express');
var router = express.Router();
const sql=require('../database/db_connect');
var user = require('../user/adduser');
var nodemailer=require('../router/node-mailer');
const bcrypt=require('bcrypt');

router.route('/api/signup').post(function(req, res) {
	console.log('/process/adduser 호출됨.');
    
    var paramId = req.body.email || req.query.email;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramAgreement = req.body.isCheck || req.query.isCheck;
	var paramauthNumber=req.body.authNumber || req.query.authNumber;
    //var sendNumber=req.okNumber;
	
	console.log(paramauthNumber);
	//console.log(sendNumber);

	if(paramauthNumber == sendNumber){ 
			console.log("인증번호 맞다");
	}else{
		console.log("인증번호 틀리다");
	}

    const encryptedPassowrd = bcrypt.hashSync(paramPassword, 10);
  console.log(user.adduser);  
	if (sql.pool) {
		user.adduser(paramId, paramName, encryptedPassowrd ,paramAgreement, function(err, addedUser) {
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
			if (user.adduser) {
				console.dir(user.addUser);
				
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
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName + ', ' + paramAgreement);
	
});

module.exports=router;