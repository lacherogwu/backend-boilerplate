import { Router } from 'express';
import { getController } from '../utils/core.js';
import authentication from '../middlewares/authentication.js';

const router = Router();
const controller = await getController(import.meta.url);

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

export default router;
