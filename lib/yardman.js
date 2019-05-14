const watchers = require('./watchers');

function Yardman(config) {
  if (!(this instanceof Yardman)) {
    return new Yardman(config);
  }

  if (config.help) {
    return printHelp(config.options.stdout);
  }
  this.watchers = watchers(config);
}

Yardman.prototype.close = function close() {
  this.watchers.forEach((watcher) => {
    watcher.close();
    watcher.unwatch('*');
  });
};

function printHelp(stdout) {
  /* eslint-disable max-len */
  const write = (message) => {
    stdout.write(`${message}\n`);
  };

  write('yardman');
  write('');
  write('Watch files and run commands.');
  write('');
  write('Usage:');
  write('  yardman [options] [files ...] executable');
  write('  yardman [[options] [files ...] -exec executable ...] [options] [files ...] executable');
  write('');
  write('Options:');
  write('  -h, --help               This help text');
  write('  -v, --version            Display version information');
  write('  -x, --exec=executable    Executable to run');
  write('  -n, --npm=script         Executable an npm script with the --silent flag');
  write('  -X, --no-start           Do not run the executable on start');
  write('  -w, --watch=files...     Comma separated list of files to monitor for change');
  write('  -f, --filename=files...  Appends the path to the changed file to the command to execute');
  write('  -S, --kill-signal=signal Set the kill signal (SIGTERM, SIGKILL), defaults to SIGTERM');
  write('');
  write('Variables:');
  write('  file: The name of the file that just got updated is injected into the');
  write('  executable command with the template {{file}}');
  write('');
  write('Example:');
  write('  yardman src make');
  write('  yardman src -x make build/result.exe ./test');
  /* eslint-enable max-len */
}

module.exports = Yardman;
