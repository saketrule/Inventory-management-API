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
   "username='"+name+
   "' AND password='"+pass+"'";
   console.log(sqlcmd);
   con.query(sqlcmd,function(err,result){
     console.log("query complete");
     console.log(err);
     console.log(result.length);
     if(err){
       res.status(404).send("Database: Please correct query");
     }
     if(result.length === 1){
       res.json({
         'Status': 'Accepted. Welcome!'
       });
     }
     else{
       res.status(404).send("Database: Please correct query");
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
    res.json(JSON.parse(JSON.stringify(result)));
  });
};

exports.users_update = function(req,res){
  var q2 = req.body.username, q3 = req.body.password,q4=req.body.priveledge;
  if(defined(q4)==false){
    q4 = 0;
  }
  if(defined(q2)==false | defined(q3)==false){
    res.status(404).send("Missing important parameters");
  }
  else{
    var q1 = req.body.id;
    var mysql;
    if(defined(q1)==false){
      var values = "'"+q2+"','"+q3+"',"+q4;
      mysql = "INSERT INTO Users (username, password, priviledge_level) VALUES("+values+")";
    }
    else{
      var values = "'"+q2+"','"+q3+"',"+q4;
      mysql = "UPDATE Users SET username='"+q2+"', password='"+q3+"', priviledge_level="+q4+" WHERE id="+q1;
    }
    con.query(mysql,function(err,result){
      if(err){
        res.status(404).send("Database: Please correct query");
        throw err;
      }
      res.json({"status":"Updated sucessfully"});
  })
}
}

// Goods
exports.goods_search = function(req,res){
  var sqlcmd = "SELECT * FROM Goods WHERE 1 ";

  var q1 = req.query.name;
  if(typeof q1 !== 'undefined' & q1)
    sqlcmd += "AND Name = "+q1+" ";
  var q2 = req.query.sportname;
  if(typeof q2 !== 'undefined' & q2)
    sqlcmd += "AND SportName = '"+q2+"' ";

    con.query(sqlcmd,function(err,result){
      if(err){
        res.status(404).send("Database: Please correct query");
        throw err;
      }
      console.log(sqlcmd,result);
      res.json(JSON.parse(JSON.stringify(result)));
    });
  };

  exports.goods_update = function(req,res){
    console.log("got goods_update request");
    var q2 = req.body.goodsname, q3 = req.body.sportname,q4=req.body.totalquantity,q5=req.body.availquantity;
    if(defined(q4)==false){
      q4 = 0;
    }
    if(defined(q5)==false){
      q5 = 0;
    }
    if(defined(q2)==false | defined(q3)==false){
      res.status(404).send("Missing important parameters");
    }
    else{
      var q1 = req.body.id;
      console.log(q1);
      var mysql;
      if(defined(q1)==false){
        var values = "'"+q2+"','"+q3+"',"+q4+","+q5;
        mysql = "INSERT INTO Goods (Name,SportName,Quantity_Total,Quantity_available) VALUES("+values+")";
      }
      else{
        var values = "'"+q2+"','"+q3+"',"+q4+","+q5;
        mysql = "UPDATE Goods SET Name='"+q2+"', SportName='"+q3+"', Quantity_Total="+q4+",Quantity_available="+q5+" WHERE id="+q1;
      }
      con.query(mysql,function(err,result){
        console.log(mysql);
        if(err){
          res.status(404).send("Database: Please correct query");
          throw err;
        }
        res.json({"status":"Updated sucessfully"});
        console.log("done");
    })
  }
  }


// ORDERS

exports.orders_search = function(req,res){
  var sqlcmd = "SELECT * FROM Orders WHERE 1 ";

  var q1 = req.query.goodsid;
  if(typeof q1 !== 'undefined')
    sqlcmd += "AND GoodsId = "+q1+" ";
  var q2 = req.query.suppliername;
  console.log("query suppliername - ",q2);
  if(typeof q2 !== 'undefined')
    sqlcmd += "AND Supplier_Name = '"+q2+"' ";
console.log(sqlcmd);
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
    console.log(req.body);
    console.log(req.body.goodsid);
    var goodsid = req.body.goodsid, quantity = req.body.quantity,
     spname = req.body.suppliername, priceperunit = req.body.priceperunit,
     purchasedate=req.body.purchasedate;
     if(defined(goodsid)==false) {
       res.status(404).send("goodsid parameter is missing");
     }
     else if(defined(quantity)==false) {
       res.status(404).send("quantity parameter is missing");
     }
     else if(defined(spname)==false) {
       res.status(404).send("spname parameter is missing");
     }
     else if(defined(priceperunit)==false) {
       res.status(404).send("priceperunit parameter is missing");
     }
     else if(defined(purchasedate)==false) {
       res.status(404).send("purchasedate parameter is missing");
     }
     else{
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
         console.log("orders_update"+sqlcmd,result);
        res.json({'Status': 'Accepted. New row inserted!'
        });
        console.log("sent back");
        });
      }
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
        res.json(JSON.parse(JSON.stringify(result)));
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
          res.json(JSON.parse(JSON.stringify(result)));
        });
      };
      exports.goods_issued_update = function(req,res){
        var q2 = req.body.quantity, q3 = req.body.goodsid,q4=req.body.userid,q5=req.body.fineperunit,q6=req.body.paymentstatus;
        if(defined(q6)==false){
          q6 = 0;
        }
        if(defined(q5)==false){
          q5 = 0;
        }
        if(defined(q2)==false | defined(q3)==false | defined(q4)==false  ){
          res.status(404).send("Missing important parameters");
        }
        else{
          var q1 = req.body.id;
          var mysql;
          if(defined(q1)==false){
            var values = ""+q2+","+q3+","+q4+","+q5+","+q6;
            mysql = "INSERT INTO Goods_Issued (Quantity,GoodsId,UserId,FineperUnit,Payment_Status) VALUES("+values+")";
          }
          else{
            var values = ""+q2+","+q3+","+q4+","+q5+","+q6;
            mysql = "UPDATE Goods_Issued SET Quantity="+q2+", GoodsId="+q3+", UserId="+q4+",FineperUnit="+q5+",Payment_Status="+q6+"WHERE id="+q1;
          }
          con.query(mysql,function(err,result){
            if(err){
              res.status(404).send("Database: Please correct query");
              throw err;
            }
            res.json({"status":"Updated sucessfully"});
        })
      }
      }

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
          res.json(JSON.parse(JSON.stringify(result)));
        });
      };

      exports.goods_requested_update = function(req,res){
        console.log("goods_requested update request");
        var q2 = req.body.goodsid,q3=req.body.userid,q4=req.body.quantity,q5=req.body.status;
        if(defined(q4)==false){
          q4 = 0;
        }
        if(defined(q5)==false){
          q5 = 0;
        }
        if(defined(q2)==false | defined(q3)==false  ){
          res.status(404).send("Missing important parameters");
        }
        else{
          var q1 = req.body.id;
          var mysql;
          if(defined(q1)==false){
            var values = ""+q2+","+q3+","+q4+","+q5;
            mysql = "INSERT INTO Goods_requested (GoodsId,UserId,Quantity,Status) VALUES("+values+")";
          }
          else{
            mysql = "UPDATE Goods_requested SET GoodsId="+q2+", UserId="+q3+",Quantity="+q4+",Status="+q5+" WHERE id="+q1;
          }
          console.log(mysql);
          con.query(mysql,function(err,result){
            if(err){
              res.status(404).send("Database: Please correct query");
              throw err;
            }
            res.json({"status":"Updated sucessfully"});
        })
      }
      }
