var express = require('express');
var expressValidator = require('express-validator');
var menu = require('./controllers/menu.js');
var ss = require('./controllers/smartyst.js');
var flash = require("express-flash");
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var session = require('express-session');
var app = express();
var pg = require('pg');
var secrets = require('./secrets');
var pgSession = require('connect-pg-simple')(session);
app.set('port', (process.env.PORT || 5000));

// TODO: ADD SESSION TIMEOUTS
// make express look in the public directory for assets (css/js/img)

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  store: new pgSession({
  pg : pg,                                  // Use global pg-module 
    conString : secrets.db,
    tableName : 'session'
  }),
  secret: secrets.sessionSecret,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/menu', menu.getMenu );
app.get('/', function(request, response) {
	response.render('public/index');
});
app.get('/order/placeOrder/:orderid', function(req,res){
  res.render('placeOrder', {errors:[], orderid: req.params.orderid});
});
app.get('/confirm/:orderid', menu.confirmOrder);
app.post('/order/placeOrder/:orderid', menu.placeOrder);
app.get('/:product', menu.getAddToOrder);
app.post('/:product', menu.addToOrder);
app.get('/view/:orderid', menu.viewOrder);
//app.get('/lal/lala', ss.lala);
app.get('/populate/db', menu.populateDatabase);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

exports.app = app;