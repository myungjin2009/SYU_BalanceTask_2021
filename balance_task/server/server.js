<<<<<<< HEAD
<<<<<<< HEAD
/**
 * session 사용하기
 * 
 * 웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
 *    http://localhost:3000/public/login2.html
 *
 * @date 2016-10-25
 * @author Mike
 */

// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');
  var app = express();
// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static');
 
  
app.use((req, res, next) => {
    console.log(req);
    next();
  });

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/test', (req, res) => {
  let name = req.query.name;
  res.render('test', {name});
})

// 에러 핸들러 모듈 사용
// Session 미들웨어 불러오기
var expressSession = require('express-session');


// 익스프레스 객체 생성
app.get('/hello',(req,res)=>{
  //res.sendFile('C:/Users/paikjeonghun/Desktop/21_hf052/balance_task/client/src/routes/Signup.js')
  res.sendFile('C:/Users/paikjeonghun/Desktop/21_hf052/balance_task/server/test.html')
})

// 기본 속성 설정
app.set('port', process.env.PORT || 5000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

app.use('/balance_task', static(path.join(__dirname, 'balance_task')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));


// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

// 로그인 라우팅 함수 - 로그인 후 세션 저장함
router.route('/hell').get(function(req, res) {
	console.log('hello 호출됨.');
    res.render('test');
		//res.redirect('/balance_task/server/views/test.html');
	
});



app.use('/', router);


// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('http://localhost:' + app.get('port'));
});

=======
=======
>>>>>>> 5c21aa3a127f45cc3a53c98a89ac74c4042cf5fe
const express = require("express");

const app = express();
const port = process.env.PORT || 5000; //5000포트

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/signup', (req, res)=>{
  console.log(req.body);
});

//app.get의 첫 번째 인자는 path, 두 번째 인자는 callback함수로써
// 화면에 보여줄 때는 res인자를 사용하여 클라이언트한테 보내준다.
app.listen(port, () => console.log(`Listening on port ${port}`));
<<<<<<< HEAD
//app.listen(port번호, callback함수) 포트번호에 맞게 서버를 열게한다.
>>>>>>> 5c21aa3a127f45cc3a53c98a89ac74c4042cf5fe
=======
//app.listen(port번호, callback함수) 포트번호에 맞게 서버를 열게한다.
>>>>>>> 5c21aa3a127f45cc3a53c98a89ac74c4042cf5fe
