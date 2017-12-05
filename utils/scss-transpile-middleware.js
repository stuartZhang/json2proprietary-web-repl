const postcss = require('postcss')([
  require('autoprefixer')
]);
const sass = require('node-sass');
const sassMiddleware = require('node-sass-middleware');
const postcssMiddleware = require('postcss-middleware');
const _ = require('underscore');

module.exports = function transpiler(cliArgs, root, app){
  app.get('/stylesheets/*.scss', (req, res, next) => next(_.extendOwn(new Error('Not Found'), {status: 404})));
  app.use('/stylesheets', sassMiddleware({
    root,
    // force: true,
    response: false,
    src: 'public/stylesheets',
    indentedSyntax: false, // true = .sass and false = .scss
    outputStyle: 'expanded', // nested, expanded, compact, compressed
    debug: cliArgs.isDebug,
    sourceMap: cliArgs.isDebug,
    sourceMapContents: true,
    compile(){
      return {
        render(renderOptions, done){
          sass.render(renderOptions, function(err, result1){
            done = done.bind(this);
            if (err) {
              return done(err);
            }
            postcss.process(result1.css.toString(), {
              map: result1.map == null ? undefined : {
                prev: result1.map.toString(),
                inline: true
              }
            }).then(result2 => done(null, _.defaults(result2, result1)), done);
          });
        }
      };
    }
  }));
};
