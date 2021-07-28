var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var thankyouRouter = require('./routes/thankyou');

const mongoSanitize = require("express-mongo-sanitize");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// // the register page
// app.get('/register', (req, res) => {
//   res.render('register')
// })

// // the Login page
// app.get('/login', (req, res) => {
//   res.render('login')
// })

// // the about page
// app.get('/about', (req, res) => {
//   res.render('about')
// })


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/thankyou', thankyouRouter);

// to replace prohibited characters with _, use:
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  res.render('404page', {
    title: '404 Page Not Found',
    pageNotFound: 'We could not find what you were looking for.'
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
