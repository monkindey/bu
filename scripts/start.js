const mri = require('mri');
const args = mri(process.argv.slice(2));
const bu = require('../index.js');

bu(args.path);