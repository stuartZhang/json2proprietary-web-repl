import '../nativeExt';
import _ from 'underscore';
import CircularJSON from 'circularjson';
import configJson from './config';
import sourceMappedStackTrace from 'sourcemappedstacktrace';

function ParseError(){

  function concatPath(dirname, filename){
    const dirnames = dirname.split('/');
    let filenames = filename.split('/');
    filenames = filenames.map(fn => {
      if (fn === '..') {
        dirnames.pop();
        return null;
      } else if (fn === '.') {
        return null;
      }
      return fn;
    }).filter(fn => fn != null);
    dirname = dirnames.join('/');
    filename = filenames.join('/');
    let result = `${dirname}${filename}`;
    if (!dirname.match(/\/$/) && !filename.match(/^\//)) {
      result = `${dirname}/${filename}`;
    }
    return result;
  }

  let sourceMap, sourceMapDirnames, sourceMapKeys;
  const sourceMapPattern = /.*\b((?:https?):\/\/(?:[^/]+)(?:\d+)(?=\/)(?:[^:]+)|file:\/\/[^:]+):(\d+):(\d+)\b.*/;
  const traceItemPattern = /\(([^()]+)\)\s*$/;
  const filePathPattern = /^(?:file:\/\/|https?:\/\/)/;
  const url = configJson.entry;
  let jsDir;
  if (url.indexOf('/') > -1) {
    jsDir = `${url.split(/\/(?=[^/]+$)/)[0]}/`;
  } else {
    jsDir = '';
  }
  (async () => {
    const res = await fetch(url);
    const jsText = await res.text();
    let smText = jsText.substring(jsText.lastIndexOf('\n') + 1); // Last Line
    const prefix = '//# sourceMappingURL=data:application/json;charset=utf-8;base64,';
    if (smText.indexOf(prefix) !== 0) {
      return;
    }
    smText = smText.substring(prefix.length);
    sourceMap = {[url]: atob(smText)};
    sourceMapKeys = Object.keys(sourceMap);
    sourceMapDirnames = {};
  })();
  return ({message, stack}) => {
    if (sourceMap == null || !configJson.bbjsStack) {
      return `${message}\n${stack}`;
    }
    const _sourceMap = {}, lines = [], rows = [];
    stack = stack.split('\n');
    stack.forEach(traceItem => {
      const groups = sourceMapPattern.exec(traceItem);
      if (groups) {
        lines.push(traceItem);
        rows.push(groups);
        const [, uri] = groups;
        sourceMapKeys.forEach(key => {
          const index = uri.indexOf(key) - 1;
          if (index < 0) {
            return;
          }
          if (sourceMapDirnames[key] == null) {
            sourceMapDirnames[key] = uri.substring(0, index);
            const pojo = JSON.parse(sourceMap[key]);
            pojo.sources = pojo.sources.map(source => {
              let dirName = `${sourceMapDirnames[key]}${jsDir}`;
              if (!sourceMapDirnames[key].match(/\/$/) && !jsDir.match(/^\//)) {
                dirName = `${sourceMapDirnames[key]}/${jsDir}`;
              }
              return concatPath(dirName, source);
            });
            sourceMap[key] = JSON.stringify(pojo);
          }
          _sourceMap[uri] = sourceMap[key];
        });
      }
    });
    let _stack = sourceMappedStackTrace.processSourceMaps(lines, rows, _sourceMap);
    _stack = _stack.map((traceItem, index) => traceItem.replace(traceItemPattern, (match, p1) => {
      if (filePathPattern.test(p1)) {
        return match;
      } else if (p1 === 'null:null:null') {
        const line = stack[index + 1];
        if (line) {
          const index = line.indexOf('@');
          if (index > -1) {
            return line.substring(index + 1);
          }
          return line;
        }
      }
      return `(${p1})`;
    }));
    return `${message}\n${_stack.join('\n')}`;
  };
}

function sfmt(...args){

  function stringify(value, placeholder){
    let tempStr;
    if (_.isError(value)) {
      return parseError(value);
    } else if (_.isNumber(value) || _.isBoolean(value)) {
      return String(value);
    } else if (_.isString(value)) {
      return value;
    } else if (_.isObject(value) || _.isArray(value)) {
      if (/%o/i.test(placeholder)) {
        console.log(value); // eslint-disable-line amo/no-console
        tempStr = '▲';
      } else if (value.name && value.message && value.stack) {
        return parseError(value);
      } else {
        try {
          tempStr = CircularJSON.stringify(value, null, 2);
        } catch (err) {
          console.log('<Circular Object> %o', value); // eslint-disable-line amo/no-console
          tempStr = `[Circular Object] ${Object.keys(value)}`;
        }
      }
      return tempStr;
    } else if (_.isFunction(value)) {
      return value.constructor.name;
    } else if (_.isNull(value) || _.isUndefined(value)) {
      return value;
    }
    return `unknown type (${typeof value})`;
  }

  const pattern = /%[a-zA-Z]/g;
  let groups;
  const template = args[0];
  let result = '';
  let lastIndex = 0;
  for (let i = 1; i <= 10 && (groups = pattern.exec(template)) != null; i++) {
    if (groups.index > 0) {
      result += template.substring(lastIndex, groups.index);
    }
    result += stringify(args[i], groups[0]);
    lastIndex = groups.index + 2;
    pattern.lastIndex = lastIndex;
  }
  if (template.length - lastIndex > 0) {
    result += template.substring(lastIndex);
  }
  return result;
}
/*
Category: Level
  + Category
      - 'all': '***'
  + Level
      - 'all': 'd', 'i', 'w', 'e'
'ws': 'i'
'all': 'all'
 */
const parseError = ParseError();
const FILTERS = {
  _is(rules, category, level, isInc){
    if (isInc == null) {
      isInc = true;
    }
    if (rules.hasOwnProperty(category)) {
      const levels = rules[category];
      if (_.isString(levels)) {
        switch (levels) {
        case '':
          return false;
        case 'all':
          return true;
        case 'd':
          if (isInc) {
            return true;
          }
          return levels === level;
        case 'i':
          if (isInc) {
            return ['i', 'w', 'e'].indexOf(level) > -1;
          }
          return ['d', 'i'].indexOf(level) > -1;
        case 'w':
          if (isInc) {
            return ['w', 'e'].indexOf(level) > -1;
          }
          return ['d', 'i', 'w'].indexOf(level) > -1;
        case 'e':
          if (isInc) {
            return levels === level;
          }
          return true;
        default:
          throw new Error(`Unknown rule log level: ${levels}`);
        }
      } else if (_.isArray(levels)) {
        return levels.indexOf(level) > -1;
      } else if (_.isNull(levels) || _.isUndefined(levels)) {
        return true;
      }
      throw new Error(`Unsupported Log Level Type: ${typeof levels}`);
    } else {
      return false;
    }
  },
  _isAll(rules, level){
    if (rules.hasOwnProperty('all')) {
      return this._is(rules, 'all', level);
    }
    return false;
  },
  _isIncluded(category, level){
    if (this._isAll(this.includes, level)) {
      return true;
    }
    return this._is(this.includes, category, level, true);
  },
  _isExcluded(category, level){
    if (this._isAll(this.excludes, level)) {
      return true;
    }
    return this._is(this.excludes, category, level, false);
  },
  is(category, level){
    const isEx = this._isExcluded(category, level);
    const isIn = this._isIncluded(category, level);
    if (isEx && isIn) {
      return !this.priorExcluded;
    } else if (isEx) {
      return false;
    }
    return isIn;
  }
};
Object.assign(FILTERS, configJson);
// Levels
const LEVELS = {
  d(callback){
    if (_.isObject(this) &&
        _.isString(this.category) &&
        !FILTERS.is(this.category, 'd')) {
      return [''];
    }
    return [`%c${sfmt('[DEBUG] %s', sfmt(callback()))}`, 'color:blue'];
  },
  i(callback){
    if (_.isObject(this) &&
        _.isString(this.category) &&
        !FILTERS.is(this.category, 'i')) {
      return [''];
    }
    return [`%c${sfmt('[INFO] %s', sfmt(callback()))}`, 'color:DarkGreen;font-size:1.05em;'];
  },
  w(callback){
    if (_.isObject(this) &&
        _.isString(this.category) &&
        !FILTERS.is(this.category, 'w')) {
      return [''];
    }
    return [`%c${sfmt('[WARN] %s', sfmt(callback()))}`, 'color:OrangeRed;font-size:1.1em;'];
  },
  e(callback){
    if (_.isObject(this) &&
        _.isString(this.category) &&
        !FILTERS.is(this.category, 'e')) {
      return [''];
    }
    return [`%c${sfmt('[ERROR] %s', sfmt(callback()))}`, 'color:red;font-size:1.15em;'];
  }
};
// Categories
const CATEGORIES = {};
for (const [catCode, catName] of Object.entries(configJson.categories)) {
  CATEGORIES[catCode] = function(...args){
    return Reflect.apply(this, {'category': catCode}, [() => sfmt('[%s] %s', catName, sfmt(...args))]);
  };
}
for (const [level, levelHandle] of Object.entries(LEVELS)) { // Levels
  LEVELS[level] = Object.freeze(Object.assign(levelHandle, CATEGORIES));
}
const sfmtWrapper = __context.__simpleLogFormat__ = Object.freeze(Object.assign(sfmt, LEVELS));
export {
  sfmtWrapper as sfmt,
  sfmtWrapper as default
};
