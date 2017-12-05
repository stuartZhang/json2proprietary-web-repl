'use strict';

module.exports = {
  'parserOptions': {
    'ecmaVersion': 5,
    'sourceType': 'script',
    'ecmaFeatures': {
      'globalReturn': true,
      'impliedStrict': false,
      'jsx': false,
      'experimentalObjectRestSpread': false
    }
  },
  'env': {
    'node': true
  },
  'extends': [
    'eslint:recommended',
    './build-tools/js/eslint/eslint-config-connect-errors.js',
    './build-tools/js/eslint/eslint-config-connect-bestpractice.js',
    './build-tools/js/eslint/eslint-config-connect-strict.js',
    './build-tools/js/eslint/eslint-config-connect-var.js',
    './build-tools/js/eslint/eslint-config-connect-node.js',
    './build-tools/js/eslint/eslint-config-connect-es6.js',
    './build-tools/js/eslint/eslint-config-connect-stylistic.js'
  ],
  'parser': 'babel-eslint',
  'root': true
};
