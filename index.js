/**
 * @author monkindey
 * @date 2017.7.29
 */
const path = require('path');

const chalk = require('chalk');
const spawn = require('cross-spawn');

const cwd = process.cwd();
const dir = path.basename(cwd);

const pkg = require(path.resolve(cwd, 'package.json'));

/**
 * @path where to bundle
 * @options git bundle other options
 */
module.exports = function(bundledDir, options = {}) {
  bundledDir = bundledDir || (pkg.backup && pkg.backup.path);

  let bundledName = options.name || dir;
  const bundledPath = path.resolve(bundledDir, `${bundledName}.bundle`);

  return new Promise((resolve, reject) => {
    console.log(chalk.blue(`Happy backup ${bundledName}...`));

    // Spawn child process to exec git bundle
    // TODO The user can pass the args to git bundle
    const child = spawn(
      'git',
      ['bundle', 'create', bundledPath, '--all'],
      {
        stdio: 'inherit',
        cwd
      }
    );

    child.on('close', code => {
      if (code !== 0) {
        reject();
        return;
      }

      resolve({
        msg: `Backup ${bundledName} in ${bundledDir} Successfully!`
      });
    });
  });
};
