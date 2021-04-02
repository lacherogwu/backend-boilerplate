const get_funcName = (req, res, next) => {
	res.json({ hey: 123 });
};

const post_funcName = (req, res, next) => {
	res.json({ hey: 123 });
};

const get_testings = (req, res, next) => {
	res.json({ hey: 123, testings: true });
};

module.exports = {
	get_funcName,
	post_funcName,
	get_testings,
};
