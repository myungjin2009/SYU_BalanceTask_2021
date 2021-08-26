let nodemailer = require("nodemailer"); //노드메일러 모듈을 사용할 거다!
const express = require("express");
const router = express.Router();

router.post("/sendEmail", async function (req, res) {
  let user_email = req.body.value; //받아온 email user_email에 초기화

  console.log(user_email);

  // 메일발송 함수

  let transporter = nodemailer.createTransport({
    service: "Naver", //사용하고자 하는 서비스
    prot: 587,
    host: "smtp.naver.com",
    secure: false,
    requireTLS: true,
    auth: {
      user: "cubix101@naver.com", //naver 이메일주소입력
      pass: "ehdtkdtjd486", //naver패스워드 입력
    },
  });

  let authNum = Math.random().toString().substr(2, 6); //6자리 인증번호

  let info = await transporter.sendMail({
    from: "cubix101@naver.com", //보내는 주소 입력
    to: user_email, //위에서 선언해준 받는사람 이메일
    subject: "balance_task 인증메시지입니다", //메일 제목
    html:
      "인증번호는 <b>" +
      authNum +
      "</b> 입니다. 화면으로 돌아가 인증번호를 입력해주세요.",
  });

  let checkmail = await new Object();
  checkmail.authNum = authNum;

  await res.send(checkmail);
});
