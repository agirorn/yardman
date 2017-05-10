const watchers = require('./watchers');

function Yardman(config) {
  if (!(this instanceof Yardman)) {
    return new Yardman(config);
  }

  this.watchers = watchers(config);
}

Yardman.prototype.close = function close() {
  this.watchers.forEach((watcher) => {
    watcher.close();
    watcher.unwatch('*');
  });
};

module.exports = Yardman;
