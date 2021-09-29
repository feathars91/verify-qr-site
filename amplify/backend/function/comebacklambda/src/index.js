var mysql = require("mysql");
var connection = mysql.createConnection({
  host: 'database-1-instance-1.cb6w4rmtcnig.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Abel3186',
  database: 'contacts',
});

var r;
exports.handler = async (event) => {
  // TODO implement

return new Promise((resolve,reject) => {
var n = "Abelino.Chinchilla@gmail.com"
  connection.query("SELECT COUNT(*) as emailcount FROM users where email =" + mysql.escape(n) + ";", function (err,rows, result) {
    if (err) throw err;
    console.log(result);
    var x = JSON.stringify(rows[0].emailcount);
    var obj ={
      count:x
    };
    
    obj["poo"] = "loo";
    console.log(x);
    
    
    
    resolve(
                 {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
      headers: {
          "Access-Control-Allow-Origin": "*"
      },
    body: obj
  });
  

  
  
});
});
 

  
};
