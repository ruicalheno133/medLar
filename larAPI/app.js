var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db =  require('./database/connection');

var utentesRouter = require('./routes/utentes');
var lembretesRouter = require('./routes/lembretes');
var administracaoRouter = require('./routes/administracao');


var app = express();

// Database connection
db.authenticate()
  .then(() => {console.log('Connected to Database')})
  .catch(err => {console.log('Unable to connect to Database' + err)})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/utentes', utentesRouter);
app.use('/lembretes', lembretesRouter);
app.use('/administracao', administracaoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message)
});

module.exports = app;
