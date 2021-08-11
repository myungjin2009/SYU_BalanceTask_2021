// //쿠키의 토큰과 데베 유저의 토큰이 같은지 비교

// const { JsonWebTokenError } = require("jsonwebtoken");

//   var user = this;
//   const secretToken='mySuperSecretKey';
//   jwt.verify(token, "secretToken", function (err, decoded) {
//     user.findOne({ _id: decoded, token: token }, function (err, user) {
//       if (err) return cb(err);
//       cb(null, user);
//     });
//   });

// userSchema.statics.findByToken = function (token, cb) {
//   var user = this;

//   //user._id + "" = token;
//   //토큰 decode
//   jwt.verify(token, "secretToken", function (err, decoded) {
//     //유저 아이디를 이용해서 유저 찾은 후
//     //클라이언트에서 가져온 token과 db 토큰이같은지 확인
//     user.findOne({ _id: decoded, token: token }, function (err, user) {
//       if (err) return cb(err);
//       cb(null, user);
//     });
//   });
// };
