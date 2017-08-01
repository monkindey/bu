const fse = require('fs-extra');
const path = require('path');

exports.cmdToSpawn = function(cmd) {
  const cmds = cmd.split(' ');
  return [cmds[0], cmds.slice(1)];
};

exports.joinHooksPath = (root, type) =>
  path.resolve(root, `.git/hooks/${type}`);

exports.hasHook = type => root => fse.pathExists(exports.joinHooksPath(root, type));

exports.makeSpawnPify = spawn => (...args) => {
  return new Promise((resolve, reject) => {
    const child = spawn.apply(null, args);
    child.on('close', code => {
      if (code !== 0) {
        reject();
        return;
      }
      resolve();
    });
  });
};

