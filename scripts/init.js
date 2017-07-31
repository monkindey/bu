/**
 * Setting the env
 * 1. install husky
 * 2. add scripts in package.json
 */
const path = require('path');
const fs = require('fs');

const pify = require('pify');
const fse = require('fs-extra');
const spawn = require('cross-spawn');
const chalk = require('chalk');
const mri = require('mri');

const { cmdToSpawn } = require('../util.js');

const cwd = process.cwd();
const { bundlePath } = require('../config');

const DEFAULT_HOOKS_PATH = '/usr/local/etc/git/hooks/';
const POST_COMMIT_FILE = 'post-commit';
// Default
let hooksPath = DEFAULT_HOOKS_PATH;
const cmd = {};

const POST_COMMIT_EXAMPLE_PATH = path.resolve(__dirname, './post-commit');
const POST_COMMIT_PATH = path.resolve(hooksPath, POST_COMMIT_FILE);

const chmodPify = pify(fs.chmod);
/**
 * 1. hooksPath
 * 2. path
 */
const args = mri(process.argv.slice(2));

if (args.hooksPath) {
  hooksPath = args.hooksPath;
}

cmd.hooks = `git config --global core.hooksPath ${hooksPath}`;

function changeHooksPath(cmd) {
  return new Promise((resolve, reject) => {
    const args = cmdToSpawn(cmd);
    args.push({
      stdio: 'inherit'
    });
    const child = spawn.apply(null, args);

    child.on('close', code => {
      if (code !== 0) {
        reject();
        return;
      }
      resolve();
    });
  });
}

// Define map `cwd` to `bundle path`
function renderBundleJSON(file, map) {
  return fse.ensureFile(file).then(() =>
    fse
      .readJson(file)
      .then(json => {
        return fse.outputJson(file, Object.assign(json, map), {
          spaces: 2
        });
      })
      .catch(err => {
        return fse.writeJson(file, {}).then(() => renderBundleJSON(file, map));
      })
  );
}

fse
  // create hooksPath dir if not exist and default path is
  // `/usr/local/etc/git/hooks/`
  .ensureDir(hooksPath)
  // copy the post-commit into it
  .then(() => fse.copy(POST_COMMIT_EXAMPLE_PATH, POST_COMMIT_PATH))
  // change the file mode to be executed
  .then(() => {
    return chmodPify(POST_COMMIT_PATH, parseInt('0755', 8));
  })
  // change the global hooooks path
  .then(() => {
    return changeHooksPath(cmd.hooks);
  })
  .then(() => {
    return renderBundleJSON(bundlePath, {
      [cwd]: args.path
    });
  })
  .catch(err => {
    console.error(err);
  });
