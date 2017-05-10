function argsToConfig(allArgs) {
  const args = allArgs.slice(2);
  const config = { watchers: [] };
  let watch = Watch();

  args.forEach((orginalFlag, index) => {
    if (!orginalFlag) { return; }
    const next = index + 1;
    const flag = parse(orginalFlag);

    switch (flag.flag) {
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
      case '--watch':
        watch.watch.push(flag.data);
        break;
      case '-w':
        break;
      case '--exec':
        exec(flag.data);
        break;
      case '-x':
        exec(args[next]);
        args[next] = undefined;
        break;
      default:
        watch.watch.push(flag.flag);
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

  function exec(data) {
    watch.exec = data;
    config.watchers.push(watch);
    watch = Watch();
  }
}

function Watch() {
  return {
    start: true,
    watch: [],
  };
}

function parse(flag) {
  const found = flag.match(/^(-\w)$/) || flag.match(/^(--.+)=(.+)$/);

  return found
    ? { flag: found[1], data: fix(found[2]) }
    : { flag, data: null };
}

function fix(data) {
  return data;
}

module.exports = argsToConfig;
