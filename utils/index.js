const _ = require('underscore');

_.extendOwn(exports, {
  render(layout, args){
    return (req, res) => {
      res.render(layout, args);
    };
  },
  safe(func){
    return async (req, res, next) => {
      try {
        await func(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }
});
