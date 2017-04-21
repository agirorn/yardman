function argsToConfig(allArgs) {
  const args = allArgs.slice(2);
  const config = { watchers: [] };
  let watch = Watch();

  args.forEach((flag, index) => {
    const next = index + 1;

    switch (flag) {
      case '--help':
      case '-h':
        config.help = true;
        break;
      case '--no-start':
        watch.start = false;
        break;
      case '--filename':
      case '-f':
        watch.filename = true;
        break;
      case undefined:
      case '--watch':
      case '-w':
        break;
      case '--exec':
      case '-x':
        watch.exec = args[next];
        args[next] = undefined;
        config.watchers.push(watch);
        watch = Watch();
        break;
      default:
        watch.watch.push(flag);
        break;
    }
  });

  if ((!watch.exec) && watch.watch.length) {
    watch.exec = watch.watch.pop();
  }

  if (watch.watch.length) {
    config.watchers.push(watch);
  }
  return config;
}

function Watch() {
  return {
    start: true,
    watch: [],
  };
}

module.exports = argsToConfig;
