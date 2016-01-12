var _ = require('lodash');
var async = require('async');
var Sequelize = require('sequelize');
var pg = require('pg');
var conString = process.env.DATABASE_URL || "postgres://aashna956:Charu@956@localhost:5432/spiceroute";
var chinese = require('../data/chinese.js');
var bar = require('../data/bar.js');
var indian = require('../data/indian.js');
var SmartyStreets = require('machinepack-smartystreets');
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

exports.lala =  function(req,res){
// Verify one or more addresses using the SmartyStreets API
SmartyStreets.verifyAddress({
authId: '7e77ed12-7cc9-69c1-0460-0eaa965a5855',
authToken: 'Z3jOMRT20sNRBE4DFAXw',
country:'Nigeria',
street: '36 Adeola Odeku St',
lastline: 'lalala, Victoria Island, Nigeria',
addressee: 'Spice Route',
candidates: '1, 5, or 10 (max value)',
}).exec({
// An unexpected error occurred.
error: function (err){
 console.log(err);
},
// OK.
success: function (response){
 console.log("Success");
},
});
};
