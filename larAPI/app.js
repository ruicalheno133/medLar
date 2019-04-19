var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db =  require('./database/connection');
var bodyParser = require('body-parser');


var administracaoAPIrouter = require('./routes/api/administracao');
var fichaMedicacaoAPIrouter = require('./routes/api/fichaMedicacao');
var funcionarioAPIrouter = require('./routes/api/funcionario');
var lembreteAPIrouter = require('./routes/api/lembrete');
var medicamentoAPIrouter = require('./routes/api/medicamento');
var utenteAPIrouter = require('./routes/api/utente');

var utentesRouter = require('./routes/utentes');
var lembretesRouter = require('./routes/lembretes');
var administracaoRouter = require('./routes/administracao');
var funcionariosRouter = require('./routes/funcionarios');


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
app.use(bodyParser());

// Rotas API
app.use('/api/utentes',utenteAPIrouter);
app.use('/api/administracao',administracaoAPIrouter);
app.use('/api/fichaMedicacao',fichaMedicacaoAPIrouter);
app.use('/api/funcionarios',funcionarioAPIrouter);
app.use('/api/lembrete',lembreteAPIrouter);
app.use('/api/medicamentos',medicamentoAPIrouter);

// Rotas prinicpais
app.use('/utentes', utentesRouter);
app.use('/lembretes', lembretesRouter);
app.use('/administracao', administracaoRouter);
app.use('/funcionarios',funcionariosRouter);

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
