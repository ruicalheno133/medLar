var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db =  require('./database/connection');
var passport = require('passport')
var cors = require('cors');

var utentesRouter = require('./routes/utentes');
var lembretesRouter = require('./routes/lembretes');
var administracaoRouter = require('./routes/administracao');
var funcionariosRouter = require('./routes/funcionarios');
var fichasMedicacaoRouter = require('./routes/fichasMedicacao');
var medicamentosRouter = require('./routes/medicamentos');
var authRouter = require('./routes/auth');

var app = express();

// Database connection
db.authenticate()
  .then(() => {console.log('Connected to Database')})
  .catch(err => {console.log('Unable to connect to Database' + err)})


app.use(passport.initialize())
app.use(cors({origin: true}));


require('./authentication/auth')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Rotas prinicpais
app.use('/utentes', utentesRouter);
app.use('/lembretes', lembretesRouter);
app.use('/administracao', administracaoRouter);
app.use('/funcionarios',funcionariosRouter);
app.use('/fichaMedicacao', fichasMedicacaoRouter);
app.use('/medicamentos',medicamentosRouter);
app.use('/auth', authRouter);

app.use('/static', express.static('public'))


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
