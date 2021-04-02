const fs = require('fs');

const mapDirFiles = (path, type) => {
	const files = fs.readdirSync(path).filter(i => i !== 'index.js');

	switch (type) {
		case 'values':
			return files.map(i => require(`${path}/${i}`));
		default:
			return files.map(i => ({
				[i.replace('.js', '')]: require(`${path}/${i}`),
			}));
	}
};

const getController = path => {
	const fileName = /[^/]*$/.exec(path)[0];
	return require(`../controllers/${fileName}`);
};

module.exports = {
	mapDirFiles,
	getController,
};
