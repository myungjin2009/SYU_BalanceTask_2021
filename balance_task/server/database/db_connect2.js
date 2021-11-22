var mysql = require('mysql2/promise');
 

      
  var pool = mysql.createPool({
     host     : 'localhost',
     user     : 'root',
    password : '1111',
     database : 'test',
    debug    :  false,
    multipleStatements: true
  });
 


  module.exports = {pool};
