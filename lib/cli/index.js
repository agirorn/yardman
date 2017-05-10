const Yardman = require('../yardman');
const config = require('./config');
const read = require('./read');

function addStdio(cfg) {
  const options = {
    options: {
      stdout: process.stdout,
    },
  };

  return Object.assign(cfg, options);
}

function cli() {
  process.argv.splice(2, 0, ...read('.yardmanrc'));
  Yardman(addStdio(config(process.argv)));
}

module.exports = cli;
