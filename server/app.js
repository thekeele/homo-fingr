/*
  homo-fingr
  server/app.js
*/

/*
  Set Up
  - pull in required modules
*/
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var favicon = require('serve-favicon');
var path = require('path');

var app = express();
console.log('Server modules imported successfully');

/*
  Configuration
*/
var configDB = require('./config/database.js');
mongoose.connection.on('error', console.error);
mongoose.connect(configDB.url);
console.log('Database connection established');

require('./config/passport')(passport);
console.log('Passport config loaded');

/*
  Express App Set Up
*/
app.use(express.static(path.join(__dirname, '../client')));
app.use(favicon(path.join(__dirname, '../client/public/images', 'favicon.ico')));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'session-secret',
  name: 'session-name',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ url: configDB.url })
}));
app.use(passport.initialize());
app.use(passport.session());

console.log('Express app configured');

/*
  Routing
*/
require('./routes/api.js')(app, passport);
console.log('Routes loaded with app and passport');

// load SPA
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});
console.log('Loaded SPA');

/*
  Error handlers
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
