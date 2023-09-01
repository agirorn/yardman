const PS_TREE = require('pidtree');
const { promisify } = require('util');
const { spawn } = require('child_process');

const psTree = promisify(PS_TREE);
const isWin32 = process.platform === "win32";

const winKill = (_signal) => (pids) => new Promise((resolve) => {
  try {
    spawn('taskkill', pids.revers().map(i => ["\PID", i]).flat())
      .on('close', resolve)
  } catch(e) {
    console.log(`ERROR`, e);
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
    // Swalloing the error since sometimes on windows the psTree 
    // can find pids sicne the process has allready stoped
    if (!isWin32) {
      throw error;
    }
  });

module.exports = killTree;
