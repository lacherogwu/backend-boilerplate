import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default catchAsync(async (req, res, next) => {
	const { jwt: token } = req.cookies;

	if (!token) throw new AppError('Authentication failed', 401);

	// verify token
	const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

	const user = await User.findById(decodedToken.id);
	if (!user) throw new AppError('Authentication failed', 401);

	// set user id
	res.locals.user = user;

	next();
});
