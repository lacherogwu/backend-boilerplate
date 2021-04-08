const Crud = require('../classes/Crud');
const CrudModel = require('../models/Crud');

const crud = new Crud(CrudModel);

const put_update = catchAsync(async (req, res, next) => {
	const { id, title, description } = req.body;

	const doc = await crud.update(id, {
		title,
		description,
	});

	AppResponse(res, 200, doc);
});

module.exports = {
	...crud.controllers(),
	put_update,
};
