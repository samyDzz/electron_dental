var mysql = require('mysql');
var config = require("./db-config");

// Add the credentials to access your database
var connection = mysql.createConnection(config.db);

// connect to mysql
connection.connect(function (err) {
    // in case of error
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
    }

});

exports.get_users = () => {
  try{
    connection.query(`SELECT * FROM users`,[],async (err,rows,fields) => {
      if(err){
        console.log("err.stack");
        return false;
      }
      
      return 'foo';
    });

  }catch(e){
    console.log(e.stack);
    return false;
  }

}

