const router = require('express').Router();
const { mapDirFiles, getController } = require('../utils/core');

const files = mapDirFiles(__dirname);

const mode = 'flexible';

switch (mode) {
	case 'strict': {
		const routes = []; // configure route path || /path

		routes.forEach(route => {
			const controller = getController(route);
			Object.entries(controller).forEach(([key, value]) => {
				const [method, funcName] = key.split('_');
				router[method](`/${route}/${funcName}`, value);
			});
		});
		break;
	}

	default: {
		// flexible
		files.forEach(file => Object.entries(file).forEach(([key, value]) => router.use(`/${key}`, value)));
	}
}

module.exports = router;
