
// Configuration files
var config = require('./config');

// Connecting to Database port
// Ensure Database is running
var mysql = require('mysql');
var con = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Database table schemas:
var schemas = [
	[	"professor",
	"id INT AUTO_INCREMENT PRIMARY KEY,"+
	"name VARCHAR(30)"
	],
	[	"student",
	"id INT AUTO_INCREMENT PRIMARY KEY,"+
	"name VARCHAR(30)"
	]
]

// Create tables
var create_tables = function(){
	schemas.forEach(function(schema){
		var command = "CREATE TABLE " +schema[0]+ " (" + schema[1] + ")";
		con.query(command, function (err, result) {
	    if (err){
	    	console.log("make_database_err: Cannot create Table schema - ");
	    	console.log(schema);
	    	throw err;
	    }
	    console.log(schema[0] +" table sucessfully created");
	  	});
	});
};

// Add entries
var addentry = function(table,schema,values){
	var command = "INSERT INTO "+table+"("+schema+") VALUES "+values+")";
	con.query(command, function (err, result) {
    if (err){
    	console.log("make_database_err: Cannot insert into Table ");
    	console.log(table);
    	throw err;
    }
    console.log(values +" sucessfully inserted");
  	});
};

// Query
var ask = function(command){
	con.query(command, function(err, result, field){
		if(err){
			console.log("make_database_err: cannot complete query ");
			console.log(command);
			throw err;
		}
		console.log("successfully executed query");
		console.log(JSON.stringify(result));
	});
};

// create_tables()
ask("SELECT * FROM customers");
