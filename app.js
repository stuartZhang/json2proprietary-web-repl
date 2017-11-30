const _ = require('underscore');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const rollupMiddleware  = require('express-middleware-rollup');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/stylesheets/*.sass', (req, res, next) => next(_.extendOwn(new Error('Not Found'), {status: 404})));
app.use('/stylesheets', sassMiddleware({
  root: __dirname,
  src: 'public/stylesheets',
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use('/javascripts', rollupMiddleware({
  src: 'public',
  destExtension: /-es5\.js$/,
  bundleExtension: '.mjs',
  // rebuild: 'always',
  root: __dirname,
  bundleOpts: {
    sourceMap: 'inline'
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => next(_.extendOwn(new Error('Not Found'), {status: 404})));

// error handler
app.use(function(err, req, res, next) { // render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
