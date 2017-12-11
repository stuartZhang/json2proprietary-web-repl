const rollupMiddleware = require('express-middleware-rollup');
const babelPlugin = require('express-middleware-rollup/rollup-plugin-babel');
const path = require('path');
const pkg = require('../package.json');

function itemBuild(key, value, quote){
  if (quote) {
    return `__context.${key} = '${value}'`;
  }
  return `__context.${key} = ${value}`;
}
module.exports = function mjsTranspiler(cliArgs, root, app){
  app.use('/javascripts', rollupMiddleware({
    root,
    'src': 'public',
    'destExtension': /-es5\.js$/,
    'bundleExtension': '.mjs',
    'rebuild': 'always',
    'rollupOpts': {
      'external': ['circularjson', 'jsoneditor', 'qs', 'sourcemappedstacktrace', 'underscore'],
      'plugins': [babelPlugin({ // .babelrc 自动装载
        'externalHelpers': true,
        'exclude': 'node_modules/**'
      })]
    },
    'bundleOpts': {
      'globals': {
        'circularjson': 'CircularJSON',
        'jsoneditor': 'JSONEditor',
        'qs': 'Qs',
        'sourcemappedstacktrace': 'sourceMappedStackTrace',
        'underscore': '_',
      },
      'sourceMap': cliArgs.isDebug ? 'inline' : false,
      'banner': entry => {
        const segment = "(typeof window === 'undefined' ? self : window)";
        const name = path.basename(entry).replace(/\.mjs$/, '.js');
        let dir, fullpath;
        if (this.isServiceWorker) {
          dir = 'location.origin';
          fullpath = `location.origin + '/${name}'`;
        } else {
          const slashNames = path.dirname(entry).replace(/\\/g, '/');
          dir = `location.origin + '/${slashNames}'`;
          fullpath = `location.origin + '/${slashNames}/${name}'`;
        }
        // 自定义全局常量
        return `${[
          `${segment}.__context = ${segment}`,
          itemBuild('__isMaster', "typeof window !== 'undefined'", false),
          itemBuild('__isWorker', "typeof window === 'undefined'", false),
          itemBuild('__dirname', dir, false),
          itemBuild('__filename', name, true),
          itemBuild('__filepath', fullpath, false),
          itemBuild('__appName', pkg.name, true)
        ].join(';\n')};`;
      }
    }
  }));
};
