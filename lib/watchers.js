const debug = require('debug')('yardman');
const chokidar = require('chokidar');
const { spawn } = require('child_process');
const killTree = require('tree-kill');
// const { render } = require('mustache');
const render = require('lodash.template');
const templateSettings = require('lodash.templatesettings');

const Reporter = require('./reporter');

const spawnOptions = { shell: true, stdio: 'inherit' };
templateSettings.interpolate = /{{([\s\S]+?)}}/g;

function watchers(config) {
  const reporter = Reporter(config.options);

  return config.watchers.map((orginal) => {
    const setting = orginal;
    setting.name = setting.exec;

    if (!setting.name.match(/^['"]/)) {
      setting.name = `"${setting.name}"`;
    }

    debug(`watching [ ${setting.watch} ]`);
    const watcher = chokidar.watch(setting.watch, {
      ignored: /[/\\]\./,
      persistent: true,
    });

    watcher.run = (file) => {
      if (watcher.process && watcher.process.connected) {
        watcher.process.kill();
        killTree(watcher.process.pid, setting.killSignal);
        watcher.process = null;
      }

      // _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
      // var compiled = render('hello {{ user }}!');
      // compiled({ 'user': 'mustache' });

      const command = render(setting.exec)({ file });
      reporter.info(`Yardman is running: ${command}`);
      const execed = spawn(command, [], spawnOptions);
      execed.on('error', error => reporter
        .error(`process("${command}") error: ${error}`));
      execed.on('close', (code) => {
        if (!code) {
          reporter.info(`command "${command}" completed successfully`);
        } else {
          reporter.error(
            `command "${command}" failed with exit code ${code}`,
          );
        }
      });

      watcher.process = execed;
    };

    watcher.on('all', (type, file) => {
      debug(`file ${type} ${file}`);
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
