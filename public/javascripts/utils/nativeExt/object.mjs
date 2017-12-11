import _ from 'underscore';

export function defineDescriptors(entries, {enumerable = true, configurable = false, writable = false} = {}){
  const descriptors = {};
  for (const key of Reflect.ownKeys(entries)) {
    const descriptor = Reflect.getOwnPropertyDescriptor(entries, key);
    const isGetter = _.isFunction(descriptor.get);
    const isSetter = _.isFunction(descriptor.set);
    if (isGetter) {
      descriptors[key] = {configurable, enumerable, 'get': descriptor.get};
    }
    if (isSetter) {
      descriptors[key] = {configurable, enumerable, 'set': descriptor.set};
    }
    if (!isGetter && !isSetter) {
      descriptors[key] = {configurable, enumerable, writable, 'value': entries[key]};
    }
  }
  return descriptors;
}
export function defineProps(target, entries, entryConfig){
  return Object.defineProperties(target, Object.defineDescriptors(entries, entryConfig));
}
export function seekableIterator(iterator){
  let seekValue;
  const _next_ = iterator.next.bind(iterator);
  return _.extendOwn(iterator, {
    next(...args){
      if (seekValue == null) {
        return _next_(...args);
      }
      return this.nextIfSeek();
    },
    seek(...args){
      if (seekValue == null) {
        seekValue = _next_(...args);
      }
      return seekValue;
    },
    nextIfSeek(){
      const result = seekValue;
      seekValue = null;
      return result;
    }
  });
}
export function produce(proto, exts){
  Reflect.setPrototypeOf(exts, proto);
  return exts;
}
_.defaults(Object, {
  defineDescriptors, defineProps, seekableIterator, produce,
  *entries(pojo){
    const keyIter = Object.keys(pojo)[Symbol.iterator]();
    for (let result = keyIter.next(); !result.done; result = keyIter.next()) {
      yield [result.value, pojo[result.value]];
    }
  },
  *values(pojo){
    const keyIter = Object.keys(pojo)[Symbol.iterator]();
    for (let result = keyIter.next(); !result.done; result = keyIter.next()) {
      yield pojo[result.value];
    }
  }
});
