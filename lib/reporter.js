const chalk = require('chalk');
const util = require('util');

function Reporter(...args) {
  if (!(this instanceof Reporter)) {
    return new Reporter(...args);
  }

  this.stdout = args[0].stdout;
}

class ReporterMethods {
  info(...args) {
    this.stdout.write(`${chalk.green(...args)}\n`);
  }

  error(...args) {
    this.stdout.write(`${chalk.red(...args)}`);
  }
}
util.inherits(Reporter, ReporterMethods);

module.exports = Reporter;
