'use strict';

module.exports = function(app){
  var mycontrollers = require('./controllers');

  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

  app.route('/users/login')
  .post(mycontrollers.post_users_login);   //username, password => token if matched
  app.route('/users/search')
  .get(mycontrollers.users_search);   // username
  app.route('/users/update')        //
  .post(mycontrollers.users_update);

   app.route('/goods/search')
   .get(mycontrollers.goods_search);  //
  // app.route('/goods/update')
  // .post(mycontrollers.goods_update);

  // goodsid, suppliername
  app.route('/orders/search')
  .get(mycontrollers.orders_search);
  app.route('/orders/update')
  .post(mycontrollers.orders_update);

  // goodsid, userid
  app.route('/damaged_goods/search')
  .get(mycontrollers.damaged_goods_search);
  app.route('/damaged_goods/update')
  .post(mycontrollers.damaged_goods_update);

  // goodsid, userid
  app.route('/goods_issued/search')
   .get(mycontrollers.goods_issued_search);
  // app.route('/goods_issued/update')
  // .post(mycontrollers.goods_issued_update);
  //
  app.route('/goods_requested/search')
  .get(mycontrollers.goods_requested_search);
  // app.route('/goods_requested/update')
  // .post(mycontrollers.goods_requested_update);

}
