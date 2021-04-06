module.exports = (res, status, data = {}, message) => {
	if (typeof data === 'string') {
		message = data;
		data = {};
	}

	res.status(status || 200).json({
		success: true,
		message,
		results: typeof data === 'object' ? data?.length : undefined,
		data,
	});
};
