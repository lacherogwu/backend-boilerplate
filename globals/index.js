const { mapDirFiles } = require('../utils');

const files = mapDirFiles(__dirname);

// register on global object
files.forEach(i =>
	Object.entries(i).forEach(item => (global[item[0]] = item[1]))
);
