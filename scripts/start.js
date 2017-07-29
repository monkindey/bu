const mri = require('mri');
const args = mri(process.argv.slice(3));
const bu = require('../index.js');

/**
 * --path
 */
bu(args.path);
