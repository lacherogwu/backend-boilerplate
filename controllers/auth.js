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

const signup = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.create({ email, password });
	const token = createToken(user._id);
	res.cookie(...createCookie('jwt', token));

	res.status(201).json(JSend(user));
});

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.login(email, password);
	const token = createToken(user._id);
	res.cookie(...createCookie('jwt', token));

	res.status(200).json(JSend(user));
});

const getUser = catchAsync(async (req, res, next) => {
	const { jwt: token } = req.cookies;

	if (!token) throw new AppError('authentication failed', 401);

	// verify token
	const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

	// set user id
	res.locals.userId = decodedToken.id;

	next();
});

const authenticate = catchAsync(async (req, res, next) => {
	const user = await User.findById(res.locals.userId);
	if (!user) throw new AppError('authentication failed', 401);

	res.status(200).json(JSend(user));
});

const logout = catchAsync(async (req, res, next) => {
	res.cookie('jwt', '', { maxAge: 1 });
	res.status(200).json(JSend('logged out successfully!'));
});

const post_signup = catchAsync(async (req, res, next) => {
	AppResponse(res, 201, { uid: 1234455 }, 'user created successfully');
});

const post_login = catchAsync(async (req, res, next) => {
	AppResponse(res, 200, { uid: 1234455 }, 'login success');
});

const get_authentication = catchAsync(async (req, res, next) => {
	AppResponse(res, 200, 'authentication success');
});

const get_logout = catchAsync(async (req, res, next) => {
	AppResponse(res, 200, 'authentication success');
});

module.exports = {
	post_signup,
	post_login,
	get_authentication,
	get_logout,
};
