const path = require('path');

const fse = require('fs-extra');
const chalk = require('chalk');
const spawn = require('cross-spawn');

const bu = require('../index.js');
const cwd = process.cwd();
const { bundlePath, POST_COMMIT_FILE } = require('../config');
const { hasHook, joinHooksPath, makeSpawnPify } = require('../util');

// First, we should verfiy the cwd whether has the post-commit,
// and we exec it;
const hasPostCommitHook = hasHook(POST_COMMIT_FILE);

const spawnPify = makeSpawnPify(spawn);

hasPostCommitHook(cwd)
  .then(
    isExist =>
      isExist
        ? spawnPify('sh', [joinHooksPath(cwd, POST_COMMIT_FILE)], {
            stdio: 'inherit'
          })
        : Promise.resolve()
  )
  .then(() => {
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
  });
