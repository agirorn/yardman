const { readFileSync } = require('fs');
const convertToArgv = require('./convert-to-argv');

function readRcfile(filename) {
  try {
    return convertToArgv(
      readFileSync(filename, { encoding: 'UTF-8' }).toString(),
    );
  } catch (e) {
    return [];
  }
}

module.exports = readRcfile;
