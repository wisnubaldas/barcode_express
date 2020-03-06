require('dotenv').config()
const compression = require('compression');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Sequelize = require('sequelize');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var logger = require('morgan');
var reload = require('reload');

var fs = require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pageRouter = require('./routes/pages');
// create a middlware that handles requests to `/eventstream`
var app = express();
reload(app)

// compress all responses
app.use(compression());

// Setup Session squelize
let myStore = new Sequelize({
  dialect: "sqlite",
  storage: "./db.development.sqlite"
});

app.use(session({
  secret: 'keyboard cat',
  store: new SequelizeStore({
    db: myStore
  }),
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  proxy: true // if you do SSL outside of node.
}))
myStore.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pages',pageRouter);

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
  // app.use(function (err, req, res, next) {
  //   console.error(err.stack)
  //   res.status(500).send('Something broke!')
  // })

  res.status(err.status || 500);
  // res.render('error');
  console.error(err.stack)
  res.send('Something broke!')
});


module.exports = app;
