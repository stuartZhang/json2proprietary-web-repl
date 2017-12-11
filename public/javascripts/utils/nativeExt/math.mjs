import _ from 'underscore';

_.defaults(Math, /** @lends Math */ {
  'HALF_PI': Math.PI / 2,
  'DUAL_PI': Math.PI * 2,
  /**
   * @description Convert a radian value to its degree counterpart.
   * @param {Number} radians radian
   * @returns {Number} degree
   */
  rad2deg(radians){
    return radians / Math.PI * 180;
  },
  /**
   * @description Convert a degree value to its radian counterpart.
   * @param {Number} degrees degree
   * @returns {Number} radian
   */
  deg2rad(degrees){
    return degrees / 180 * Math.PI;
  },
  toFahrenheit(celsius){
    if (_.isNumber(celsius)) {
      return Math.round(celsius * 9 / 5 + 32);
    }
    return celsius;
  },
  toCelsius(fahrenheit){
    if (_.isNumber(fahrenheit)) {
      return Math.round((fahrenheit - 32) * 5 / 9);
    }
    return fahrenheit;
  }
});
