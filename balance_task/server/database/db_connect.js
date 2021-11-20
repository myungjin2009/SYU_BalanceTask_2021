var mysql = require('mysql');
 

  var pool = mysql.createPool({
    connectionLimit : 100, 
    host     : 'localhost',
    user     : 'root',
    password : 'dlwjdal1290',
    database : 'test',
    debug    :  false
  });
 console.log(module.exports);

module.exports= {pool} ;
//module.exports.addUser={addUser};

