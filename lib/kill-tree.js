const PS_TREE = require('pidtree');
const { promisify } = require('util');
const { spawn } = require('child_process');

const psTree = promisify(PS_TREE);
const isWin32 = process.platform === 'win32';

const winKill = (/* signal */) => (pids) => new Promise((resolve) => {
  try {
    spawn('taskkill', pids.revers().map((i) => ['\\PID', i]).flat())
      .on('close', resolve);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('ERROR', e);
    resolve();
  }
});

const unixKill = (signal) => (pids) => new Promise((resolve) => {
  spawn('kill', ['-s', signal, ...pids])
    .on('close', resolve);
});
const killCommand = isWin32 ? winKill : unixKill;

const killTree = (pid, signal) => psTree(pid)
  .then(killCommand(signal))
  .catch((error) => {
    if (error && error.message && error.message === 'No matching pid found') {
      // Swalloing the error since sometimes psTree can not find pids sicne the
      // process has allready stoped
      return;
    }
    throw error;
  });

module.exports = killTree;
