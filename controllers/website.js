const get_sample = catchAsync(async (req, res, next) => {
	AppResponse(res);
});

module.exports = {
	get_sample,
};
