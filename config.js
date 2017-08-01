const path = require('path');

module.exports = {
  POST_COMMIT_FILE: 'post-commit',
  bundlePath: path.resolve(__dirname, 'bu.conf'),
  DEFAULT_HOOKS_PATH: '/usr/local/etc/git/hooks/'
};
