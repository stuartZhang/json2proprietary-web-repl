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
    'eslint-config-amo/presets/eslint-config-errors.js',
    'eslint-config-amo/presets/eslint-config-bestpractice.js',
    'eslint-config-amo/presets/eslint-config-strict.js',
    'eslint-config-amo/presets/eslint-config-var.js',
    'eslint-config-amo/presets/eslint-config-node.js',
    'eslint-config-amo/presets/eslint-config-es6.js',
    'eslint-config-amo/presets/eslint-config-stylistic.js'
  ],
  'parser': 'babel-eslint',
  'plugins': [
    'eslint-config-amo/eslint-plugin-sweetjs.js',
    'eslint-config-amo/eslint-plugin-es6.js'
  ],
  'root': true
};
