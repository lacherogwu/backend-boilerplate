const get_authentication = catchAsync(async (req, res, next) => {
	AppResponse(res, 200, 'authentication success');
});

const post_login = catchAsync(async (req, res, next) => {
	AppResponse(res, 200, { uid: 1234455 }, 'login success');
});

const post_signup = catchAsync(async (req, res, next) => {
	AppResponse(res, 201, { uid: 1234455 }, 'user created successfully');
});

module.exports = {
	get_authentication,
	post_login,
	post_signup,
};
