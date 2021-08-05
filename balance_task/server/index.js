
// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
  , errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

//비밀번호
const bcrypt=require('bcrypt');
const saltRounds=10;

//===== MySQL 데이터베이스를 사용할 수 있도록 하는 mysql 모듈 불러오기 =====//
//var mysql = require('mysql');
const sql=require('./database/db_connect');
//======패스포드아용===//
const jwt = require('jsonwebtoken');
require("dotenv").config();
const cookie = require('cookie');
var user = require('./user/adduser');
var signup=require('./router/signup');

var login=require('./router/login');

// 익스프레스 객체 생성
var app = express();

// 설정 파일에 들어있는 port 정보 사용하여 포트 설정
app.set('port', process.env.PORT || 5000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));
 
// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));

var router = express.Router(); 
app.post('/api/signup', signup);
//===== 라우팅 함수 등록 =====//
// 라우터 객체 참조//var router = express.Router();
app.post('/api/user/login',login);

// 라우터 객체 등록
app.use('/', router);

//함수들 ======================================================================================//

// var errorHandler = expressErrorHandler({
//     static: {
//       '404': './public/404.html'
//     }
//    });
   
//    app.use( expressErrorHandler.httpError(404) );
//    app.use( errorHandler );
   
   
   //===== 서버 시작 =====//
   
   // 프로세스 종료 시에 데이터베이스 연결 해제
   process.on('SIGTERM', function () {
       console.log("프로세스가 종료됩니다.");
   });
   
   app.on('close', function () {
       console.log("Express 서버 객체가 종료됩니다.");
   });
   
   // Express 서버 시작
   http.createServer(app).listen(app.get('port'), function(){
     console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
   });
   