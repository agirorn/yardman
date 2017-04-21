const chalk = require('chalk');

const reporter = {
  info(...args) {
    // eslint-disable-next-line no-console
    console.log(chalk.green(...args));
  },

  error(...args) {
    // eslint-disable-next-line no-console
    console.log(chalk.red(...args));
  },
};

module.exports = reporter;
