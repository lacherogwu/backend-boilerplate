export default (req, res, next) => {
	console.log('request has been made (global_logger.js)');

	next();
};
