const { resolve: resolvePath } = require('path');
const read = require('../../lib/cli/read');

const subject = (filename) => read(resolvePath(
  __dirname, '../fixtures', filename,
));

describe('Reading rc file', () => {
  describe('that exists', () => {
    it('should return its content', () => {
      expect(subject('yardmanrc')).to.deep.equal(['--arguments']);
    });
  });

  describe('that does not exist', () => {
    it('should return empty array', () => {
      expect(subject('not_a_file')).to.deep.equal([]);
    });
  });
});
