const get_maKore = (req, res, next) => {
	res.json({ hey: 123 });
};

const get_me = (req, res, next) => {
	res.json({ hey: 123, me: true });
};

const get_something = catchAsync(async (req, res, next) => {
	res.json({ noder: false, reason: 'Shabbat!' });
});

module.exports = {
	get_maKore,
	get_me,
	get_something,
};
