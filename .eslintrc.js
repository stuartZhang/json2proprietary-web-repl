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
    'amo-eslint-presets/eslint-config-errors.js',
    'amo-eslint-presets/eslint-config-bestpractice.js',
    'amo-eslint-presets/eslint-config-strict.js',
    'amo-eslint-presets/eslint-config-var.js',
    'amo-eslint-presets/eslint-config-node.js',
    'amo-eslint-presets/eslint-config-es6.js',
    'amo-eslint-presets/eslint-config-stylistic.js'
  ],
  'parser': 'babel-eslint',
  'plugins': [
    'amo-eslint-presets/eslint-plugin-sweetjs.js',
    'amo-eslint-presets/eslint-plugin-es6.js'
  ],
  'root': true
};
