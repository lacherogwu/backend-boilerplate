const get_test = catchAsync(async (req, res, next) => {
	AppResponse(res, 200, 'everything is working well!');
});

module.exports = {
	get_test,
};
