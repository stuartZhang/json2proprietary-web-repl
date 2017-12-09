const _ = require('underscore');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const tmplEngine = require('./utils/template-engine');
const scssTransplie = require('./utils/scss-transpile-middleware');
const mjsTranpile = require('./utils/mjs-transpile-middleware');
const index = require('./routes/index');
const users = require('./routes/users');

module.exports = function appBuilder(cliArgs){
  const app = express();
  app.set('port', cliArgs.port);
  tmplEngine(__dirname, app); // view engine setup
  app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({'extended': false}));
  app.use(cookieParser());
  app.all(['**/.eslintrc.js', '**/.stylelintrc.js'], (req, res, next) => next(_.extendOwn(new Error('Not Found'), {'status': 404})));
  scssTransplie(cliArgs, __dirname, app);
  mjsTranpile(cliArgs, __dirname, app);
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', index);
  app.use('/users', users);
  // catch 404 and forward to error handler
  app.use((req, res, next) => next(_.extendOwn(new Error('Not Found'), {'status': 404})));
  app.use((err, req, res) => { // error handler
    res.status(err.status || 500);
    res.render('error', { // render the error page
      'message': err.message,
      'error': cliArgs.isDebug ? err : {}
    });
  });
  return app;
};
