import _ from 'underscore';

_.defaults(String, {
  fromBuffer(buffer){
    let result = '';
    for (let i = 0; i < buffer.length; i++) {
      result += String.fromCodePoint(buffer[i]);
    }
    return result;
  },
  reverse(){
    return this.split('').reverse().join('');
  }
});

_.defaults(String.prototype, {
  reverse(){
    return this.split('').reverse().join('');
  },
  splitByDot(){
    if (/\\+\./g.test(this)) {
      return this.reverse().split(/\.(?!\\+)/g).reverse().map(value => value.reverse().replace(/\\+\./g, '.'));
    }
    return this.split('.');
  },
  containDot(){
    const index = this.indexOf('.');
    if (index < 0) {
      return false;
    } else if (/\\+\./g.test(this)) {
      return /\.(?!\\+)/g.test(this.reverse());
    }
    return true;
  },
  unescapeDot(){
    if (this.indexOf('.') < 0) {
      return this;
    }
    return this.replace(/\\+\./g, '.');
  },
  at(index){
    return String.fromCodePoint(this.codePointAt(index));
  },
  toBuffer(){
    return this.split('').reduce((prev, current, cIndex) => {
      prev[cIndex] = current.charCodeAt(0) & 0xff;
      return prev;
    }, new Uint8Array(this.length));
  },
  isBoolTrue(){
    return /^(?:on|yes|y|true|t)$/i.test(this);
  }
});
