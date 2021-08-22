const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

var addgroup = function (groupname, host, startdate, deadline, manager, category, content, callback) {
  //console.log("addUser 호출됨 : " + id + ", " + password + ", " + name + ", ");

  // 커넥션 풀에서 연결 객체를 가져옴
  sql.pool.getConnection(function (err, conn) {
    if (err) {
    if (conn) {
    conn.release(); // 반드시 해제해야 함
    }

    callback(err, null);
    return;
    }
    console.log("데이터베이스 연결 스레드 아이디 : " + conn.threadId);

    // 데이터를 객체로 만듦
    var data = {groupname:groupname, host:host , stardate:startdate, deadline: deadline, manger: manager , categroy:category, content:content  };
    
    // SQL 문을 실행함
    var exec = conn.query(
    "insert into groups set ?",
    data,
    function (err, result) {
        conn.release(); // 반드시 해제해야 함
        console.log("실행 대상 SQL : " + exec.sql);

        if (err) {
        console.log("SQL 실행 시 에러 발생함.");
        console.dir(err);

        callback(err, null);

        return;
        }

        callback(null, result);
    }
    );

    conn.on("error", function (err) {
    console.log("데이터베이스 연결 시 에러 발생함.");
    console.dir(err);

    callback(err, null);
    });
});
};

module.exports.addgroup = addgroup;
