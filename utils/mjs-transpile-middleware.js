const rollupMiddleware = require('express-middleware-rollup');
const babelPlugin = require('express-middleware-rollup/rollup-plugin-babel');

module.exports = function mjsTranspiler(cliArgs, root, app){
  app.use('/javascripts', rollupMiddleware({
    root,
    'src': 'public',
    'destExtension': /-es5\.js$/,
    'bundleExtension': '.mjs',
    // 'rebuild': 'always',
    'rollupOpts': {
      'external': ['jsoneditor'],
      'plugins': [babelPlugin({ // .babelrc 自动装载
        'externalHelpers': true,
        'exclude': 'node_modules/**'
      })]
    },
    'bundleOpts': {
      'globals': {
        'jsoneditor': 'JSONEditor'
      },
      'sourceMap': cliArgs.isDebug ? 'inline' : false
    }
  }));
};
