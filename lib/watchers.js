const chokidar = require('chokidar');
const spawn = require('child_process').spawn;
const reporter = require('./reporter');

const log = console.log.bind(console); // eslint-disable-line no-console
const spawnOptions = { shell: true, stdio: 'inherit' };

function watchers(config) {
  return config.watchers.filter((setting) => {
    // eslint-disable-next-line no-param-reassign
    setting.name = setting.exec;

    if (!setting.name.match(/^['"]/)) {
      // eslint-disable-next-line no-param-reassign
      setting.name = `"${setting.name}"`;
    }

    const watcher = chokidar.watch(setting.watch, {
      ignored: /[/\\]\./,
      persistent: true,
    });

    watcher.run = (file) => {
      if (watcher.process && watcher.process.connected) {
        watcher.process.kill();
        watcher.process = null;
      }

      const args = setting.filename ? [file] : [];
      const execed = spawn(setting.exec, args, spawnOptions);
      execed.on('error', error =>
        log(`process(${setting.name}) error: ${error}`));
      execed.on('close', (code) => {
        if (!code) {
          reporter.info(`command ${setting.name} ran successfully`);
        } else {
          reporter.error(
            `command ${setting.name} failed with exit code ${code}`);
        }
      });

      watcher.process = execed;
    };

    watcher.on('all', (type, file) => {
      if (!watcher.ready) {
        return;
      }

      watcher.run(file);
    });

    watcher.on('ready', () => {
      watcher.ready = true;
      if (setting.start) {
        watcher.run();
      }
    });

    return watcher;
  });
}
module.exports = watchers;
