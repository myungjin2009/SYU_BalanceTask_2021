var mysql = require('mysql2/promise');
 

      
  var pool = mysql.createPool({
    connectionLimit : 10, 
     host     : 'localhost',
     user     : 'root',
    password : 'dlwjdal1290',
     database : 'test',
    debug    :  false,
    multipleStatements: true
  });
 


  module.exports = {pool};
