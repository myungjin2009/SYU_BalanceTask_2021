//const { Router } = require('express');
const express = require('express');
const app = express();
var http = require('http')
  , path = require('path');
app.set('port', process.env.PORT || 3000);
var router=express.Router();
var cookieParser=require('cookie-parser');
var expressSession=require('express-session');
var bodyParser=require('body-parser');

const connect=require('./database');
connect();

app.use(express.urlencoded({extended: false}))
app.use(express.json())
//app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

//app.use('/views', (path.join(__dirname, 'views')));
app.use('/server', static(path.join(__dirname, 'server')));
// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));



// const goodsRouter = require("./routers/goods");
// app.use("/api", [goodsRouter]);

// const goodsRouter=require('./routes/goods')
// app.use('/goods',goodsRouter)
// const usersRouter=require('./routes/user')
// app.use('/user',usersRouter)

app.use((req, res, next) => {
  console.log(req);
  next();
});
//app.use(serveStatic(path.join(__dirname,"server")));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('balance_task', __dirname + '/balance_task');
app.set('view engine', 'html');

app.get('/test', (req, res) => {
  let name = req.query.name;
  res.render('test', {name});
})
//app.get('/Signup',(req,res)=>{
//  res.redirect('balance_task\client\src\routes\Signup.js');
//})
 // ../balance_task/client/src/routes/Signup.js

 router.route('/hello').get(function(req,res){
   console.log("signup 연결되었습니다. ");
   //res.redirect('C:/Users/paikjeonghun/Desktop/21_hf052/balance_task/server/views/test.html');
   //res.redirect('C:/Users/paikjeonghun/Desktop/21_hf052/balance_task/server/hello.html');
   res.redirect('/server/views/test.html');
  
 });

 app.use('/',router);

 http.createServer(app).listen(app.get('port'), function(){
  console.log('http://localhost:' + app.get('port'));
});

//app.listen(port, () => {
 // console.log(`listening at http://localhost:${port}`)
//})