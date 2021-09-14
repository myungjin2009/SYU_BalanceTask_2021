// Express 기본 모듈 불러오기
"use strict";
const express = require("express"),
  http = require("http"),
  path = require("path");

const multer = require("multer");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

const app = express();
// Express의 미들웨어 불러오기
var bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  //static = require("serve-static"),
  errorHandler = require("errorhandler");

// 에러 핸들러 모듈 사용
var expressErrorHandler = require("express-error-handler");

// Session 미들웨어 불러오기
var expressSession = require("express-session");
//채팅
const server = app.listen(5000, () => {
  console.log("=================listening on 5000!=================");
});
const io = require("socket.io")(server);
//const server=http.createServer(app);
// const socketIO=require("socket.io");
// const io=socketIO(server);
var cors = require("cors");
const moment = require("moment");
const fs=require("fs");
//비밀번호
const bcrypt = require("bcrypt");
const saltRounds = 10;

//===== MySQL 데이터베이스를 사용할 수 있도록 하는 mysql 모듈 불러오기 =====//
//var mysql = require('mysql');
const sql = require("./database/db_connect");
//======패스포드아용===//
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

//로그인 , 유저 관련 모듈
var user = require("./user/adduser");
var signup = require("./router/signup");
var login = require("./router/login");
var logout = require("./router/logout");
var { node__mailer } = require("./router/node-mailer");

//그룹 관련 모듈
var { group_search } = require("./group/groupget");
var group_add = require("./group/group_add");
var { grouppart } = require("./group/grouppart");

//타임라인, 공지 관련 모듈
var { noticeget } = require("./groupboard/noticeget");
var { boardget1 } = require("./groupboard/boardget1");
var { votechange }=require("./groupboard/vote");
var { boardadd } = require("./groupboard/boardadd");

//jwt auth 모듈
var { auth } = require("./middleware/auth");

//mypage 모듈

var {mypage}=require("./mypage/mypage");
var {changeimage}=require("./mypage/changeimage");
var {changeintro}=require("./mypage/changeintro");

//그룹 캘린더 관련 모듈
var { group_calendar } = require("./group_calendar/group_calendar");
var { add_calendar } = require("./group_calendar/add_calendar");
var { del_calendar } = require("./group_calendar/del_calendar");
var { update_calendar } = require("./group_calendar/update_calendar");

// 알림 설정
var { arams }=require("./aram/aram");

//워커리스트
var { wokerget }=require("./wokerlist/wokerget");
// 익스프레스 객체 생성


// 설정 파일에 들어있는 port 정보 사용하여 포트 설정
app.set("port", process.env.PORT || 5000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));
//var parser=bodyParser.urlencoded({ extended: false });
// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
//app.use('/public', static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "src")));

// cookie-parser 설정
app.use(cookieParser());

//cors를 미들웨어로 사용하도록 등록
app.use(cors());

// 세션 설정
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

const upload = multer({dest: './upload'}); 	
	//var upload = multer({ storage: storage });
	app.use('/image', express.static('./upload'));
//===== 라우팅 함수 등록 =====//
// 라우터 객체 참조//var router = express.Router();
var router = express.Router();

app.post("/api/signup", signup,(req,res)=>{

  res.status(200).json({
    success: true,
    
  });
});

app.post("/api/user/login", login,(req,res)=>{

  res.status(200).json({
    success: true,
    
  });
});

app.post("/api/user/logout", logout,(req,res)=>{

  res.status(200).json({
    success: true,
    
  });
});

app.post("/api/user_email", node__mailer, (req, res) => {
  //미들웨어 통과해서 여기오면 AUTH가 TRUE
  console.log("mailer_success");
  //인증버호와 트루는 넘겨줌
  res.status(200).json({
    success: true,
    okNumber:req.authNum
  });
});

app.get("/api/user/auth",(req, res, next) => {
  if(req.cookies.user===undefined || req.cookies.user===null){
    console.log('아직 로그인 안됨');
    res.status(200).json({
      isAuth: false,
    });
    return ;
  }
  next();
}, auth, (req, res) => {
  //미들웨어 통과해서 여기오면 AUTH가 TRUE
  console.log("success");
  //로그인한 유저 정보를 넘겨줌
  console.log(req.array);
  res.status(200).json({
    //유저정보 제공
    //isAuth: true,
    group: req.array,
    isAuth: req.isAuth,
    name: req.name,
    token: req.token,
    id: req.id,
    //success: true,
    //groupname: req.group_name
  });
});

app.post("/api/group/search_card", upload.single("image"),group_search, (req, res) => {
  console.log("group get success");
  //console.log(req.array);
  if(req.array===undefined){
    return ;
  }
  //그룸들에 대한 모든 정보를 넘겨줌
  res.status(200).json({
    array: req.array,
    success: true,
  });
  
});

app.post("/api/group/create_group", group_add,(req,res)=>{
  console.log("그룹 추가");
  res.status(200).json({
    success: true,
    
  });
});

app.post("/api/group/participation",grouppart,(req,res)=>{
  res.status(200).json({
    success: true,
    
  });
});

app.get("/api/user/receive_mypage",upload.single("image"),mypage,(req,res)=>{
  console.log(
    "==========================================mypage==========================================="
  );
            console.log(req.name);
            let userarray=[]
            userarray.push({
              ProfileName: req.name,
              ProfileImage: req.user_image,
              FinishedPJ: 0,
              ContinuingPJ: 0,
              Score: req.evaluation_score,
              ProfileMessage: req.introduce
            });
            console.log(userarray);
            var array=[];
            const sql2="select * from `groups` g,groupusers i where g.group_no=i.group_no and i.user=?";
            sql.pool.query(sql2,req.id,(err,rows,fields)=>{  

            rows.forEach((info) => {
                req.group_name = info.group_name;
                req.startdate =info.startdate;
                req.makeuser =info.user;
                req.makehost =info.host;
                req.category =info.category;
                req.content =info.content;
                req.deadline =info.deadline;
                req.group_no=info.group_no;
                req.image=info.group_images;
                req.name=info.name;
                req.enjoy=info.enjoy;
                if(req.enjoy===null || req.enjoy===0){
                    req.enjoy=false;
                }
                req.complete=info.complete;
                if(req.complete===1){
                    req.complete=true;
                }
                array.push({
                    id:req.group_no,
                    group:req.group_name,
                    logo_src: "",
                    project_Hostt:req.makehost,
                    project_DeadLine:req.deadline,
                    project_StartLine:req.startdate,
                    favoriteList: req.enjoy,
                    Finished: req.complete,
                    logo: "hanium_logo"
                });
                  //console.log(array);
            })
            req.array=array;
            let time=moment().format('YYYY-MM-DD HH:mm:ss');
            const today= new Date(time);
            req.FinishedPJ=0;
            req.ContinuingPJ=0;
            
            for(var i=0;i<array.length;i++){
              
                if(array[i].project_DeadLine<=today){
                    userarray[0].FinishedPJ=userarray[0].FinishedPJ+1;                   
                }else{
                  userarray[0].ContinuingPJ=userarray[0].ContinuingPJ+1;
                }
            }
            res.status(200).json({
                success: true,
                profile:userarray[0],
                project_list:req.array,
              });
      });         
  
});


app.post("/api/user/update_mypage/message",changeintro, (req, res) => {
  res.status(200).json({
    success: true,
  });
});

app.post("/api/user/update_mypage/photo",upload.single("image"),changeimage, (req, res) => {
  res.status(200).json({
    success: true,
  });
});

app.post("/api/group/timeline", boardget1, (req, res) => {
  console.log(
    "==========================================timesuccess==========================================="
  );
  console.log(req.array);
  if(req.array===undefined){
    res.status(200).json({
      array: [],
      success: true,
    });
    return ;
  }
  //console.log(req.urlgroup);
  //timeline에 해당하는 게시물을 가져와서 넘겨준다.
  let all_array = req.array;
  let all_array2 = "";
  // console.log(req.board_number);
  sql.pool.getConnection(function (err, conn) {
    if (err) {
      if (conn) {
        conn.release(); // 반드시 해제해야 함
      }

      callback(err, null);
      return;
    }
    console.log("데이터베이스 연결 스레드 아이디 : " + conn.threadId);

    for (let i = 0; i < req.array.length; i++) {
      let vote_list = [];
      console.log(req.array[i].id);
      conn.query(
        "select * from vote v, user u where board_number=? and u.id=v.user and v.group='"+req.urlgroup+"'",
        req.array[i].id,
        async function (err, rows, fields) {
          //conn.release(); // 반드시 해제해야 함
          console.log("실행 대상 SQL : ");
          await rows.forEach(async (info, index, newarray) => {
            var discuss = "";
            if (info.discuss === 1) {
              discuss = "찬성";
            } else if (info.discuss === 2) {
              discuss = "반대";
            } else {
              discuss = info.discuss;
            }
            console.log(info.name);
            console.log(info.group);
            console.log(info.board_number);
            console.log(discuss);

            vote_list.push({
              user_name: info.name,
              vote: discuss,
            });

            all_array[i].votes_list = vote_list;
            console.log(all_array[i]);
          });
          all_array2 = all_array;
          //console.log (all_array2);
          if (i === req.array.length - 1) {
            res.status(200).json({
              array: all_array2,
              success: true,
            });
          }
        }
      );

      conn.on("error", function (err) {
        console.log("데이터베이스 연결 시 에러 발생함.");
        console.dir(err);

        callback(err, null);
      });
    }
  });
});

app.post("/api/group/notice", noticeget, async (req, res) => {
    console.log(
      "====================================notice success========================================="
    );
    
    if(req.array===undefined){
      res.status(200).json({
        array: [],
        success: true,
      });
      return ;
    }
    res.status(200).json({
              array: req.array,
              success: true,
    });
        
});

      

app.post("/api/group/vote",votechange,(req,res)=>{
  res.status(200).json({
    success: true
  });
});

app.post("",upload.single("image"),boardadd,(req,res)=>{
  res.status(200).json({
    success: true
  });
})

app.post("/api/group_calendar/date", group_calendar,(req, res) => {
  console.log("==================================calendar=====================================");
  console.log(req.array);
  res.status(200).json({
    success: true,
    calendarList: req.array,
  });
});
app.post("/api/group_calendar/add_date", add_calendar,(req,res)=>{
  res.status(200).json({
    id: req.maxno,
    success: true,
  });
});
app.post("/api/group_calendar/delete_date", del_calendar,(req,res)=>{
  res.status(200).json({
    success: true
  });
});
app.post("/api/group_calendar/update_date",update_calendar,(req,res)=>{
  const sql2="select * from `groupcalendar` where process=?";
        var array=[];
        sql.pool.query(sql2,req.id,(err,rows,fields)=>{   
            if (err) {
                console.log(err);
            } else {
                //console.log(rows);
                console.log("groupcalendar come");
                
                rows.forEach((info,index,newarray) => {
                    req.process = info.process;
                    console.log(req.process);
                    req.group_name = info.group_name;
                    console.log( req.group_name );
                    req.start =info.start;
                    console.log( req.start );
                    req.do_text=info.title;
                    req.writer =info.writer;
                    console.log( req.writer );
                    req.end =info.end;
                    console.log( req.end );
                    //req.notice =info.notice;
                    array.push({
                    id: req.process ,
                    group:req.group_name,
                      //photo_name:req.title,
                    start:req.start,
                    end:req.end,
                    name:req.writer,
                    title:req.do_text,
                      //votes_list:null 
                    });
                    req.array=array;
                });
            }
            console.log(req.array);
            res.status(200).json({
            calendarList: req.array,
            success: true,
            });
        })
});

app.get("/api/user/load_worker",wokerget,(req,res,next)=>{
  res.status(200).json({
    array:req.array,
    success: true,
    });
})

app.post("",arams,(req,res,next)=>{
  res.status(200).json({
    success: true,
    });
})

io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    console.log(data);

    const { name, msg } = data;
    //const savechatting = new savechat(data.name);
    //savechatting.getchat();
    var ds = {
      chat_date: moment().format("hh:mm A"),
      chat_id: data.name,
      msg: data.msg,
    };

    sql.pool.getConnection(function (err, conn) {
      var exec = conn.query(
        "INSERT INTO chat set ?",
        [ds],
        function (err, result) {
          conn.release(); // 반드시 해제해야 함
          console.log("실행 대상 SQL : " + exec.sql);

          if (err) {
            console.log("SQL 실행 시 에러 발생함.");
            console.dir(err);

            return;
          }
        }
      );
    });
    io.emit("chatting", {
      name: name,
      msg: msg,
      time: moment().format("hh:mm A"),
    });

    // socket.join(room);
    // chat.to(room).emit('rMsg', data);
  });
});

//const chatlist=document.querySelector(".chatting-list")

//채팅한것을 가져올려고 만든 함수
// function savechat(id) {
//   console.log(id);
//   //$("#chatlist").empty()
//   this.getchat = () => {
//     const sql1 = "SELECT chat_id, chat_date, msg FROM chat";
//     sql.pool.query(sql1, (err, rows, fields) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(rows);
//         rows.forEach((info) => {
//           if (info.chat_id === id) {
//             const li = document.createElement("li");
//             li.classList.add(
//               nickname.value === info.chat_id ? "sent" : "received"
//             );
//             const dom = `<span class="profile">
//                   <span class="user">${info.chat_id}</span>
//                   <img class="image" src="data:image/jpeg;base64,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" alt="any">
//                   </span>
//                   <span class="message">${info.msg}</span>
//                   <span class="time">${info.chat_date}</span>`;
//             li.innerHTML = dom;
//             chatlist.append(li);
//             console.log("true");
//           } else {
//             console.log("false");
//             //router.route("/api/")
//             return;
//           }
//         });
//       }
//     });
//   };
// }

// //로그아웃 토큰 지우기
// app.get("/api/users/logout", auth, (req, res) => {
//   User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
//     if (err) return res.json({ success: false, err });
//     return res.status(200).send({
//       success: true,
//     });
//   });
// });
// 라우터 객체 등록

app.use("/", router);

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
process.on("SIGTERM", function () {
  console.log("프로세스가 종료됩니다.");
});

app.on("close", function () {
  console.log("Express 서버 객체가 종료됩니다.");
});

// Express 서버 시작
// http.createServer(app).listen(app.get("port"), function () {
//   console.log("서버가 시작되었습니다. 포트 : " + app.get("port"));
// });

//토큰 받기
//const { auth } = require("./middleware/auth");