import Api from '../classes/Api.js';

const instance = new Api({
	baseUrl: 'https://jsonplaceholder.typicode.com',
	token: process.env.SAMPLE_API_KEY,
});

const getTodos = async id => {
	const data = await instance.get(`/todos/${id}`);
	return data;
};

export { getTodos };
