const existsSync = require('fs').existsSync;
const Yardman = require('../lib/yardman');
const fs = require('fs-extra');
const exec = require('child_process').exec;

const ensureDirSync = fs.ensureDirSync;
const removeSync = fs.removeSync;

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
          { watch: ['file'], exec: 'touch new-file', start: false },
        ],
        options: {
          stdout: {
            write: (string) => { stdout += string; },
          },
        },
      });
    });

    beforeEach(done => setTimeout(() => exec('touch file', done), 200));
    beforeEach(done => setTimeout(done, 500));
    afterEach(() => {
      yardman.close();
      removeSync('file');
      removeSync('new-file');
    });

    it('should have run command when the files got created', () => {
      expect(existsSync('new-file')).to.equal(true);
    });

    it('should report that it executed the command', () => {
      expect(stdout).to.match(
        /command "touch new-file" completed successfully/);
    });
  });
});
