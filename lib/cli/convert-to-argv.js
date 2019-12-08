const DOUBL_QUOTE_TEXT = /"(.[^"]*\s+[^"]*)"/g;
const SINGEL_QUOTE_TEXT = /'(.[^']*\s+[^']*)'/g;
const withSpaceTokens = (m, ...list) => list.slice(0, list.length - 2)
  .map((t) => t.replace(/\s/g, '%20'));

function rcFileLinesToArgs(lines) {
  const opts = lines
    .replace(/#.*\n/g, '')
    .replace(/\\\s/g, '%20')
    .replace(DOUBL_QUOTE_TEXT, withSpaceTokens)
    .replace(SINGEL_QUOTE_TEXT, withSpaceTokens)
    .split(/\s/)
    .filter(Boolean)
    .map((value) => value.replace(/%20/g, ' '));

  return opts;
}

module.exports = rcFileLinesToArgs;
