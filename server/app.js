/*
  homo-fingr
  server/app.js
*/

/*
  Set Up
  - pull in required modules
*/
var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
console.log('Server modules imported successfully');

/*
  Configuration
*/
var configDB = require('./config/database.js');
mongoose.connection.on('error', console.error);
mongoose.connect(configDB.url);
console.log('Database connection established');

/*
  Express App Set Up
*/
app.use(favicon(path.join(__dirname, '../client/public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public')));

app.use(session({
  secret: 'pants',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
console.log('Express app configured');

/*
  Routing
*/
require('./routes/api.js')(app, passport);
console.log('Routes loaded with app and passport');

// load SPA
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../client', 'index.html'));
// });

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
