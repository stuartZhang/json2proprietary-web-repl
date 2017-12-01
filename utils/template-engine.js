const hbs = require('hbs');
// 参考：https://cnodejs.org/topic/5706731ec5f5b4a959e91973
module.exports = function(app){
  hbs.localsAsTemplateData(app);
  let blocks = {};
  hbs.registerHelper('extend', function(name, context){
    if (!blocks[name]) {
      blocks[name] = [];
    }
    blocks[name].push(context.fn(this));
  });
  hbs.registerHelper('block', function(name){
    const val = (blocks[name] || []).join('\n');
    blocks[name] = [];
    return val;
  });
};
