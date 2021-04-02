const get = (req, res, next) => {
	res.json({ hey: 123 });
};

module.exports = {
	get,
};
