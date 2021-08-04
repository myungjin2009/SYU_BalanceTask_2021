
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
var mysql = require('mysql');

//======패스포드아용===//
var passport =require('passport');
var localStrategy=require('passport-local').Strategy;
var KakaoStrategy=require('passport-kakao').Strategy;
const jwt = require('jsonwebtoken');
require("dotenv").config();
const cookie = require('cookie');

//const YOUR_SECRET_KEY = process.env.SECRET_KEY;





//===== MySQL 데이터베이스 연결 설정 =====//
var pool      =    mysql.createPool({
    connectionLimit : 10, 
    host     : 'localhost',
    user     : 'root',
    password : '1111',
    database : 'test',
    debug    :  false
});



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

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    const sql = "select * from users where id =?";
    const post = [id];
    conn.query(sql, post, (err, results, fields) => {
      const user = results[0];
      done(err, user);
    });
  });
// 카카오 로그인 세션



passport.use(
    "kakao-login",
    new KakaoStrategy({
        clientID : '6e9775355a9f75a716cfc8153f2ff2eb', 
        callbackURL : 'http://localhost:3000/kakao/oauth'}, 
        (accessToken, refreshToken, profile, done) => {
      console.log(profile);
    }));

router.get("/kakao", passport.authenticate("kakao-login"));
router.get(
  "/kakao/callback",
  passport.authenticate("kakao-login", {
    successRedirect: "/",
    failureRedirect: "/api/auth/fail"
  })
);

//==패스포트==//

//===== 라우팅 함수 등록 =====//

// 라우터 객체 참조//var router = express.Router();



router.route('/api/signup').post(function(req, res) {
	console.log('/process/adduser 호출됨.');
    
    var paramId = req.body.email || req.query.email;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramAgreement = req.body.isCheck || req.query.isCheck;

    const encryptedPassowrd = bcrypt.hashSync(paramPassword, 10);
    
	if (pool) {
		addUser(paramId, paramName, encryptedPassowrd ,paramAgreement, function(err, addedUser) {
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
			if (addedUser) {
				console.dir(addedUser);

				
	        	
	        	var insertId = addUser.insertId;
	        	console.log('추가한 레코드의 아이디 : ' + insertId);
	        	
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 성공</h2>');
				res.end();
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가  실패</h2>');
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName + ', ' + paramAgreement);
	
});

app.post("/api/user/login", (req, res) => {
  let isUser = false;
  const { id, password } = req.body;
  // console.log("name :", userId);
  // console.log("name :", userPassword);
  // console.log(req.headers.cookie);
  var cookies = cookie.parse(req.headers.cookie);
  console.log(cookies.user);
  const encryptedPassowrd = bcrypt.hashSync(password, 10);
  // bcrypt.compare(plainPassword, this.password, function(err, isMatch){
  //   if(err) return cb(err)
  //   cb(null, isMatch)
  // })
  const sql = "SELECT id, password FROM user";
  pool.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      rows.forEach((info) => {
        var same = bcrypt.compareSync(password, info.password)
        if (info.id === id && same) {
          isUser = true;
          console.log("true");
        } else {
          console.log("false");
          return;
        }
      });
      if (isUser) {
        const YOUR_SECRET_KEY = process.env.SECRET_KEY;
        const accessToken = jwt.sign(
          {
            id,
          },
          YOUR_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        console.log(accessToken);
        res.cookie("user", accessToken);
        res.status(201).json({
          success:true,
          result: "ok",
          accessToken,
        });
      } else {
        res.status(400).json({ error: 'invalid user' });
      }
    }
  });
});

// 라우터 객체 등록
app.use('/', router);


//함수들 ======================================================================================//


var addUser = function(id, name, password, agreement, callback) {
	console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name + ', ');
	
	// 커넥션 풀에서 연결 객체를 가져옴
	pool.getConnection(function(err, conn) {
        if (err) {
        	if (conn) {
                conn.release();  // 반드시 해제해야 함
            }
            
            callback(err, null);
            return;
        }   
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

    	// 데이터를 객체로 만듦
    	var data = {id:id, name:name, agreement:agreement, password:password};
    	conn.query('ALTER TABLE user convert to charset utf8');

        
        // SQL 문을 실행함
        var exec = conn.query('insert into user set ?', data, function(err, result) {
        	conn.release();  // 반드시 해제해야 함
        	console.log('실행 대상 SQL : ' + exec.sql);
        	
        	if (err) {
        		console.log('SQL 실행 시 에러 발생함.');
        		console.dir(err);
        		
        		callback(err, null);
        		
        		return;
        	}
        	
        	callback(null, result);
        	
        });
        
        conn.on('error', function(err) {      
              console.log('데이터베이스 연결 시 에러 발생함.');
              console.dir(err);
              
              callback(err, null);
        });
    });
	
}



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
   