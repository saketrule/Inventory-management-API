



//----***** NOTE: SET DEFAULT VALUES FOR DATABASE SCHEMAS

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
	[ "Users",
		"id INT AUTO_INCREMENT PRIMARY KEY,"+
		"username VARCHAR(30),"+
		"password VARCHAR(30),"+
		"phone VARCHAR(30),"+
		"email VARCHAR(30),"+
		"priviledge_level INT"
		],
	[  "Goods",
	       "id INT AUTO_INCREMENT PRIMARY KEY,"+
	       "Name VARCHAR(30),"+
	       "SportName VARCHAR(30),"+
	       "Quantity_Total INT DEFAULT 0,"+
	       "Quantity_available INT"
       ],
	[   "Orders",
	       "id INT AUTO_INCREMENT PRIMARY KEY,"+
         "GoodsId INT,"+
	       "Quantity INT,"+
	       "Supplier_Name VARCHAR(30),"+
	       "PriceperUnit INT,"+
	       "PurchaseDate VARCHAR(10),"+
	       "FOREIGN KEY(GoodsId) references Goods(id)"
	     ],
	[   "Damaged_Goods",
		"id INT AUTO_INCREMENT PRIMARY KEY,"+
		"Quantity_Damaged INT,"+
    "GoodsId INT,"+
    "UserId INT,"+
		"FineperUnit INT,"+
		"Payment_Status INT,"+
		"FOREIGN KEY(GoodsId) references Goods(id),"+
		"FOREIGN KEY(UserId) references Users(id)"
		],
	[   "Goods_Issued",
		"id INT AUTO_INCREMENT PRIMARY KEY,"+
		"Quantity INT,"+
    "GoodsId INT,"+
    "UserId INT,"+
		"FineperUnit INT,"+
		"Payment_Status INT,"+
		"FOREIGN KEY(GoodsId) references Goods(id),"+
		"FOREIGN KEY(UserId) references Users(id)"
		],
  [ "Goods_requested",
    "id INT AUTO_INCREMENT PRIMARY KEY,"+
    "GoodsId INT,"+
    "UserId INT,"+
    "Quantity INT,"+
    "Status INT,"+
    "FOREIGN KEY(GoodsId) references Goods(id),"+
		"FOREIGN KEY(UserId) references Users(id)"
  ]
]

// Create tables
var create_tables = function(){
	schemas.forEach(function(schema){
		var command = "CREATE TABLE IF NOT EXISTS " +schema[0]+ " (" + schema[1] + ")";
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

create_tables()
//ask("SELECT * FROM customers");
