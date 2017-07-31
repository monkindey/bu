/**
 * Setting the env
 * 1. install husky
 * 2. add scripts in package.json
 */
const path = require('path');
const fs = require('fs');
const spawn = require('cross-spawn');
const chalk = require('chalk');
const mri = require('mri');

const cwd = process.cwd();
const pkgPath = path.resolve(cwd, 'package.json');
const args = mri(process.argv.slice(2));

// develop dependecies
const devDeps = ['husky'];

function install(devDeps) {
  return new Promise((resolve, reject) => {
    const cmd = 'yarn';
    const args = ['add'].concat(devDeps);
    const child = spawn(cmd, args, {
      stdio: 'inherit'
    });

    child.on('close', code => {
      if (code !== 0) {
        reject();
        return;
      }
      resolve();
    });
  });
}

// Write the scripts down
function renderPkg() {
  return new Promise((resolve, reject) => {
    const pkg = require(pkgPath);
    pkg.scripts = pkg.scripts || {};
    Object.assign(pkg.scripts, {
      postcommit: `bu start --path=${args.path}`
    });

    fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2), err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

console.log(chalk.blue('Installing the package, It maybe take some times'));
install(devDeps).then(() => {
  console.log(chalk.green('Install successfully'));
  return renderPkg();
});
