var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "1hgFV788Nj",
  password: "Ome5S6Rz8J",
  database: "1hgFV788Nj",
});

exports.handler = async (event) => {
  // TODO implement

  console.log(event.queryStringParameters);
  return new Promise((resolve, reject) => {
    var n = event.queryStringParameters;
    n = n.email;
    console.log(n);
    connection.query(
      "SELECT COUNT(*) as emailcount FROM users where email =" +
        mysql.escape(n) +
        ";",
      function (err, rows, result) {
        if (err) throw err;
        console.log(result);
        var x = JSON.stringify(rows[0].emailcount);
        var obj = {
          count: x,
        };

        resolve({
          statusCode: 200,
          //  Uncomment below to enable CORS requests
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(obj),
        });
      }
    );
  });
};
