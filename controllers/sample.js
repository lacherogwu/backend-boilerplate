import { getTodos } from '../apis/jsonplaceholder.js';

const get_test = catchAsync(async (req, res, next) => {
	AppResponse(res, 200, 'Everything is working well!');
});

const get_getTodos = catchAsync(async (req, res, next) => {
	const data = await getTodos(1);
	AppResponse(res, 200, data);
});

export default { get_test, get_getTodos };
