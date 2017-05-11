const config = require('../../lib/cli/config');

describe('Args to config', () => {
  const subject = (...Arguments) => config(defaults(...Arguments));

  describe('--help', () => {
    it('should enable help for --help', () => {
      expect(subject('--help').help).to.equal(true);
    });

    it('should enable help for -h', () => {
      expect(subject('-h').help).to.equal(true);
    });
  });

  describe('--no-start', () => {
    it('should set watcher start to false', () => {
      expect(subject('--no-start', 'file', 'exec').watchers[0].start)
        .to.equal(false);
    });
  });

  describe('-X', () => {
    it('should set watcher start to false', () => {
      expect(subject('-X', 'file', 'exec').watchers[0].start)
        .to.equal(false);
    });
  });

  describe('src/** eslint', () => {
    it('should be a single watcher config', () => {
      expect(subject('src/**', 'eslint').watchers).to.eql([
        { watch: ['src/**'], exec: 'eslint', start: true },
      ]);
    });
  });

  describe('src/** lib/** eslint', () => {
    it('should be a single watcher config', () => {
      expect(subject('lib/**', 'src/**', 'eslint').watchers).to.eql([
        { watch: ['lib/**', 'src/**'], exec: 'eslint', start: true },
      ]);
    });
  });

  describe('src/** --filename eslint', () => {
    it('should turn on filename inclutions on watcher', () => {
      expect(subject('src/**', '--filename', 'eslint').watchers).to.eql([
        { watch: ['src/**'], exec: 'eslint', start: true, filename: true },
      ]);
    });
  });

  describe('src/** -f eslint', () => {
    it('should turn on filename inclutions on watcher', () => {
      expect(subject('src/**', '-f', 'eslint').watchers).to.eql([
        { watch: ['src/**'], exec: 'eslint', start: true, filename: true },
      ]);
    });
  });

  describe('--watch=src/** --watch=lib/** --exec=eslint', () => {
    it('should be a single config', () => {
      expect(subject(
        '--watch=lib/**',
        '--watch=src/**',
        '--exec=eslint').watchers).to.eql([
          { watch: ['lib/**', 'src/**'], exec: 'eslint', start: true },
        ]);
    });
  });

  describe(
    '--watch=src/** --watch=lib/** --exec=eslint --watch=scss/** --exec=scss',
    () => {
      it('should be a two watcher config', () => {
        expect(subject(
          '--watch=lib/**',
          '--watch=src/**',
          '--exec=eslint',
          '--watch=scss/**',
          '--exec=scss').watchers).to.eql([
            { watch: ['lib/**', 'src/**'], exec: 'eslint', start: true },
            { watch: ['scss/**'], exec: 'scss', start: true },
          ]);
      });
    });

  describe('-w src/** -w lib/** --exec=eslint --watch=scss/** -x scss', () => {
    it('should be a two config', () => {
      expect(subject(
        '-w', 'lib/**',
        '-w', 'src/**',
        '--exec=eslint',
        '--watch=scss/**',
        '-x', 'scss').watchers).to.eql([
          { watch: ['lib/**', 'src/**'], exec: 'eslint', start: true },
          { watch: ['scss/**'], exec: 'scss', start: true },
        ]);
    });
  });

  describe('--npm=eslint', () => {
    it('should be a valid config', () => {
      expect(subject('--npm=eslint').watchers).to.eql([
        { watch: [], exec: 'npm run eslint --silent', start: true },
      ]);
    });
  });

  describe('-n eslint', () => {
    it('should be a valid config', () => {
      expect(subject('-n', 'eslint').watchers).to.eql([
        { watch: [], exec: 'npm run eslint --silent', start: true },
      ]);
    });
  });

  function defaults(...Arguments) {
    return [
      '/path-to-node/bin/node',
      '/path-to-yardman/bin/yardman.js',
    ].concat(...Arguments);
  }
});
