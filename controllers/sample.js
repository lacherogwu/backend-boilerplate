const { getTodos } = require('../apis/sample');

const get_test = catchAsync(async (req, res, next) => {
	AppResponse(res, 200, 'everything is working well!');
});

const get_getTodos = catchAsync(async (req, res, next) => {
	const data = await getTodos(1);
	AppResponse(res, 200, data);
});

module.exports = {
	get_test,
	get_getTodos,
};
