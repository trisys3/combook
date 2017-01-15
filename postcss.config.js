'use strict';

const cssnext = require('postcss-cssnext');
const cssImport = require('postcss-import');
const nano = require('cssnano');
const filter = require('postcss-filter-plugins');

exports.plugins = [
  cssImport(),
  filter({silent: true}),
  cssnext(),
  nano(),
];
