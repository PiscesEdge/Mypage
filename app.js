//installed third party packages here as follows: http paths, express,...
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//
let indexRouter = require('./routes/index');//this is for the main 
let usersRouter = require('./routes/users');//this router is for users

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //path.join joins to the regular path
app.set('view engine', 'ejs'); //express -e configures our view engine to ejs so the code in index.ejs actually works with ejs language only

//activation
app.use(logger('dev')); //activating login w the dev system
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//static route activates, anything in public folder would already be part of our path, meaning we dont have to make individual routes for them if they're inside the public folder. so if we want something to be available to everybody we put it in public folder
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error', { title: 'Error' });
});

module.exports = app;
