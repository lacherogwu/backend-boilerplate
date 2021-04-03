const get_sample = catchAsync(async (req, res, next) => {
	AppResponse(res, 200);
});
const get_moshe = catchAsync(async (req, res, next) => {
	AppResponse(res, 200, [1, 2, 3, 4, 5]);
});

module.exports = {
	get_sample,
	get_moshe,
};
