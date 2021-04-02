const router = require('express').Router();
const { mapDirFiles } = require('../utils');

const files = mapDirFiles(__dirname);

files.forEach(file =>
	Object.entries(file).forEach(([key, value]) => router.use(`/${key}`, value))
);

module.exports = router;
