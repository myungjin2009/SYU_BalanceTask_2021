const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

let node__mailer = (req, res, next) => {

  let user_email = req.body.value;
  res.send("잘 받음");

  const email = {
    service: "Naver",
    port: 587,
    secure: false,
    auth: {
      user: "cubix101@naver.com",
      pass: "ehdtkdtjd486",
    },
  };

  const send = async (data) => {
    nodemailer.createTransport(email).sendMail(data, function (err, info) {
      if (err) {
        console.log(error);
      } else {
        console.log(info);
        return info.response;
      }
    });
  };

  let authNum = Math.random().toString().substr(2, 6); //6자리 인증번호

  const content = {
    from: "cubix101@naver.com", //보내는 사람 메일
    to: user_email, //mailtrap email address
    subject: "balance_task 인증메시지입니다",
    //text: "nodemailer를 이용하여 email 인증 구현", //html로 선언할수도있당
    html:
      "인증번호는 <b>" +
      authNum +
      "</b> 입니다. 화면으로 돌아가 인증번호를 입력해주세요.",
  };

  send(content);
  req.authNum=authNum;
  next();
};

module.exports={node__mailer};
// module.exports.authNum=authNum;