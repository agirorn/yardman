const { existsSync } = require('fs');
const fs = require('fs-extra');
const { exec } = require('child_process');
const Yardman = require('../lib/yardman');

const { ensureDirSync } = fs;
const { removeSync } = fs;

describe('yardman', () => {
  before(() => {
    ensureDirSync('.test');
    process.chdir('.test');
  });

  describe('when new files get added', () => {
    let yardman;
    let stdout;
    beforeEach(() => {
      stdout = '';
      yardman = Yardman({
        watchers: [
          { watch: ['./'], exec: 'touch new-file', start: false },
        ],
        options: {
          stdout: {
            write: (string) => { stdout += string; },
          },
        },
      });
    });

    beforeEach((done) => setTimeout(() => exec('touch file', done), 200));
    beforeEach((done) => setTimeout(done, 500));
    afterEach(async () => {
      await yardman.close();
      removeSync('file');
      removeSync('new-file');
    });

    it('should have run command when the files got created', () => {
      expect(existsSync('new-file')).to.equal(true);
    });

    it('should report that it executed the command', () => {
      expect(stdout).to.match(
        /command "touch new-file" completed successfully/,
      );
    });
  });

  describe('help screen', () => {
    let stdout;
    beforeEach(() => {
      stdout = '';
      Yardman({
        help: true,
        options: {
          stdout: {
            write: (string) => { stdout += string; },
          },
        },
      });
    });

    beforeEach((done) => setTimeout(done, 500));

    it('should report that it executed the command', () => {
      /* eslint-disable max-len */
      expect(stdout).to.contain('yardman\n');

      expect(stdout).to.contain('Watch files and run commands.\n');

      expect(stdout).to.contain('Usage:\n');
      expect(stdout).to.contain('  yardman [options] [files ...] executable\n');
      expect(stdout).to.contain('  yardman [[options] [files ...] -exec executable ...] [options] [files ...] executable\n');

      expect(stdout).to.contain('Options:\n');
      expect(stdout).to.contain('  -h, --help               This help text\n');
      expect(stdout).to.contain('  -v, --version            Display version information\n');
      expect(stdout).to.contain('  -x, --exec=executable    Executable to run\n');
      expect(stdout).to.contain('  -n, --npm=script         Executable an npm script with the --silent flag\n');
      expect(stdout).to.contain('  -X, --no-start           Do not run the executable on start\n');
      expect(stdout).to.contain('  -w, --watch=files...     Comma separated list of files to monitor for change\n');
      expect(stdout).to.contain('  -f, --filename=files...  Appends the path to the changed file to the command to execute\n');
      expect(stdout).to.contain('  -S, --kill-signal=signal Set the kill signal (SIGTERM, SIGKILL), defaults to SIGTERM\n');

      expect(stdout).to.contain('Variables:');
      expect(stdout).to.contain('  file: The name of the file that just got updated is injected into the');
      expect(stdout).to.contain('  executable command with the template {{file}}');

      expect(stdout).to.contain('Example:\n');
      expect(stdout).to.contain('  yardman src make\n');
      expect(stdout).to.contain('  yardman src -x make build/result.exe ./test\n');
      /* eslint-enable max-len */
    });
  });
});
