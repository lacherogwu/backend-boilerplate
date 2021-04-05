const User = require('../models/User');
const jwt = require('jsonwebtoken');

const maxAge = 60 * 60 * 24 * 28;
const createToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: maxAge,
	});
};

const createCookie = (name, data) => [
	name,
	data,
	{
		httpOnly: true,
		secure: process.env.NODE_ENV === 'development' ? false : true,
		maxAge: maxAge * 1000,
	},
];

const post_signup = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.create({ email, password });
	const token = createToken(user._id);
	res.cookie(...createCookie('jwt', token));

	AppResponse(res, 201, user);
});

const post_login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.login(email, password);
	const token = createToken(user._id);
	res.cookie(...createCookie('jwt', token));

	AppResponse(res, 200, user);
});

const get_authenticate = catchAsync(async (req, res, next) =>
	AppResponse(res, 200, res.locals.user)
);

const get_logout = catchAsync(async (req, res, next) => {
	res.cookie('jwt', '', { maxAge: 1 });
	AppResponse(res, 200, 'logged out successfully!');
});

module.exports = {
	post_signup,
	post_login,
	get_authenticate,
	get_logout,
};
