module.exports = (data = {}, message) => {
	if (typeof data === 'string') {
		message = data;
		data = {};
	}

	return {
		success: true,
		message,
		results: typeof data === 'object' ? data.length : undefined,
		data,
	};
};
