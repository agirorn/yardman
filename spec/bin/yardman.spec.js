const fs = require('fs');
const executable = require('executable');
const pkg = require('../../package.json');

describe('Yardman executable', () => {
  it('should be the correct file name', () => {
    expect(pkg.bin.yardman).to.equal('bin/yardman.js');
  });

  it('should exist in files system', () => {
    expect(pkg.bin.yardman).to.existOnFileSystem();
  });

  it('should be an executable file', () => {
    expect(pkg.bin.yardman).to.beAnExecutable();
  });
});

chai.Assertion.addMethod('existOnFileSystem', function exists() {
  this.assert(
    fs.existsSync(path(this)),
    'expected #{this} to exists',
    'expected #{this} not to exists',
  );
});

chai.Assertion.addMethod('beAnExecutable', function exists() {
  this.assert(
    executable.sync(path(this)),
    'expected #{this} to exists',
    'expected #{this} not to exists',
  );
});

function path(object) {
  // eslint-disable-next-line no-underscore-dangle
  return `${process.cwd()}/${object._obj}`;
}
