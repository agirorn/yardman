const subject = require('../../lib/cli/convert-to-argv');

describe('rcfile to args', () => {
  const args = ['--help', '1 2', '3 4', '-v'];

  it('should convert one line rcfile to args', () => {
    expect(subject('--help "1 2" 3\\ 4 -v')).to.eql(args);
  });

  it('should convert multi line rcfile to args', () => {
    expect(subject('--help\n"1 2"\n3\\ 4 -v')).to.eql(args);
  });

  it('should ignore comments commenst', () => {
    expect(subject('# comment 1\n--help\n# comment 2\n"1 2"\n3\\ 4 -v'))
      .to.eql(args);
  });

  it('should convert badly formed rcfile rcfile to args', () => {
    expect(subject('   --help\n"1 2"\n3\\ 4 -v')).to.eql(args);
  });

  it('should convert badly formed rcfile rcfile to args', () => {
    expect(subject('--help   \n"1 2"\n3\\ 4 -v')).to.eql(args);
  });

  it('should allow multiple spaces in double quotes', () => {
    expect(subject('"1 2" "3  4"')).to.eql(['1 2', '3  4']);
  });

  it('should allow multiple spaces in single quotes', () => {
    expect(subject('\'1 2\' \'3  4\'')).to
        .eql(['1 2', '3  4']);
  });
});
