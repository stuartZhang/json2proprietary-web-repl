const hbs = require('hbs');
const path = require('path');
module.exports = function(root, app){ // 参考：https://cnodejs.org/topic/5706731ec5f5b4a959e91973
  app.set('view engine', 'hbs');
  app.set('views', path.join(root, 'views'));
  hbs.localsAsTemplateData(app);
  const blocks = {};
  hbs.registerHelper('extend', function(name, context){
    if (!blocks[name]) {
      blocks[name] = [];
    }
    blocks[name].push(context.fn(this));
  });
  hbs.registerHelper('block', name => {
    const val = (blocks[name] || []).join('\n');
    blocks[name] = [];
    return val;
  });
};
