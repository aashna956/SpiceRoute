var _ = require('lodash');
var async = require('async');
var Sequelize = require('sequelize');
var pg = require('pg');
var conString = process.env.DATABASE_URL || "postgres://aashna956:Charu@956@localhost:5432/spiceroute";
var http = require('http');

var addressValidator = require('address-validator');
var Address = addressValidator.Address;

exports.checkAddress = function(req,res){
//the passed in address does not need to be an address object it can be a string. (address objects will give you a better likelihood of finding an exact match)
addressValidator.setOptions({'countryBias':'NG'});
address = '36 Adeola Odeku St,Victoria Island';

//`addressValidator.match.streetAddress` -> tells the validator that you think the input should be a street address. This data makes the validator more accurate. 
// But, sometimes you dont know.. in that cause you should use `addressValidator.match.unknown`
addressValidator.validate(address, addressValidator.match.streetAddress, function(err, exact, inexact){

     _.map(inexact, function(a) {
      return a.toString();
    });

/*
    //access some props on the exact match
    var first = exact[0];
    console.log(first.streetNumber + ' '+ first.street);
*/
});
};