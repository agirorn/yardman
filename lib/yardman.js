const watchers = require('./watchers');

function Yardman(config) {
  if (!(this instanceof Yardman)) {
    return new Yardman(config);
  }

  watchers(config);
}

module.exports = Yardman;
