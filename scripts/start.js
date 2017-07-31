const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');

const bu = require('../index.js');
const cwd = process.cwd();
const { bundlePath } = require('../config');

fse.readJson(bundlePath).then(json => {
  let where = json[cwd];
  if (where) {
    bu(where).then(res => {
      console.log(chalk.green(res.msg));
    });
  } else {
    console.log(chalk.red(`Please init your bundle path in ${cwd}`));
  }
});
