const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const sass = require('node-sass');
const sassMiddleware = require('node-sass-middleware');
const postcssMiddleware = require('postcss-middleware');

module.exports = function transpiler(cliArgs, root, app){
  if (!cliArgs.isDebug) {
    app.get('/stylesheets/*.scss', (req, res, next) => next(_.extendOwn(new Error('Not Found'), {status: 404})));
  }
  app.use('/stylesheets', sassMiddleware({
    force: true,
    root,
    src: 'public/stylesheets',
    indentedSyntax: false, // true = .sass and false = .scss
    outputStyle: 'extended', // compressed | extended
    debug: cliArgs.isDebug,
    sourceMap: cliArgs.isDebug,
    compile(){
      return {
        render(renderOptions, done){
          sass.render(renderOptions, function(err, result1){
            done = done.bind(this);
            if (err) {
              return done(err);
            }
            postcss([
              autoprefixer
            ]).process(result1.css.toString(), {
              map: result1.map == null ? undefined : {
                prev: result1.map.toString(),
                inline: true
              }
            }).then(result2 => {
              result2.stats = result1.stats;
              done(null, result2);
            }, err => {
              done(err);
            });
          });
        }
      };
    }
  }));
};
