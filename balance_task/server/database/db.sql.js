var mysql = require('mysql');
 

      
  var pool = mysql.createPool({
    connectionLimit : 10, 
     host     : 'localhost',
     user     : 'root',
    password : '1111',
     database : 'test',
    debug    :  false,
    multipleStatements: true
  });
 
  return {
    getConnection: function (callback) {    // connection pool을 생성하여 리턴합니다
      pool.getConnection(callback);
    },
    end: function(callback){
      pool.end(callback);
    },
    // query: function(callback){
    //     pool.query(callback);
    //   }
  }

  module.exports = pool;