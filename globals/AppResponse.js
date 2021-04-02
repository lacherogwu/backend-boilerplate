module.exports = (res, data = {}, message) => {
	if (typeof data === 'string') {
		message = data;
		data = {};
	}

	res.json({
		success: true,
		message,
		results: typeof data === 'object' ? data.length : undefined,
		data,
	});
};
