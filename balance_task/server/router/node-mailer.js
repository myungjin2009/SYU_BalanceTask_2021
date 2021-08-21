const nodemailer = require("nodemailer");

const email = {
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "a43aa2b4b4983f",
    pass: "d0204f3443e51e",
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

const content = {
  from: "cubix101@naver.com", //보내는 사람 메일
  to: "43617add4e-6ccdf2@inbox.mailtrap.io", //mailtrap email address
  subject: "balance_task 인증메시지입니다",
  text: "nodemailer를 이용하여 email 인증 구현", //html로 선언할수도있당
};

send(content);
