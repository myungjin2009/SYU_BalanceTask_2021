const sql = require("../database/db_connect");
const fs=require("fs");
var express = require('express');
var router = express.Router();
var app = express();
const bcrypt=require('bcrypt');


let findId= (req, res, next) => {
    console.log("findpassword 호출됨");
    console.log(req.body);
    var paramauthNumber=req.body.authNumber || req.query.authNumber;
    var sendNumber=req.body.okNumber || req.query.okNumber;
    console.log(paramauthNumber, sendNumber);
    if(paramauthNumber == sendNumber){ 
        console.log("인증번호 맞다");
    }else{
        console.log("인증번호 틀리다");
    }

    next();
};
  
module.exports= {findId};