/**
 * @description Extend the primitive JavaScript classes (e.g. RegExp, Array, Audio and so on).
 */
import './math';
import './array';
import './date';
import './string';
import './object';
import './promise';
import './fetch';
import './location';
import _ from 'underscore';

_.defaults(Number.prototype, {
  '_toFixed': Number.prototype.toFixed,
  toFixed(...args){
    return Number(this._toFixed(...args)).toString();
  },
  convergeToZero(){
    if (this < 0.0001 && this > 0 || this > -0.0001 && this < 0) {
      return 0;
    }
    return this;
  }
});

