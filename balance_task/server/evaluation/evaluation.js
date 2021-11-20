var express = require('express');
var router = express.Router();
const sql=require('../database/db_connect');
var group = require('../group_function/addgroup');
const bcrypt=require('bcrypt');
const moment = require("moment");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
    
let evaluation= (req, res, next) => {

  console.log("evaluation함수 호출됨");
  //console.log('사진이야',req.files);
  //console.log(req.body.category);
  console.log(req.body);
  let paramrater=req.body.id;
  let paramapp=req.body.app_evaluatuon;
  let paramgroup=req.body.group;
  let parammember=req.body.members_evaluation;
  
  let app_evaluation=paramapp.evalutation
  let app_point=paramapp.point
  let array=[];

  var data1 = ("('"+paramrater +"','"+ app_evaluation+"','"+ app_point+"')");

  parammember.forEach((info,index,newarray) => {
      req.id=info.id
      req.name=info.name
      req.point=info.point
      req.evaluation=info.evaluation

      var data2 = ("('"+req.id +"','"+ req.name+"','"+ req.point+"','" +paramgroup+"','"+paramrater+"','"+req.evaluation+"')")
      array.push(data2);
   })

   var replaced = array.toString().replace(/\[.*\]/g,'');
   var str = replaced.replace(/\"/gi, "");
   const sql9 = "INSERT INTO member_app(evaluated_user,name,point,group_name,rater,evaluation) VALUES "+str+";"
   sql.pool.query(sql9, (err, rows, fields) => {
        if (err) {
            console.log(err);
            console.log("오류");
        } else { 
            console.log("멤버 평가 종료 발신");
        }
    });

    const sql1 = "INSERT INTO app(user,evaluation,point) VALUES "+data1+";"
    console.log(sql1);
    sql.pool.query(sql1, (err, rows, fields) => {
        if (err) {
            console.log(err);
            console.log("오류");
        } else { 
            console.log("앱 평가 종료 발신");
            next();
        }
    });
 
    
};

module.exports= {evaluation};
