var _ = require('lodash');
var async = require('async');
var Sequelize = require('sequelize');
var pg = require('pg');
var conString = process.env.DATABASE_URL || "postgres://aashna956:Charu@956@localhost:5432/spiceroute";
var chinese = require('../data/chinese.js');
var bar = require('../data/bar.js');
var indian = require('../data/indian.js');
exports.populateDatabase = function(req,res){
  var client = new pg.Client(conString);
  client.connect();
  _.each(indian.indian_menu, function(item){
    console.log(item);
    if(item.name!="Main Course" && item.name!="Breads & Rice" && item.name!= "Accompaniments"){
      _.each(item.description, function(m_item){
        client.query("insert into menu(item,price) values($1, $2)", [m_item.name, m_item.price]);
      });
  }
    else if (item.name=="Main Course") {
      _.each(item.description, function(m_type){
        _.each(m_type.description, function(m_item){
          client.query("insert into menu(item,price) values($1, $2)", [m_item.name, m_item.price]);
        });
      });
    }
  });

};

exports.getMenu = function(req,res){
  res.render('menu1', {chinese: chinese.chinese_menu, bar: bar.bar_menu, indian: indian.indian_menu});
};
exports.getAddToOrder = function(req,res){
  res.render('order', {dish: req.params.product});
};
exports.addToOrder = function(req,res){
  var client = new pg.Client(conString);
  var product = req.params.product;
  /* TODO: change the form in order.ejs to represent this change */
  var quantity = req.body.quantity;
  //console.log(req);
  var sess = req.session;
  var order_id;
  if(!product) {
    res.sendStatus(400);
    return;
  }
  client.connect();
  // CHECK IF USER HAS STARTED ORDER
  client.query("select * from orders where s_id = $1", [sess.id], function(err,result){
    if(err) {
      client.end();
      res.sendStatus(400);
    }
    //IF NOT, THEN START ONE
      if(result.rowCount===0){
        client.query("insert into orders(s_id) values($1)", [sess.id], function(err,result){
          if(err){
            client.end();
            res.sendStatus(400);
          }
        });
      }
    // AFTER THAT, RETRIEVE ORDER_ID AND ADD PRODUCTS TO THE ORDER BY INSERTING INTO CONTAINS
    client.query("select orderid from orders where s_id = $1", [sess.id], function(err,result){
    if(err){
      client.end();
      res.sendStatus(400);
    }
    order_id = result.rows[0].orderid;
    client.query("select * from contains where product=$1 and oderid=$2", [product,order_id], function(err,result){
      if(result.rowCount===0){
      client.query("insert into contains values($1,$2,$3)", [order_id, product, quantity], function(err){
        if(err){
        res.sendStatus(400);
        client.end();
        }
        res.render('alert', {quantity: quantity, dish: product, orderid: order_id});
        client.end();
        });
      }
      else {
        var old_quantity = parseInt(result.rows[0].quantity);
        var new_quantity = old_quantity + parseInt(quantity);
        client.query("update contains set quantity=$1 where product=$2 and oderid=$3", [new_quantity, product, order_id], function(err){
        if(err){
        res.sendStatus(400);
        client.end();
        }
        res.render('alert', {quantity: quantity, dish: product, orderid: order_id});
        client.end();
        });
      }
    });

 });
  });
};
exports.viewOrder = function(req,res){
  var client = new pg.Client(conString);
  var orderid = req.params.orderid;
  var order_items = [];
  var i=0;
  var sum=0;
  //console.log(orderid);
  if(!orderid) {
    res.sendStatus(400);
  }
  client.connect();
  //TODO: FIX THE SCHEMA TO _ORDER_ID INSTEAD OF ODER
  client.query("select * from contains where oderid = $1", [orderid],function(err,result){
    if(err){
      res.sendStatus(400);
      client.end();
    }
    console.log((result.rows).length);
    _.each(result.rows, function(item){ // name, quantity, orderid
      //console.log(item);
      client.query("select price from menu where item = $1", [item.product], function(err,result1){
       // console.log(result1);
        var total = item.quantity*result1.rows[0].price;
        sum+=total;
        var order_item = {
          name : item.product,
          price : total,
          quantity: item.quantity
        };
        order_items.push(order_item);
        i++;
        if(i==((result.rows).length)) {
          client.end();
          res.render('viewOrder', {order:order_items, sum: sum, orderid: orderid});
        }
      });
    });
  });
};
exports.placeOrder = function(req,res){

    req.assert('name', 'Name is required').notEmpty();           //Validate name
    req.assert('email', 'A valid email is required').isEmail();  //Validate email
    req.assert('phone', 'Please follow the specified format for phone numbers').isNumeric().isLength(10);
    req.assert('addr', 'Address is required').notEmpty();

    var errors = req.validationErrors();
    if( !errors){   //No errors were found.  Passed Validation!
       /* do things */
    }
    else {   //Display errors to user
      /* add code to let it retain entered information */
        res.render('placeOrder', {errors:errors});
    }
 };