const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');


const mysqlDB = require('./database/mysqlDB');
mysqlDB();

const app = express();

// Body Parser Use First
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Page History
// ref: https://github.com/bripkens/connect-history-api-fallback
app.use(history());

// router 등록
const defaultRouter = require('./routes/index');
app.use('/corp', defaultRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
  res.render('error');
});

module.exports = app;
