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
    'amo-eslint-presets/eslint-config-errors.js',
    'amo-eslint-presets/eslint-config-bestpractice.js',
    'amo-eslint-presets/eslint-config-strict.js',
    'amo-eslint-presets/eslint-config-var.js',
    'amo-eslint-presets/eslint-config-es6.js',
    'amo-eslint-presets/eslint-config-stylistic.js'
  ],
  'parser': 'babel-eslint',
  'root': true,
  'rules': {
    'sweetjs/no-console': ['error'],
    'no-console': 'off'
  }
};
