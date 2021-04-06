const mongoose = require('mongoose');
const validation = require('../utils/validations');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const modelSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validation.email, 'Please enter a valid email'],
	},
	password: {
		type: String,
		required: true,
		minlength: [6, 'Minimum password length is 6 characters'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

modelSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// static method to login USER
modelSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	const passwordMatch = await bcrypt.compare(password, user?.password || '');
	if (!user || !passwordMatch)
		throw new AppError('email address or password is incorrect', 401);

	return user;
};

// method to remove pw from user object
modelSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.password;
	return obj;
};

const Model = mongoose.model('user', modelSchema);

module.exports = Model;
