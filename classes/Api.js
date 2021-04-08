const axios = require('axios');

class Api {
	#instance;
	constructor(data) {
		const config = {
			baseURL: data.baseUrl,
		};

		// authorization
		if (data.token) {
			config.headers = { authorization: `Bearer ${data.token}` };
		}

		if (data.username && data.password) {
			config.auth = {
				username: data.username,
				password: data.password,
			};
		}

		this.#instance = axios.create(config);
	}

	async get(...args) {
		const { data } = await this.#instance.get(...args);
		return data;
	}
	async post(...args) {
		const { data } = await this.#instance.post(...args);
		return data;
	}
	async put(...args) {
		const { data } = await this.#instance.put(...args);
		return data;
	}
	async delete(...args) {
		const { data } = await this.#instance.delete(...args);
		return data;
	}
}

module.exports = Api;
