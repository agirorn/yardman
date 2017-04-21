const convertToArgv = require('./convert-to-argv');
const readFileSync = require('fs').readFileSync;

function readRcfile(filename) {
  return convertToArgv(
    readFileSync(filename, { encoding: 'UTF-8' }).toString());
}

module.exports = readRcfile;
