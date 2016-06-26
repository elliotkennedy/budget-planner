var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dbManager = require('./modules/db-manager');

var users = require('./routes/user');
var auth = require('./routes/auth');
var healthcheck = require('./routes/healthcheck');

var app = express();

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// api routes
app.use('/user', users);
app.use('/auth', auth);
app.use('/health', healthcheck);

app.use('/client', express.static(path.join(__dirname, '../client')));

//todo probably shouldn't expose everything
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {


    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

// mongo connection
dbManager.connect();

module.exports = app;
