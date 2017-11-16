var express = require('express'),
app = express(),
port = process.env.PORT || 8081,
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Require mysql
var mysql = require('mysql');
// declaring variable as global
global.con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb"
});

// Connect to database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//importing route
var routes = require('./API/paths');
// Registering routes
routes(app);

// Starting server
var server = app.listen(port, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("App listening at http://%s:%s", host, port)
});
