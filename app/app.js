var createError = require('http-errors');
var express = require('express');
var partials = require('express-partials');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var protectedRouter = require('./routes/protected');
var authRouter = require('./routes/auth');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Mount authentication routes
app.use('/api/auth', authRouter);

// Mount protected routes
app.use('/api/protected', protectedRouter);

module.exports = app;
