'use strict';

module.exports = {
  'parserOptions': {
    'ecmaVersion': 5,
    'sourceType': 'module',
    'ecmaFeatures': {
      'globalReturn': false,
      'impliedStrict': false,
      'jsx': false,
      'experimentalObjectRestSpread': false
    }
  },
  'env': {
    'browser': true,
    'amo/browser': true,
    'es6': true
  },
  'globals': {
    'ArrayBuffer': false,
    '__isMaster': false,
    '__isWorker': false,
    '__context': false,
    '__dirname': false,
    '__filename': false,
    '__filepath': false,
  },
  'extends': [
    'eslint:recommended',
    'amo/eslint-config-bestpractice.js',
    'amo/eslint-config-errors.js',
    'amo/eslint-config-es6.js',
    'amo/eslint-config-possibleerrors.js',
    'amo/eslint-config-stylistic.js',
    'amo/eslint-config-var.js'
  ],
  'parser': 'babel-eslint',
  'root': true,
  'plugins': ['amo'],
  'rules': {
    'amo/no-console': ['error'],
    'no-console': 'off'
  }
};
