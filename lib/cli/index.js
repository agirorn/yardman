const Yardman = require('../yardman');
const config = require('./config');
const read = require('./read');

function cli() {
  process.argv.splice(2, 0, ...read('.yardmanrc'));
  Yardman(config(process.argv));
}

module.exports = cli;
