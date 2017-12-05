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
    'sweetjs/browser': true,
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
    '../build-tools/js/eslint/eslint-config-connect-errors.js',
    '../build-tools/js/eslint/eslint-config-connect-bestpractice.js',
    '../build-tools/js/eslint/eslint-config-connect-strict.js',
    '../build-tools/js/eslint/eslint-config-connect-var.js',
    '../build-tools/js/eslint/eslint-config-connect-es6.js',
    '../build-tools/js/eslint/eslint-config-connect-stylistic.js'
  ],
  'parser': 'babel-eslint',
  'root': true,
  'rules': {
    'sweetjs/no-console': ['error'],
    'no-console': 'off'
  }
};
