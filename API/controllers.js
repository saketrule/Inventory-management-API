'use strict';

// Define all controllers here
var defined = function(itm){
  return (typeof itm !== 'undefined');
}

// USERS
exports.post_users_login = function(req, res){
  var name = req.body.username, pass = req.body.password;
   if(defined(name)==false)
     res.status(404).send("Name parameter is missing");
   if(defined(pass)==false)
     res.status(404).send("Password parameter is missing");
   var sqlcmd = "SELECT * FROM Users WHERE "+
   "username = "+name+
   "password = "+pass;
   con.query(sqlcmd,function(err,result){
     if(err){
       res.status(404).send("Database: Please correct query");
       throw err;
     }
     if(result.length == 1){
       res.json({
         'Status': 'Accepted. Welcome!'
       });
     }
     else{
       res.status(404).send("Database: Please correct query");
       throw err;
     }
   });

};
exports.users_search = function(req,res){
  var sqlcmd = "SELECT * FROM Users WHERE 1 ";

  var q1 = req.query.username;
  if(typeof q1 !== 'undefined')
    sqlcmd += "AND username = '"+q1+"' ";


  con.query(sqlcmd,function(err,result){
    if(err)
      throw err;
    console.log(sqlcmd,result);
    res.json(JSON.stringify(result));
  });
};

// Goods
exports.goods_search = function(req,res){
  var sqlcmd = "SELECT * FROM Orders WHERE 1 ";

  var q1 = req.query.name;
  if(typeof q1 !== 'undefined' & q1)
    sqlcmd += "AND Name = "+q1+" ";
  var q2 = req.query.sportName;
  if(typeof q2 !== 'undefined' & q2)
    sqlcmd += "AND SportName = '"+q2+"' ";

    con.query(sqlcmd,function(err,result){
      if(err){
        res.status(404).send("Database: Please correct query");
        throw err;
      }
      console.log(sqlcmd,result);
      res.json(JSON.stringify(result));
    });
  };


// ORDERS

exports.orders_search = function(req,res){
  var sqlcmd = "SELECT * FROM Orders WHERE 1 ";

  var q1 = req.query.goodsid;
  if(typeof q1 !== 'undefined' & q1)
    sqlcmd += "AND GoodsId = "+q1+" ";
  var q2 = req.query.suppliername;
  if(typeof q2 !== 'undefined' & q2)
    sqlcmd += "AND Supplier_Name = '"+q2+"' ";

    con.query(sqlcmd,function(err,result){
      if(err){
        res.status(404).send("Database: Please correct query");
        throw err;
      }
      console.log(sqlcmd,result);
      res.json(JSON.parse(JSON.stringify(result)));
    });
  };

  exports.orders_update = function(req, res){
    var goodsid = req.body.goodsid, quantity = req.body.quantity,
     spname = req.body.suppliername, priceperunit = req.body.priceperunit,
     purchasedate=req.body.purchasedate;
     if(defined(goodsid)==false) {
       res.status(404).send("goodsid parameter is missing");
     }
     if(defined(quantity)==false) {
       res.status(404).send("quantity parameter is missing");
     }
     if(defined(spname)==false) {
       res.status(404).send("spname parameter is missing");
     }
     if(defined(priceperunit)==false) {
       res.status(404).send("priceperunit parameter is missing");
     }
     if(defined(purchasedate)==false) {
       res.status(404).send("purchasedate parameter is missing");
     }
     var sqlcmd = "INSERT INTO Orders(GoodsId,Quantity,Supplier_Name,PriceperUnit,PurchaseDate) VALUES("
     +goodsid+","
     +quantity+",'"
     +spname+"',"
     +priceperunit+",'"
     +purchasedate+"')";
     con.query(sqlcmd,function(err,result){
       if(err){
         res.json({
           'Status': 'error!'
         });
         throw err;
       }
       console.log(sqlcmd,result);
      res.json({
        'Status': 'Accepted. New row inserted!'
      });
      });
     //console.log(name,sn,qt,qa);
  };


  exports.damaged_goods_search = function(req,res){
    console.log("query 2: "+req.query.ran);
    var sqlcmd = "SELECT * FROM Damaged_Goods WHERE 1 ";

    var q1 = req.query.goodsid;
    if(typeof q1 !== 'undefined')
      sqlcmd += "AND GoodsId = "+q1+" ";
    var q2 = req.query.userid;
    if(typeof q2 !== 'undefined')
      sqlcmd += "AND UserId = "+q2+" ";


      con.query(sqlcmd,function(err,result){
        if(err){
          res.status(404).send("Database: Please correct query");
          throw err;
        }
        console.log(sqlcmd,result);
        res.json(JSON.stringify(result));
      });
    };

    exports.damaged_goods_update = function(req, res){
      var goodsid = req.body.goodsid, quantity = req.body.quantitydamaged,
       userid = req.body.userid, fineperunit = req.body.fineperunit,
       paymentstatus=req.body.paymentstatus;
       if(defined(goodsid)==false) {
         res.status(404).send("goodsid parameter is missing");
       }
       if(defined(quantity)==false) {
         res.status(404).send("quantity parameter is missing");
       }
       if(defined(userid)==false) {
         res.status(404).send("spname parameter is missing");
       }
       if(defined(priceperunit)==false) {
         res.status(404).send("priceperunit parameter is missing");
       }
       if(defined(purchasedate)==false) {
         res.status(404).send("purchasedate parameter is missing");
       }
        res.json({
          'Status': 'Accepted. New row inserted!'
        });
       //console.log(name,sn,qt,qa);
    };



    exports.goods_issued_search = function(req,res){
      var sqlcmd = "SELECT * FROM Goods_Issued WHERE 1 ";

      var q1 = req.query.goodsid;
      if(typeof q1 !== 'undefined')
        sqlcmd += "AND GoodsId = "+q1+" ";
      var q2 = req.query.userid;
      if(typeof q2 !== 'undefined')
        sqlcmd += "AND UserId = "+q2+" ";

        con.query(sqlcmd,function(err,result){
          if(err)
            throw err;
          console.log(sqlcmd,result);
          res.json(JSON.stringify(result));
        });
      };

    // Goods requested goods_search
    exports.goods_requested_search = function(req,res){
      var sqlcmd = "SELECT * FROM Goods_requested WHERE 1 ";

      var q1 = req.query.userid;
      if(typeof q1 !== 'undefined')
        sqlcmd += "AND UserId = "+q1+" ";
      var q2 = req.query.goodsid;
      if(typeof q2 !== 'undefined')
        sqlcmd += "AND GoodsId = "+q2+" ";

        con.query(sqlcmd,function(err,result){
          if(err)
            throw err;
          console.log(sqlcmd,result);
          res.json(JSON.stringify(result));
        });
      };
