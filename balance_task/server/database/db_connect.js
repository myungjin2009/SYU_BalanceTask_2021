var mysql = require('mysql');
 

  var pool = mysql.createPool({
    connectionLimit : 1000,
    host     : 'localhost',
    user     : 'root',
    password : '1111',
    database : 'test',
    debug    :  false
  });
 console.log(module.exports);

module.exports= {pool} ;
//module.exports.addUser={addUser};

