const { getQuery } = require('../utils');

class Crud {
	constructor(Model) {
		this.Model = Model;
	}

	async find(findOne, filter = {}, fields, sort) {
		let query;

		if (!findOne) {
			query = this.Model.find(filter);
			if (sort) query.sort(getQuery(sort));
		} else {
			query = this.Model.findOne(filter);
		}

		if (fields) {
			query.select(getQuery(fields));
		}

		return await query;
	}

	async create(data) {
		return await this.Model.create(data);
	}

	async update(id, data) {
		return await this.Model.findByIdAndUpdate(id, data, { runValidators: true, new: true });
	}

	async delete(id) {
		return await this.Model.findByIdAndDelete(id);
	}

	controllers() {
		const get_find = catchAsync(async (req, res, next) => {
			const { findOne, filter, fields, sort } = req.query;
			const docs = await this.find(findOne, filter, fields, sort);

			AppResponse(res, 200, docs);
		});

		const post_create = catchAsync(async (req, res, next) => {
			const doc = await this.create(req.body);

			AppResponse(res, 201, doc);
		});

		const put_update = catchAsync(async (req, res, next) => {
			const { id } = req.body;
			const doc = await this.update(id, req.body);

			AppResponse(res, 200, doc);
		});

		const delete_delete = catchAsync(async (req, res, next) => {
			const { id } = req.body;
			const doc = await this.delete(id);

			AppResponse(res, 200, doc);
		});

		return { get_find, post_create, put_update, delete_delete };
	}

	defaults(...items) {
		if (!items.length) return this.controllers();

		const values = {};
		const match = {
			find: 'get_find',
			create: 'post_create',
			update: 'put_update',
			delete: 'delete_delete',
		};

		items.forEach(i => (values[match[i]] = this.controllers()[match[i]]));

		return values;
	}
}

module.exports = Crud;
