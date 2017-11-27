const _ = require('underscore');

_.extendOwn(exports, {
  render(layout, args){
    return (req, res) => {
      res.render(layout, args);
    };
  }
});
