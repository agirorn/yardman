const PS_TREE = require('pstree.remy');
const { promisify } = require('util');
const { spawn } = require('child_process');

const psTree = promisify(PS_TREE);

const killTree = (pid, signal) => psTree(pid)
  .then((pids) => new Promise((resolve) => {
    spawn('kill', ['-s', signal, ...pids])
      .on('close', resolve);
  }));

module.exports = killTree;
