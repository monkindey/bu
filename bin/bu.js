#! /usr/bin/env node

'use strict';

const spawn = require('cross-spawn');
const mri = require('mri');

// const script = process.argv[2];
/**
 * --path
 */
const args = mri(process.argv.slice(2));
const bu = require('../index.js');
bu(args.path);

// switch (script) {
//   case 'init':
//   case 'start':
//     spawn.sync('node', [require.resolve(`../scripts/${script}`)].concat(args));
// }
