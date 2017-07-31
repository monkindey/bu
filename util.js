exports.cmdToSpawn = function(cmd) {
  const cmds = cmd.split(' ');
  return [cmds[0], cmds.slice(1)];
};
