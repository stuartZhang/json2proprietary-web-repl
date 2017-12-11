import _ from 'underscore';

function promiseDefer(){
  if (promiseDefer.initialized !== true) {
    Object.defineProps(promiseDefer, {
      'initialized': true,
      [Symbol.hasInstance](obj){
        if (Reflect.apply(Object.prototype.toString, obj, []) === '[object promiseDefer]') {
          return _.isString(obj.state) && obj.promise instanceof Promise &&
                _.isFunction(obj.resolve) && _.isFunction(obj.reject);
        }
        return false;
      }
    }, {'enumerable': false, 'configurable': false, 'writable': false});
  }
  const _defer = {
    [Symbol.toStringTag]: 'promiseDefer'
  };
  _defer.state = 'pending';
  _defer.promise = new Promise((_resolve, _reject) => {
    _.extendOwn(_defer, {
      resolve(result){
        _resolve(result);
        _defer.state = 'resolved';
        return _defer;
      },
      reject(err){
        _reject(err);
        _defer.state = 'rejected';
        return _defer;
      }
    });
  });
  return _defer;
}

const EXTRA_PROPS = Symbol.for('Promise.EXTRA_PROPS');
Object.assign(Promise, {
  EXTRA_PROPS,
  [EXTRA_PROPS]: new WeakMap(),
  delay(mise, err, result){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (err == null) {
          resolve(result);
          return;
        }
        reject(err);
      }, mise);
    });
  },
  fromjQuery(defer){
    if (_.isFunction(defer.always)) {
      return new Promise((resolve, reject) => {
        defer.then(resolve, reject);
      });
    }
    return defer;
  },
  'defer': promiseDefer
});
_.defaults(Promise.prototype, {
  delay(mise){
    return this.then(result => Promise.delay(mise, undefined, result),
                     err => Promise.delay(mise, err))
               .promise(Promise[EXTRA_PROPS].get(this));
  },
  timeout(wait){
    return new Promise((resolve, reject) => {
      const timerId = setTimeout(() => {
        reject(new Error('Promise Time out'));
      }, wait);
      this.then(result => {
        clearTimeout(timerId);
        resolve(result);
      }, reject);
    });
  },
  finally(handle){
    return this.then(result => {
      const res = handle(result);
      if (res === undefined) {
        return result;
      }
      return res;
    }, error => {
      const res = handle(error);
      if (res === undefined) {
        return Promise.reject(error);
      }
      return res;
    });
  },
  promise(props){
    if (props) {
      const extraProps = Promise[EXTRA_PROPS].get(this) || {};
      Object.assign(extraProps, props);
      Promise[EXTRA_PROPS].set(this, extraProps);
      Object.assign(this, props);
    }
    return this;
  },
  tap(handle){
    return this.then(result => {
      let _res = handle(result);
      if (_res && _.isFunction(_res.then)) {
        _res = Promise.fromjQuery(_res);
        return _res.then(() => result);
      }
      return result;
    }).promise(Promise[EXTRA_PROPS].get(this));
  }
});
