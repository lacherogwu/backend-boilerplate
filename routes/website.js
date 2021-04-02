const router = require('express').Router();
const { getController } = require('../utils');
const controller = getController(__filename);

// route middleware configuration || funcName: [middlewares]
const md = {};

Object.entries(controller).forEach(([key, value]) => {
	const [method, funcName] = key.split('_');

	const middlewares = []; // global middlewares
	if (md[key]) middlewares.push(...md[key]);

	router[method](`/${funcName}`, ...middlewares, value);
});

module.exports = router;
