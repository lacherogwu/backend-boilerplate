const router = require('express').Router();
const { getController } = require('../utils/core');
const controller = getController(__filename);
const authentication = require('../middlewares/authentication');

// route middleware configuration || funcName: [middlewares]
const md = {
	get_authenticate: [authentication],
};

Object.entries(controller).forEach(([key, value]) => {
	const [method, funcName] = key.split('_');

	const middlewares = []; // global middlewares
	if (md[key]) middlewares.push(...md[key]);

	router[method](`/${funcName}`, ...middlewares, value);
});

module.exports = router;
