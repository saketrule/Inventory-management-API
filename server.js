var express = require('express'),
app = express(),
port = process.env.PORT || 8081,
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Require mysql
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });
  var sql = "INSERT INTO customers (name) VALUES ('saket')";
  con.query(sql,function(err, result){
    if (err) throw err;
    console.log("Inserted value!");
  });
});

// var routes = require('./api/routes/route'); //importing route
// routes(app); //register the route
//
// var server = app.listen(port);
//  function () {
//    var host = server.address().address
//    var port = server.address()m.port
//    console.log("App listening at http://%s:%s", host, port)
// });
