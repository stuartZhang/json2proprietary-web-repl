const rollupMiddleware = require('express-middleware-rollup');

module.exports = function mjsTranspiler(cliArgs, root, app){
  app.use('/javascripts', rollupMiddleware({
    root,
    'src': 'public',
    'destExtension': /-es5\.js$/,
    'bundleExtension': '.mjs',
    // 'rebuild': 'always',
    'bundleOpts': {
      'banner': '/* eslint-disable */',
      'sourceMap': cliArgs.isDebug ? 'inline' : false
    }
  }));
};
