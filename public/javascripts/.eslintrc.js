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
    'eslint-config-amo/presets/eslint-config-errors.js',
    'eslint-config-amo/presets/eslint-config-bestpractice.js',
    'eslint-config-amo/presets/eslint-config-strict.js',
    'eslint-config-amo/presets/eslint-config-var.js',
    'eslint-config-amo/presets/eslint-config-node.js',
    'eslint-config-amo/presets/eslint-config-es6.js',
    'eslint-config-amo/presets/eslint-config-stylistic.js'
  ],
  'parser': 'babel-eslint',
  'root': true,
  'rules': {
    'sweetjs/no-console': ['error'],
    'no-console': 'off'
  }
};
