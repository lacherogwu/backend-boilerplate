import Crud from '../classes/Crud.js';
import CrudModel from '../models/Crud.js';

const crud = new Crud(CrudModel);

const put_update = catchAsync(async (req, res, next) => {
	const { id, title, description } = req.body;

	const doc = await crud.update(id, {
		title,
		description,
	});

	AppResponse(res, 200, doc);
});

export default {
	...crud.defaults(),
	put_update,
};
