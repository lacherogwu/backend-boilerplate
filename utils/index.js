const getQuery = val =>
	val
		.split(',')
		.map(v => v.trim())
		.join(' ');

module.exports = { getQuery };
