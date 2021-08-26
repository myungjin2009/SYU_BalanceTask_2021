var express = require('express');
var router = express.Router();
const sql=require('../database/db_connect');
var user = require('../user/adduser');
var {node__mailer}=require('../router/node-mailer');
const bcrypt=require('bcrypt');

if(req.body.authNumber == node__mailer.NUm){ 
    this.setState({
        usingemail : true
    })
  console.log("인증번호 맞다");
}