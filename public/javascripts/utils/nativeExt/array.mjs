import _ from 'underscore';

function defaultComparee(newValue, current){
  return newValue > current ? 1 : -1;
}

_.defaults(Array.prototype, /** @lends Array */ {
  clone(){
    return this.slice(0);
  },
  equals(array, compareFunc){
    if (!_.isArray(array) || this.length !== array.length) {
      return false;
    }
    return this.every((value, index) => {
      if (_.isFunction(compareFunc)) {
        return compareFunc(value, array[index]);
      }
      return Object.is(value, array[index]);
    });
  },
  last(num){
    if (_.isNumber(num)) {
      return this[this.length - num - 1];
    }
    return this[this.length - 1];
  },
  first(){
    return this[0];
  },
  delete(predicate, wantCount = false){
    let index = 0;
    while (index < this.length) {
      let lengthToDel = 1, result = predicate(this[index]);
      if (_.isNumber(result)) {
        if (result === 0) {
          result = false;
        } else {
          if (!isNaN(result)) {
            lengthToDel = result;
          }
          result = true;
        }
      }
      if (result) {
        this.splice(index, lengthToDel);
      } else {
        index++;
      }
    }
    if (wantCount) {
      return index;
    }
    return this;
  },
  pushGet(...elements){
    this.push(...elements);
    if (elements.length > 1) {
      return elements;
    } else if (elements.length === 1) {
      return elements[0];
    }
    return null;
  },
  tap(...args){
    this.forEach(...args);
    return this;
  },
  clear(){
    this.length = 0;
    return this;
  },
  insertBySort(newValue, comparee = defaultComparee){
    let left = 0, right = this.length - 1;
    while (right >= left) {
      const middle = Math.floor((left + right) / 2);
      const compareRes = comparee(newValue, this[middle]);
      if (compareRes < 0) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    this.splice(left, 0, newValue);
    return this;
  },
  async *mapTicksIter(handle, step){
    let endIndex, startIndex = 0;
    const extractor = resolve => {
      requestAnimationFrame(async () => {
        const subResult = await handle(this.slice(startIndex, endIndex), startIndex, endIndex);
        resolve(subResult);
      });
    };
    while (startIndex < this.length) {
      endIndex = Math.min(this.length, startIndex + step);
      const subResult = await new Promise(extractor);
      startIndex = endIndex;
      yield subResult;
    }
  },
  mapTicks(handle, step){
    return new Promise(resolve => {
      const result = [];
      let endIndex, startIndex = 0;
      const extractor = () => {
        if (startIndex >= this.length) {
          resolve(result);
          return;
        }
        endIndex = Math.min(this.length, startIndex + step);
        const subResult = handle(this.slice(startIndex, endIndex), startIndex, endIndex);
        const afterHandle = _subResult => {
          if (_.isArray(_subResult) && !_.isEmpty(_subResult)) {
            result.push(..._subResult);
          }
          startIndex = endIndex;
          requestAnimationFrame(extractor);
        };
        if (subResult instanceof Promise) {
          subResult.then(afterHandle);
        } else {
          afterHandle(subResult);
        }
      };
      requestAnimationFrame(extractor);
    });
  },
  partition(predicate){
    if (_.isNumber(predicate)) {
      const groupSize = predicate;
      const newArray = [];
      for (let endIndex = groupSize, startIndex = 0;
        startIndex < this.length;
        startIndex = endIndex, endIndex = startIndex + groupSize) {
        newArray.push(this.slice(startIndex, endIndex));
      }
      return newArray;
    }
    throw new Error(`Unsupport type: ${typeof predicate}`);
  }
});
