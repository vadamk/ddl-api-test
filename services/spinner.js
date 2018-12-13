const Ora = require('ora');

const spinner = new Ora({
	text: 'Loading...',
	spinner: 'dots'
});

module.exports = spinner;