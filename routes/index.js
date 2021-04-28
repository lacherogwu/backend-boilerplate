import { Router } from 'express';
import { mapDirFiles, getController } from '../utils/core.js';

const router = Router();

const files = await mapDirFiles(import.meta.url);

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

export default router;
