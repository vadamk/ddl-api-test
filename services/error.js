const spinner = require('./spinner');

module.exports = error => {
  // console.error('\n ERROR: ', error.response);
  spinner.fail('Error');
}