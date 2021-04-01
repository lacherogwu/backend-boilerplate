module.exports = (req, res, next) => {
	console.log('request has been made');

	next();
};
